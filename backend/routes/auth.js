const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // Placeholder for future RFID login logic
  res.status(501).json({ message: 'Not implemented yet' });
});

module.exports = router;