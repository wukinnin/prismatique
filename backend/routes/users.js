const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/jwt');

// GET /api/users - Protected by JWT
router.get('/', verifyToken, (req, res) => {
  res.json(req.user); // Returns the decoded JWT user data
});

module.exports = router;