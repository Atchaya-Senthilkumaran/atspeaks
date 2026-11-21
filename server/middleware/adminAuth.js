const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  return process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'atspeaks-admin-dev-secret-change-me';
};

exports.signAdminToken = (username) => {
  return jwt.sign({ role: 'admin', username }, getJwtSecret(), { expiresIn: '12h' });
};

exports.requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const queryToken = req.query.token;
  let token = '';

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (typeof queryToken === 'string' && queryToken.trim()) {
    token = queryToken.trim();
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in as admin.'
    });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    req.admin = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.'
    });
  }
};
