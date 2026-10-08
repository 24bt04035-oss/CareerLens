import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  TrendingUp,
  BarChart3,
  Layers,
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pt-6 pb-20">
      {/* Background Animated Blobs & Ambient Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-violet-600/20 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-96 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hackathon Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI & Intelligence Powered Hackathon MVP</span>
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-slate-400">Preloaded with Arya Tia Demo</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build Your Career.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-400 bg-clip-text text-transparent">
              Measure Your Readiness.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            CareerLens transforms your academic achievements, skills, projects, certifications, and experience into a clear roadmap toward your dream career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95"
            >
              <span>Build My Career Profile →</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/careers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all shadow-md hover:text-white"
            >
              <span>Explore Careers</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Visual Mock Dashboard / Readiness Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900/90 via-[#0d121f]/95 to-[#090d16] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden glass-card-glow">
            {/* Corner ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Dashboard Mock Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  careerlens.io/dashboard/readiness-analyzer
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Career Fit Engine
                </span>
              </div>
            </div>

            {/* Mock Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
              {/* Radial Readiness Score */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80">
                <RadialGauge
                  score={82}
                  size={190}
                  matchedCount={14}
                  partialCount={2}
                  missingCount={2}
                  label="Career Readiness"
                  sublabel="Target: Cybersecurity"
                />
              </div>

              {/* Target & KPI Stats */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Target Career
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                      Security & Defense
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Cybersecurity Analyst
                      </h3>
                      <p className="text-xs text-slate-400">
                        18 required industry competencies evaluated
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/30 text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">Skills Matched</span>
                    <span className="text-xl font-extrabold text-emerald-400">14 / 18</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/30 text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">Partial Skills</span>
                    <span className="text-xl font-extrabold text-amber-400">2</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-rose-500/30 text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">Skill Gaps</span>
                    <span className="text-xl font-extrabold text-rose-400">4</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">
                    "You're strong in networking and Linux; closing SIEM & incident response reaches 95%."
                  </span>
                  <Link
                    to="/analysis"
                    className="shrink-0 text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 ml-2"
                  >
                    View Fit →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Section (from user specifications) */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              The CareerLens Framework
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              From Student Profile to Career Readiness
            </h2>
            <p className="text-sm text-slate-400">
              A transparent, algorithmically verified pipeline to benchmark university students against industry hiring bars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Build Your Profile
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keep your academic records, technical proficiencies, soft skills, projects, certifications, and internships structured in one verified dashboard.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <Link to="/profile" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  View Arya Tia's Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:border-violet-500/30 hover:bg-slate-900/80 transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-violet-950/80 border border-violet-800/60 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                Analyze Your Skills
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare your current skills against real career requirements. Instant deterministic classification: Matched, Partial, and Missing skills.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <Link to="/analysis" className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">
                  Run Career Fit Analysis <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                Close Your Skill Gaps
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get actionable recommendations for becoming career-ready with curated courses, lab tutorials, and project ideas tailored to your exact target career.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <Link to="/recommendations" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View Recommendations <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Live CTA Strip */}
        <div className="mt-20 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-violet-950/40 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              Ready to see where your career stands?
            </h3>
            <p className="text-xs text-slate-400">
              Jump directly into Arya Tia's live demo or explore all 8 predefined university career profiles.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md"
            >
              Launch Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
