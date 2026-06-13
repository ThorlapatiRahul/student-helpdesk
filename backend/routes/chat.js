const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const jwt = require('jsonwebtoken');

// Optional authentication middleware (unchanged)
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return next();
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    next();
  } catch {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// POST /api/chat – accept JSON body with message (no file upload)
router.post('/', optionalAuth, chatController.handleChat);

module.exports = router;
