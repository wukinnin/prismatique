// backend/models/user.js
const pool = require('../config/db');

// backend/models/user.js
exports.getUserByRFIDSignature = async (signature) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.rank, o.id AS office_id, o.name AS office_name, o.class AS office_class
     FROM Users u
     JOIN Office o ON u.office_id = o.id
     JOIN RFID r ON u.id = r.user_id
     WHERE r.digital_signature = ?`,
    [signature]
  );
  return rows[0];
};

// Get all users (for demo/test purposes)
exports.getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM Users');
  return rows;
};