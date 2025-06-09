const express = require('express');
const router = express.Router();
const { getUserByRFIDSignature } = require('../models/user');

// GET /api/users
router.get('/', (req, res) => {
  // Assume user is stored in session or JWT token later
  const { user } = req.session || {};
  
  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  res.json(user);
});

module.exports = router;