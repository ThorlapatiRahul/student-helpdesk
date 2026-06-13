const queryService = require('../services/queryService');

const submitQuery = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query text is required' });
    }
    
    // req.user is set by authMiddleware
    const newQuery = await queryService.addQuery(req.user.id, query);
    res.status(201).json({ message: 'Query submitted successfully', data: newQuery });
  } catch {
    res.status(500).json({ error: 'Failed to submit query' });
  }
};

module.exports = { submitQuery };
