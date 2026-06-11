const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, queryController.submitQuery);

router.get(
  '/my-queries',
  authMiddleware,
  queryController.getMyQueries
);
module.exports = router;
