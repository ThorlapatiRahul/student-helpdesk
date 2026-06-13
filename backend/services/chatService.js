const { faqs } = require('../data/mockDb');

// Build the prompt for the LLM using FAQs and optional file details
const createPrompt = (message, file, mode = 'client') => {
  const faqText = faqs
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join('\n\n');

  let fileDetails = '';
  if (file) {
    if (file.mimetype?.startsWith('text/')) {
      const content = file.buffer.toString('utf8').slice(0, 1500);
      fileDetails = `\n\nFile content (truncated):\n${content}`;
    } else {
      fileDetails = `\n\nUploaded file: ${file.originalname} (${file.mimetype}).`;
    }
  }

  const audience = mode === 'admin'
    ? 'You are helping a helpdesk admin triage student support questions, draft replies, and spot FAQ candidates.'
    : 'You are helping a student get clear, friendly support from the helpdesk.';

  return `${audience} Use the FAQ content below first, and be honest when the FAQ does not contain enough detail. Keep the answer practical, original, and easy to act on.\n\nFAQs:\n${faqText}\n\nQuestion:\n${message}${fileDetails}`;
};

// Simple fallback when OpenAI key is missing – try to answer from FAQ data
const findFaqFallback = (message) => {
  const lowerQuery = (message || '').toLowerCase();
  const stopWords = new Set([
    'about', 'should', 'would', 'could', 'with', 'from', 'that', 'this',
    'how', 'what', 'when', 'where', 'which', 'will', 'have', 'many', 'your',
  ]);
  const terms = lowerQuery
    .split(/\W+/)
    .filter((t) => t.length > 2 && !stopWords.has(t));

  let bestMatch = null;
  let bestScore = 0;
  for (const faq of faqs) {
    const text = `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase();
    const score = terms.reduce((s, term) => s + (text.includes(term) ? 1 : 0), 0);
    if (score > bestScore) {
      bestMatch = faq;
      bestScore = score;
    }
  }
  return bestMatch;
};

const buildFallbackResponse = (message, file, mode) => {
  const fallbackFaq = message ? findFaqFallback(message) : null;
  if (fallbackFaq) {
    return `Based on the FAQ: ${fallbackFaq.answer}`;
  }
  if (mode === 'admin') {
    return 'Admin assistant: I can help summarize student issues, draft response text, and suggest repeated questions that should become FAQ entries. Share a query or topic to work on.';
  }
  return `Student assistant: I can help with internship FAQs, NOC, certificates, ViBe login, team formation, attendance, and support queries${file ? ` I also received your file: ${file.originalname}.` : ''}`;
};

/**
 * Process a chat request.
 * @param {string} message - User message.
 * @param {object|null} file - Optional uploaded file (multer format).
 * @param {string} mode - "client" or "admin".
 * @returns {Promise<{response:string, reply:string}>}
 */
const processChat = async (message, file = null, mode = 'client') => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = createPrompt(message || '', file, mode);
if (!apiKey) {
  const responseText = buildFallbackResponse(message || '', file, mode);
  return { response: responseText, reply: responseText };
}
const requestBody = {
  model: process.env.OPENAI_MODEL || 'g-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful student AI mentor for internship and FAQ support.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ],
  max_tokens: 600,
  temperature: 0.7,
};

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI request failed: ${errorText}`);
    }

    const result = await response.json();
    const responseText = result.choices?.[0]?.message?.content?.trim() || 'I could not generate an answer.';
    return { response: responseText, reply: responseText };
  } catch (err) {
    console.error('OpenAI request error:', err);
    // Fallback response when OpenAI fails
    const fallbackText = buildFallbackResponse(message || '', file, mode);
    return { response: fallbackText, reply: fallbackText };
  }
};

module.exports = { processChat };
