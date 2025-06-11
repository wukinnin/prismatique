// backend/models/request.js
const pool = require('../config/db');

/**
 * Creates a new supply request with multiple items.
 */
exports.createSupplyRequest = async (requesterId, senderOfficeId, receiverOfficeId, notes, items) => {
  const [result] = await pool.query(
    `INSERT INTO SupplyRequest 
      (requester_id, sender_office_id, receiver_office_id, request_notes)
      VALUES (?, ?, ?, ?)`,
    [requesterId, senderOfficeId, receiverOfficeId, notes]
  );

  const requestId = result.insertId;

  // Insert each item into SupplyRequestItem
  for (const item of items) {
    await pool.query(
      `INSERT INTO SupplyRequestItem 
        (supply_request_id, item_name, quantity, unit, notes)
        VALUES (?, ?, ?, ?, ?)`,
      [requestId, item.item_name, item.quantity, item.unit, item.notes]
    );
  }

  return requestId;
};

/**
 * Fetches all requests made by a specific user.
 */
exports.getRequestsByRequesterId = async (requesterId) => {
  const [rows] = await pool.query(`
    SELECT 
      sr.id,
      sr.status,
      sr.request_notes,
      sr.created_at,
      GROUP_CONCAT(CONCAT(ir.item_name, ' - ', ir.quantity, ' ', ir.unit) SEPARATOR '; ') AS items
    FROM SupplyRequest sr
    JOIN SupplyRequestItem ir ON sr.id = ir.supply_request_id
    WHERE sr.requester_id = ?
    GROUP BY sr.id
    ORDER BY sr.created_at DESC
  `, [requesterId]);

  return rows;
};