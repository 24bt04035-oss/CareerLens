import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Lock, ArrowLeft, ShieldX, KeyRound } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useApp();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse">
          <KeyRound className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-200">Verifying Cryptographic Credentials...</p>
          <p className="text-xs text-slate-500">Checking JWT session & RBAC authorization scope</p>
        </div>
      </div>
    );
  }

  // Auth Guard: Unauthenticated user attempt
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role Guard (RBAC): Authenticated but lacks required role
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-950/40 via-slate-900 to-slate-950 p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
          {/* Subtle red glow background */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 shadow-xl shadow-red-500/10">
            <ShieldX className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>HTTP 403 FORBIDDEN — RBAC VIOLATION</span>
            </div>
            <h2 className="text-2xl font-black text-white">Access Denied: Insufficient Privileges</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your account <strong>{user.name}</strong> holds the <span className="text-cyan-400 font-semibold font-mono">[{user.role.toUpperCase()}]</span> role. This administrative module strictly requires <span className="text-amber-400 font-semibold font-mono">[{allowedRoles.join(', ').toUpperCase()}]</span> authorization.
            </p>
          </div>

          {/* Cybersecurity Context Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-red-400 font-bold">
                <ShieldAlert className="w-3.5 h-3.5" /> Cybersecurity Defense Active
              </span>
              <span className="text-slate-500">PoLP Enforced</span>
            </div>
            <div className="text-slate-300 text-[11px] space-y-1">
              <p><span className="text-slate-500">Principle:</span> Principle of Least Privilege (PoLP)</p>
              <p><span className="text-slate-500">Telemetry:</span> Event logged to SIEM Audit Log under <code className="text-amber-400 font-mono">ACCESS_DENIED_RBAC</code></p>
              <p><span className="text-slate-500">User Email:</span> {user.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Student Dashboard</span>
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In as Admin</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
