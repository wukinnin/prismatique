// backend/models/office.js
const pool = require('../config/db');

// Get office by ID
exports.getOfficeById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Office WHERE id = ?', [id]);
  return rows[0];
};

// Get all offices (for demo/test purposes)
exports.getAllOffices = async () => {
  const [rows] = await pool.query('SELECT * FROM Office');
  return rows;
};