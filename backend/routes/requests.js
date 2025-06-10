const express = require('express');
const router = express.Router();
const { createSupplyRequest, getRequestsByRequesterId, updateRequestStatus } = require('../models/request');
const { verifyToken } = require('../config/jwt');

// POST /api/requests/create
router.post('/create', verifyToken, (req, res) => {
  const { requester_id, sender_office_id, receiver_office_id, notes } = req.body;

  if (!requester_id || !sender_office_id || !receiver_office_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  createSupplyRequest(requester_id, sender_office_id, receiver_office_id, notes)
    .then(id => {
      res.status(201).json({ message: 'Request created successfully', requestId: id });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create request' });
    });
});

// GET /api/requests/user
router.get('/user', verifyToken, (req, res) => {
  const { user } = req;

  if (!user || !user.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  getRequestsByRequesterId(user.id)
    .then(requests => {
      res.json(requests);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch requests' });
    });
});

// PUT /api/requests/update/:id
router.put('/update/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { status, reviewed_by, review_notes } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  updateRequestStatus(id, status, reviewed_by, review_notes)
    .then(success => {
      if (!success) {
        return res.status(404).json({ error: 'Request not found' });
      }
      res.json({ message: 'Request updated successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update request' });
    });
});

module.exports = router;