import React from 'react';

const PROFICIENCY_OPTIONS = [
  { level: 'Beginner', desc: 'Fundamentals & basic syntax', color: 'border-slate-500/50 text-slate-300 active:bg-slate-700/50' },
  { level: 'Intermediate', desc: 'Applied projects & debugging', color: 'border-blue-500/50 text-blue-300 active:bg-blue-900/30' },
  { level: 'Advanced', desc: 'Complex systems & optimization', color: 'border-cyan-500/50 text-cyan-300 active:bg-cyan-900/30' },
  { level: 'Expert', desc: 'Architectural mastery & leadership', color: 'border-purple-500/50 text-purple-300 active:bg-purple-900/30' }
];

export default function ProficiencySelector({ value, onChange, compact = false }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PROFICIENCY_OPTIONS.map((opt) => {
        const isSelected = (value || '').toLowerCase() === opt.level.toLowerCase();

        if (compact) {
          return (
            <button
              key={opt.level}
              type="button"
              onClick={() => onChange(opt.level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              {opt.level}
            </button>
          );
        }

        return (
          <button
            key={opt.level}
            type="button"
            onClick={() => onChange(opt.level)}
            className={`group relative flex-1 min-w-[120px] p-3 rounded-xl border text-left transition-all duration-200 ${
              isSelected
                ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/15'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className={`text-xs font-bold ${
                  isSelected ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {opt.level}
              </span>
              <div
                className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-400'
                    : 'border-slate-600 group-hover:border-slate-500'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {opt.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
}
