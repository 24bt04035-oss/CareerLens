import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/60">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#07090e] rounded-[6px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Career<span className="text-cyan-400">Lens</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Smart Student Career Profile & Career Readiness Analyzer. Helping university students evaluate skill gaps, benchmark readiness, and navigate structured career pathways.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1 text-cyan-400/90 font-mono">
                <Sparkles className="w-3 h-3" /> Hackathon Edition MVP
              </span>
              <span>•</span>
              <span>Arya Tia Demo Profile</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Main Dashboard
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="hover:text-cyan-400 transition-colors">
                  Career Fit Analysis
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-cyan-400 transition-colors">
                  Explore 8 Career Paths
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-400 transition-colors">
                  Skill Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Career Intelligence
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/recommendations" className="hover:text-cyan-400 transition-colors">
                  Actionable Recommendations
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-cyan-400 transition-colors">
                  Student Portfolio
                </Link>
              </li>
              <li>
                <Link to="/profile/edit" className="hover:text-cyan-400 transition-colors">
                  Profile Builder
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  Enterprise Recruiter Portal (v2)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CareerLens. "See where you stand. Know where to go."</p>
          <p className="flex items-center gap-1.5">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for University Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}
