const express = require('express');
const router = express.Router();
const { getOfficeById } = require('../models/office');

// GET /api/offices
router.get('/', (req, res) => {
  const { office_id } = req.session.user || {};

  if (!office_id) {
    return res.status(401).json({ error: 'User not authenticated or no office assigned' });
  }

  getOfficeById(office_id)
    .then(office => {
      if (!office) {
        return res.status(404).json({ error: 'Office not found' });
      }
      res.json(office);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;