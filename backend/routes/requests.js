const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/jwt'); // Import verifyToken
const { createSupplyRequest, getRequestsByRequesterId } = require('../models/request');

// Protect the route with verifyToken
router.get('/user', verifyToken, async (req, res) => {
  const { user } = req;

  if (!user || !user.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const requests = await getRequestsByRequesterId(user.id);
    return res.json(requests);

  } catch (error) {
    console.error('Get User Requests Error:', error);
    return res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

module.exports = router;