// backend/models/request.js
const pool = require('../config/db');

// Create new supply request
exports.createSupplyRequest = async (requesterId, senderOfficeId, receiverOfficeId, notes) => {
  const [result] = await pool.query(
    `INSERT INTO SupplyRequest (requester_id, sender_office_id, receiver_office_id, status, request_notes)
     VALUES (?, ?, ?, 'Pending', ?)`,
    [requesterId, senderOfficeId, receiverOfficeId, notes]
  );
  return result.insertId;
};

// Get all requests by requester ID
exports.getRequestsByRequesterId = async (requesterId) => {
  const [rows] = await pool.query(
    `SELECT * FROM SupplyRequest WHERE requester_id = ?`,
    [requesterId]
  );
  return rows;
};

// Update request status (e.g., forward)
exports.updateRequestStatus = async (requestId, status, reviewedBy, reviewNotes) => {
  const [result] = await pool.query(
    `UPDATE SupplyRequest 
     SET status = ?, reviewed_by = ?, review_notes = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [status, reviewedBy, reviewNotes, requestId]
  );
  return result.affectedRows > 0;
};