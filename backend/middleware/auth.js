const jwt = require('jsonwebtoken');
const { store } = require('../data/store');

const JWT_SECRET = process.env.JWT_SECRET || 'careerlens-cybersecurity-secret-key-2026';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    store.addAuditLog({
      eventType: 'UNAUTHORIZED_ACCESS',
      severity: 'MEDIUM',
      actor: 'unauthenticated',
      role: 'guest',
      ip: req.ip || req.socket.remoteAddress || '127.0.0.1',
      action: `Unauthenticated Request Blocked: ${req.method} ${req.originalUrl}`,
      details: 'Missing Authorization Bearer header.'
    });

    return res.status(401).json({
      error: 'Authentication Required. Please log in with valid credentials.',
      code: 'AUTH_REQUIRED'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    store.addAuditLog({
      eventType: 'INVALID_TOKEN',
      severity: 'WARN',
      actor: 'tampered_token',
      role: 'invalid',
      ip: req.ip || req.socket.remoteAddress || '127.0.0.1',
      action: `Invalid / Expired Token Rejected: ${req.method} ${req.originalUrl}`,
      details: err.message
    });

    return res.status(403).json({
      error: 'Session expired or cryptographic signature invalid. Please log in again.',
      code: 'INVALID_TOKEN'
    });
  }
}

function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      // Cybersecurity Principle: Log privilege escalation attempt
      store.addAuditLog({
        eventType: 'ACCESS_DENIED_RBAC',
        severity: 'HIGH',
        actor: req.user.email,
        role: req.user.role,
        ip: req.ip || req.socket.remoteAddress || '127.0.0.1',
        action: `RBAC Violation: Role [${req.user.role}] attempted restricted action [${req.method} ${req.originalUrl}]`,
        details: `Access Denied: Required one of [${allowedRoles.join(', ')}]. Principle of Least Privilege enforced.`
      });

      return res.status(403).json({
        error: `Access Denied: Insufficient Privileges. Required role: [${allowedRoles.join(', ')}].`,
        code: 'RBAC_FORBIDDEN',
        currentRole: req.user.role,
        requiredRoles: allowedRoles
      });
    }

    next();
  };
}

module.exports = {
  JWT_SECRET,
  authenticateToken,
  requireRole
};
