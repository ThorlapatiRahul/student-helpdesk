const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route: POST /api/auth/login
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;
