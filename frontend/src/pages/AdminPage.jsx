import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  ShieldCheck,
  UserPlus,
  Users,
  ShieldAlert,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Lock,
  RefreshCw,
  Award,
  Terminal,
  Key,
  Building2,
  GraduationCap
} from 'lucide-react';

export default function AdminPage() {
  const { user, showToast } = useApp();
  const [students, setStudents] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New Student Provisioning Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: 'GSFC University',
    degree: 'B.Tech Computer Science',
    department: 'Computer Science & Engineering',
    graduationYear: 2026,
    cgpa: 8.2,
    password: 'password123',
    role: 'student',
    status: 'active'
  });

  const loadAdminData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersData, logsData, statsData] = await Promise.all([
        api.admin.getUsers().catch(() => []),
        api.admin.getAuditLogs().catch(() => []),
        api.admin.getStats().catch(() => null)
      ]);

      setStudents(usersData);
      setAuditLogs(logsData);
      setStats(statsData);
    } catch (err) {
      showToast(`Admin Data Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // Handle Toggle Access Status
  const handleToggleStatus = async (studentId, currentStatus, studentName) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await api.admin.updateUserStatus(studentId, newStatus);
      showToast(
        `Permissions for ${studentName} updated to [${newStatus.toUpperCase()}]`,
        newStatus === 'active' ? 'success' : 'info'
      );
      await loadAdminData();
    } catch (err) {
      showToast(`Failed to update status: ${err.message}`, 'error');
    }
  };

  // Handle Create Student
  const handleProvisionStudent = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Student name and university email are required.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.admin.createUser(formData);
      showToast(`✅ Access provisioned & account created for ${res.user.name}!`, 'success');
      setShowAddModal(false);
      setFormData({
        name: '',
        email: '',
        university: 'GSFC University',
        degree: 'B.Tech Computer Science',
        department: 'Computer Science & Engineering',
        graduationYear: 2026,
        cgpa: 8.2,
        password: 'password123',
        role: 'student',
        status: 'active'
      });
      await loadAdminData();
    } catch (err) {
      showToast(`Provisioning Error: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered Students List
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.degree && s.degree.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/60 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950 border border-cyan-800">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> ADMIN CONTROL CENTER
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                <Lock className="w-3 h-3" /> RBAC ENFORCED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Student Access & Permission Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Provision student credentials, grant/suspend platform access permissions, monitor institutional readiness analytics, and inspect live SIEM security telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Provision New Student</span>
            </button>

            <button
              onClick={loadAdminData}
              title="Refresh Data"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Students</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{stats?.totalStudents || students.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Registered university candidates</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Permissions</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-400">
              {stats?.activeStudents || students.filter((s) => s.status === 'active').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Full platform access enabled</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Suspended Accounts</span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-red-400">
              {students.filter((s) => s.status === 'suspended').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Access revoked by Admin</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">SIEM Security Events</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-400">{auditLogs.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Audit logs & access telemetry</p>
          </div>
        </div>
      </div>

      {/* Main Student Directory & Permission Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              Student Access & Directory
            </h2>
            <p className="text-xs text-slate-400">
              Manage student profile permissions. Only Admins can add new students or modify access flags.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student or degree..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder-slate-500 outline-none w-48 sm:w-60"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none focus:border-cyan-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Student Candidate</th>
                <th className="py-3.5 px-4 font-semibold">University & Degree</th>
                <th className="py-3.5 px-4 font-semibold">CGPA</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Access Permission</th>
                <th className="py-3.5 px-4 font-semibold text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 italic">
                    No student records match your query.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-slate-950">
                          {st.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{st.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{st.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-200">{st.degree || 'B.Tech CS'}</div>
                      <div className="text-[11px] text-slate-500">{st.university || 'GSFC University'}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-cyan-400">
                      {st.cgpa ? st.cgpa.toFixed(1) : '8.0'}
                    </td>

                    <td className="py-3.5 px-4 font-mono uppercase text-[10px]">
                      <span className={`px-2 py-0.5 rounded border ${
                        st.role === 'admin'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                      }`}>
                        {st.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {st.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Active Access
                        </span>
                      ) : st.status === 'suspended' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle className="w-3 h-3" /> Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3 h-3" /> Pending Review
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {st.role === 'admin' ? (
                        <span className="text-[10px] text-slate-500 font-mono uppercase italic">Super Admin</span>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(st.id, st.status, st.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                            st.status === 'active'
                              ? 'bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800'
                              : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {st.status === 'active' ? 'Suspend Access' : 'Activate Access'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIEM Security Audit Telemetry Stream */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">SIEM Cybersecurity Telemetry & Audit Logs</h2>
              <p className="text-xs text-slate-400">
                Cryptographic security events, login attempts, RBAC violations, and admin actions.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
            {auditLogs.length} Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Event Type</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Actor / Email</th>
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Security Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-[11px]">
              {auditLogs.slice(0, 10).map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-white">{log.eventType}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                        log.severity === 'HIGH'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : log.severity === 'WARN' || log.severity === 'MEDIUM'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-cyan-300">{log.actor}</td>
                  <td className="py-2.5 px-3 text-slate-500">{log.ip}</td>
                  <td className="py-2.5 px-3 text-slate-300">{log.details || log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Provision New Student Access</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-500 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProvisionStudent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">University Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul.s@gsfc.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Degree Program</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">University Name</label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CGPA Score</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Graduation Year</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  {submitting ? 'Provisioning...' : 'Provision Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
