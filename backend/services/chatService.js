const { faqs } = require('../data/mockDb');

const createPrompt = (message, file) => {
  const faqText = faqs
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join('\n\n');

  let fileDetails = "";
  if (file) {
    if (file.mimetype.startsWith('text/')) {
      const content = file.buffer.toString('utf8').slice(0, 1500);
      fileDetails = `\n\nFile content (truncated):\n${content}`;
    } else {
      fileDetails = `\n\nUploaded file: ${file.originalname} (${file.mimetype}).`;
    }
  }

  return `You are a helpful student help desk AI mentor for the Vicharanashala internship. Answer questions using the FAQ content below and provide clear advice for students. Do not fabricate details beyond the FAQ content and best practices for internship-related questions.\n\nFAQs:\n${faqText}\n\nStudent question:\n${message}${fileDetails}`;
};

const findFaqFallback = (message) => {
  const lowerQuery = message.toLowerCase();
  return faqs.find(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.category.toLowerCase().includes(lowerQuery)
  );
};

const processChat = async (message, file) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = createPrompt(message || '');

  if (!apiKey) {
    const fallbackFaq = message ? findFaqFallback(message) : null;
    const responseText = fallbackFaq
      ? `FAQ-based answer: ${fallbackFaq.answer}`
      : `This is a local AI mentor mock response. You asked: "${message}".${
          file ? ` Uploaded file: ${file.originalname}.` : ''
        }`;

    return { response: responseText };
  }

  const requestBody = {
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
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

  return { response: responseText };
};

module.exports = { processChat };
