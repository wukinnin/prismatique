// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { getUserByRFIDSignature } = require('../models/user');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { digital_signature } = req.body;

  if (!digital_signature) {
    return res.status(400).json({ error: 'Digital signature is required' });
  }

  try {
    const user = await getUserByRFIDSignature(digital_signature);

    if (!user) {
      return res.status(401).json({ error: 'Invalid or unknown RFID signature' });
    }

    // Return user info (excluding sensitive fields)
    const { id, name, email, rank, office_id, office_name } = user;
    return res.json({
      success: true,
      user: { id, name, email, rank, office_id, office_name }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;