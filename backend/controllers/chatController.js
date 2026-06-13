const chatService = require('../services/chatService');

const handleChat = async (req, res) => {
  try {
    const { message, mode } = req.body;
    // Ensure a message is provided
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const data = await chatService.processChat(message, null, mode);
    res.status(200).json(data);
  } catch (err) {
    console.error('Chat controller error:', err);
    res.status(500).json({ error: 'Failed to process chat' });
  }
};

module.exports = { handleChat };
