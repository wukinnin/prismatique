// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { getUserByRFIDSignature } = require('../models/user');
const { generateToken } = require('../config/jwt');

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

    const token = generateToken(user); // Includes all user data in token

    return res.json({
      success: true,
      user, // This now includes color, office_name, office_class, rank
      token
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;