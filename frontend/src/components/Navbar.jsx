import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  User,
  LineChart,
  Briefcase,
  Wrench,
  Lightbulb,
  Bell,
  RotateCcw,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building2,
  LogOut,
  KeyRound,
  ShieldAlert,
  Sun,
  Moon,
  Zap
} from 'lucide-react';

export default function Navbar() {
  const { user, profile, resetDemoData, summary, logout, theme, setTheme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Compass },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Career Fit', path: '/analysis', icon: LineChart, highlight: true },
    { name: 'Careers', path: '/careers', icon: Briefcase },
    { name: 'Skills', path: '/skills', icon: Wrench },
    { name: 'Recommendations', path: '/recommendations', icon: Lightbulb }
  ];

  if (user?.role === 'admin') {
    navItems.unshift({ name: 'Admin Portal', path: '/admin', icon: Building2, adminOnly: true });
  }

  const notifications = [
    { id: 1, title: 'Security Audit Log Updated', desc: 'PoLP enforcement verified cryptographic JWT claim.', time: 'Just now' },
    { id: 2, title: 'Skill Gap Identified', desc: 'SIEM and Incident Response are required for Cybersecurity Analyst.', time: '10m ago' },
    { id: 3, title: 'Readiness Benchmark', desc: 'Profile satisfies core competencies at 75% weighted readiness.', time: '1h ago' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'} className="flex items-center gap-2.5 group shrink-0">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 shrink-0">
                <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-4.5 h-4.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-lg font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
                  Career<span className="text-cyan-400">Lens</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wide font-medium hidden 2xl:inline-block whitespace-nowrap">
                  Cybersecurity-Enabled Readiness Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            {user && (
              <nav className="hidden xl:flex items-center gap-1 shrink-0">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 shrink-0 ${
                          item.adminOnly
                            ? isActive
                              ? 'text-amber-300 bg-amber-950/80 border border-amber-700/80 shadow-sm'
                              : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-800/40'
                            : isActive
                            ? 'text-cyan-300 bg-slate-800/90 border border-slate-700/80 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                        }`
                      }
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${item.adminOnly ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0 ml-0.5" />
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right: Role Badges & User Menu */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Role Badge Indicator */}
            {user && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono">
                {user.role === 'admin' ? (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> ⚡ ADMIN ROLE
                  </span>
                ) : (
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 🔒 STUDENT ROLE
                  </span>
                )}
              </div>
            )}

            {/* Quick Demo Reset Button */}
            {user && (
              <button
                onClick={resetDemoData}
                title="Reset Demo Data"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 transition-all shadow-sm shrink-0 whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="whitespace-nowrap">Reset Demo</span>
              </button>
            )}

            {/* 1-Click Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 transition-all text-xs font-semibold text-slate-200 hover:text-white shadow-sm shrink-0"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline-block text-[11px] font-medium">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline-block text-[11px] font-medium">Light Mode</span>
                </>
              )}
            </button>

            {/* User Avatar & Dropdown */}
            {user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/60 transition-all text-left shrink-0"
                >
                  <div className={`relative w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm shrink-0 ${
                    user.role === 'admin'
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-600 text-slate-950'
                      : 'bg-gradient-to-tr from-cyan-600 to-violet-600 text-white'
                  }`}>
                    {user.name?.split(' ').map((n) => n[0]).join('') || 'U'}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#07090e]" />
                  </div>
                  <div className="hidden lg:flex flex-col shrink-0">
                    <span className="text-xs font-semibold text-slate-200 leading-tight whitespace-nowrap">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none whitespace-nowrap mt-0.5 font-mono uppercase">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block shrink-0" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-700/80 bg-[#0d111b] shadow-2xl backdrop-blur-xl py-2 px-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-400">
                        Role: {user.role.toUpperCase()}
                      </div>
                    </div>

                    {user.role === 'admin' ? (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-950/40 rounded-lg transition-colors"
                      >
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        Admin Control Center
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5 text-cyan-400" />
                          Student Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Student Profile
                        </Link>
                      </>
                    )}

                    <div className="my-1 border-t border-slate-800" />

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-red-400 hover:bg-red-950/30 rounded-lg transition-colors font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </span>
                      <span className="text-[10px] font-mono text-red-500">JWT Terminate</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            {user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors shrink-0"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && user && (
          <div className="xl:hidden py-3 border-t border-slate-800/80 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-800/60'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
            <div className="pt-2 px-1">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-950/30 border border-red-800/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
