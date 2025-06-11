// backend/routes/requests.js
const express = require('express');
const router = express.Router();
const { createSupplyRequest, getRequestsByRequesterId } = require('../models/request');

/**
 * POST /api/requests/create
 * Submits a new supply request.
 */
router.post('/create', async (req, res) => {
  const {
    requester_id,
    sender_office_id,
    receiver_office_id,
    notes,
    items
  } = req.body;

  if (!requester_id || !sender_office_id || !receiver_office_id || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const requestId = await createSupplyRequest(
      requester_id,
      sender_office_id,
      receiver_office_id,
      notes,
      items
    );

    return res.status(201).json({
      message: '✅ Request created successfully!',
      requestId
    });

  } catch (error) {
    console.error('Create Request Error:', error);
    return res.status(500).json({ error: 'Failed to create request' });
  }
});

/**
 * GET /api/requests/user
 * Gets all requests made by the current user.
 */
router.get('/user', async (req, res) => {
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