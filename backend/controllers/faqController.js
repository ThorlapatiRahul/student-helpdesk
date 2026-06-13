const faqService = require('../services/faqService');

const getFaqs = async (req, res) => {
  try {
    const faqs = await faqService.getAllFaqs();
    res.status(200).json(faqs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
};

module.exports = { getFaqs };
