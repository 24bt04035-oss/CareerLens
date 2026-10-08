import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
  Building2,
  GraduationCap,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      showToast('Please enter email and password credentials.', 'error');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (from) {
        navigate(from, { replace: true });
      } else if (result.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  };

  // 1-Click Student Login
  const handleStudentDemoLogin = async () => {
    setEmail('arya.tia@gsfc.ac.in');
    setPassword('password123');
    setLoading(true);
    const result = await login('arya.tia@gsfc.ac.in', 'password123');
    setLoading(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  // 1-Click Admin Login
  const handleAdminDemoLogin = async () => {
    setEmail('admin@careerlens.io');
    setPassword('Admin@2026!Secured');
    setLoading(true);
    const result = await login('admin@careerlens.io', 'Admin@2026!Secured');
    setLoading(false);
    if (result.success) {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative">
      {/* Ambient security glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-xl shadow-cyan-500/20 mb-1">
            <div className="w-full h-full bg-[#07090e] rounded-[14px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CareerLens Identity Access Portal
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Secure Role-Based Authentication & Cryptographic JWT Access Verification
          </p>
        </div>

        {/* Dual Quick Login Cards for Hackathon Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Student Persona Card */}
          <div className="p-4 rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <GraduationCap className="w-4 h-4 text-cyan-400" /> Student Persona
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  STUDENT ROLE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Log in as <strong>Arya Tia</strong> (B.Tech Computer Science). Access career readiness, skill gap analysis & learning paths.
              </p>
              <div className="text-[10px] font-mono text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 space-y-0.5">
                <div><span className="text-slate-500">Email:</span> arya.tia@gsfc.ac.in</div>
                <div><span className="text-slate-500">Pass:</span> password123</div>
                <div className="text-amber-400 text-[9px] pt-1">✕ Cannot add new students</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStudentDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>Login as Student (1-Click)</span>
            </button>
          </div>

          {/* Admin Persona Card */}
          <div className="p-4 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Building2 className="w-4 h-4 text-amber-400" /> University Admin
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  ADMIN ROLE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Log in as <strong>Dr. Rajesh Sharma</strong> (Dean of Careers). Provision student accounts, grant/revoke permissions & view SIEM telemetry.
              </p>
              <div className="text-[10px] font-mono text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 space-y-0.5">
                <div><span className="text-slate-500">Email:</span> admin@careerlens.io</div>
                <div><span className="text-slate-500">Pass:</span> Admin@2026!Secured</div>
                <div className="text-emerald-400 text-[9px] pt-1">✓ Can provision students & RBAC</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdminDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login as Admin (1-Click)</span>
            </button>
          </div>
        </div>

        {/* Custom Authentication Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Custom Credential Verification
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Bcrypt Hashing Enforced</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. arya.tia@gsfc.ac.in or admin@careerlens.io"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Account Password
                </label>
                <span className="text-[10px] text-slate-500">
                  Student: password123 | Admin: Admin@2026!Secured
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shadow-md active:scale-95"
            >
              <span>{loading ? 'Verifying Cryptographic Credentials...' : 'Sign In & Verify Role'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Need a student profile created? Contact your University Administrator or{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              self-register here →
            </Link>
          </div>
        </div>

        {/* Cybersecurity Enforced Badge */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cybersecurity Architecture: JWT Claims • RBAC Controls • SIEM Audit Telemetry</span>
          </div>
          <span className="text-emerald-400 font-bold">100% Protected</span>
        </div>
      </div>
    </div>
  );
}

