// backend/config/jwt.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/**
 * Generates a JWT token for a given user
 */
exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      rank: user.rank,
      office_id: user.office_id,
      office_name: user.office_name
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

/**
 * Verifies a JWT token
 */
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};