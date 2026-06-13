const chatService = require('../services/chatService');

const handleChat = async (req, res) => {
  try {
    const { message, mode, history } = req.body;
    const file = req.file;
    // Ensure a message is provided
    if (!message && !file) {
      return res.status(400).json({ error: 'Message or file is required' });
    }
    const data = await chatService.processChat(message, file, mode, history);
    res.status(200).json(data);
  } catch (err) {
    console.error('Chat controller error:', err);
    res.status(500).json({ error: 'Failed to process chat' });
  }
};

module.exports = { handleChat };
