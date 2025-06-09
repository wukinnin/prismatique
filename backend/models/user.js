// backend/models/user.js
const pool = require('../config/db');

// Get user by RFID digital signature
exports.getUserByRFIDSignature = async (signature) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.rank, u.office_id, o.name AS office_name 
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