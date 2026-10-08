import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  BarChart3,
  BrainCircuit,
  Code2,
  Sparkles,
  Palette,
  Layers,
  Cloud,
  ArrowRight,
  TrendingUp,
  DollarSign,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ICON_MAP = {
  ShieldAlert,
  BarChart3,
  BrainCircuit,
  Code2,
  Sparkles,
  Palette,
  Layers,
  Cloud
};

export default function CareerCard({
  career,
  onAnalyze,
  isTarget = false
}) {
  const navigate = useNavigate();
  const { switchTargetCareer } = useApp();

  const Icon = ICON_MAP[career.icon] || ShieldAlert;

  const handleAnalyzeClick = async () => {
    if (onAnalyze) {
      onAnalyze(career);
    } else {
      await switchTargetCareer(career.slug);
      navigate('/analysis');
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 ${
        isTarget
          ? 'bg-[#0f172a]/90 border-cyan-500/50 shadow-xl shadow-cyan-950/40'
          : 'bg-[#0c101a]/90 border-slate-800/80 hover:border-slate-700/90 hover:bg-[#101524] hover:shadow-xl'
      }`}
    >
      {/* Target Badge */}
      {isTarget && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold text-cyan-400">
          <CheckCircle2 className="w-3 h-3" />
          <span>Active Target</span>
        </div>
      )}

      {/* Top info */}
      <div>
        <div className="flex items-center gap-3.5 mb-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-950/50 group-hover:border-cyan-500/40 transition-all shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/90 font-mono block">
              {career.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {career.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {career.description}
        </p>

        {/* Required Skills Pill List */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Core Competencies</span>
            <span className="font-semibold text-slate-300 font-mono text-[11px]">
              {career.skills?.length || career.totalRequiredSkills || 8} skills
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {career.skills?.slice(0, 5).map((s) => (
              <span
                key={s.name}
                className="px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/50 text-[11px] text-slate-300 font-medium"
              >
                {s.name}
              </span>
            ))}
            {career.skills?.length > 5 && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800/40 text-[11px] text-slate-500 font-mono">
                +{career.skills.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Meta details */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-[11px] mb-5">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Salary Range</span>
            <span className="font-semibold text-slate-200 font-mono">
              {career.avgSalary || '$95,000+'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Demand</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              {career.marketGrowth || '+25%'}
            </span>
          </div>
        </div>
      </div>

      {/* Fit Score & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/70 gap-3">
        {typeof career.fitScore === 'number' && (
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] text-slate-400">Match:</span>
            <span
              className={`text-sm font-extrabold font-mono ${
                career.fitScore >= 75
                  ? 'text-emerald-400'
                  : career.fitScore >= 50
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {career.fitScore}%
            </span>
          </div>
        )}

        <button
          onClick={handleAnalyzeClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
        >
          <span>Analyze My Fit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
