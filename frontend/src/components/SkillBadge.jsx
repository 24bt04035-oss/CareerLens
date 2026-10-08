import React from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';

export default function SkillBadge({
  name,
  proficiency,
  status,
  requiredLevel,
  size = 'md',
  showDetails = false
}) {
  const getStatusBadge = () => {
    switch (status) {
      case 'Matched':
        return {
          icon: Check,
          text: 'Matched',
          containerClass: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
        };
      case 'Partial':
        return {
          icon: AlertTriangle,
          text: 'Partial',
          containerClass: 'bg-amber-950/40 text-amber-400 border-amber-500/30'
        };
      case 'Missing':
        return {
          icon: X,
          text: 'Missing',
          containerClass: 'bg-rose-950/40 text-rose-400 border-rose-500/30'
        };
      default:
        return null;
    }
  };

  const getProficiencyClass = (level) => {
    switch ((level || '').toLowerCase()) {
      case 'expert':
        return 'bg-purple-950/40 text-purple-300 border-purple-500/30';
      case 'advanced':
        return 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30';
      case 'intermediate':
        return 'bg-blue-950/40 text-blue-300 border-blue-500/30';
      case 'beginner':
        return 'bg-slate-800/60 text-slate-300 border-slate-700/40';
      default:
        return 'bg-slate-800/40 text-slate-400 border-slate-700/30';
    }
  };

  const statusConfig = getStatusBadge();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-medium hover:border-slate-700 transition-colors shadow-sm">
      <span className="font-semibold text-white">{name}</span>

      {proficiency && (
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-mono tracking-wider border ${getProficiencyClass(
            proficiency
          )}`}
        >
          {proficiency}
        </span>
      )}

      {statusConfig && (
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold border ${statusConfig.containerClass}`}
        >
          <statusConfig.icon className="w-3 h-3" />
          {statusConfig.text}
        </span>
      )}

      {showDetails && requiredLevel && (
        <span className="text-[10px] text-slate-400">
          Req: <span className="text-slate-300">{requiredLevel}</span>
        </span>
      )}
    </div>
  );
}
