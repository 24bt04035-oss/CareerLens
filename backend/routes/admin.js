const express = require('express');
const router = express.Router();
const { store } = require('../data/store');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply RBAC: ALL routes in this router strictly require 'admin' role!
router.use(authenticateToken);
router.use(requireRole(['admin']));

/**
 * GET /api/admin/users
 * Retrieve complete student directory and access statuses
 */
router.get('/users', (req, res) => {
  try {
    const users = store.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users: ' + err.message });
  }
});

/**
 * POST /api/admin/users
 * Admin function: Provision new student with access permissions
 */
router.post('/users', (req, res) => {
  try {
    const { name, email, university, degree, department, graduationYear, cgpa, role, status } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

    if (!name || !email) {
      return res.status(400).json({ error: 'Student name and university email are required.' });
    }

    const createdUser = store.addUser(
      {
        name,
        email,
        university: university || 'GSFC University',
        degree: degree || 'B.Tech Computer Science',
        department: department || 'Computer Science & Engineering',
        graduationYear: graduationYear ? Number(graduationYear) : 2026,
        cgpa: cgpa ? Number(cgpa) : 8.0,
        role: role || 'student',
        status: status || 'active'
      },
      req.user.email,
      clientIp
    );

    res.status(201).json({
      success: true,
      message: `Access granted and account created for ${createdUser.name}`,
      user: createdUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /api/admin/users/:id/status
 * Admin function: Toggle / Revoke / Grant student access permission
 */
router.put('/users/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

    if (!['active', 'suspended', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be active, suspended, or pending.' });
    }

    const updated = store.updateUserStatus(req.params.id, status, req.user.email, clientIp);
    res.json({
      success: true,
      message: `Access permission for ${updated.name} updated to [${status}].`,
      user: updated
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /api/admin/audit-logs
 * SIEM Audit Log & Security Telemetry Viewer
 */
router.get('/audit-logs', (req, res) => {
  try {
    const logs = store.getAuditLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audit logs: ' + err.message });
  }
});

/**
 * GET /api/admin/stats
 * Institutional KPIs
 */
router.get('/stats', (req, res) => {
  try {
    const stats = store.getAdminStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin stats: ' + err.message });
  }
});

module.exports = router;
