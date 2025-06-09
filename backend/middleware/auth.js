// backend/middleware/auth.js
function authenticateUser(req, res, next) {
  const { user } = req.session || {};

  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  req.user = user;
  next();
}

module.exports = authenticateUser;