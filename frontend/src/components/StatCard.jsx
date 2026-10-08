import React from 'react';

export default function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  gradient = 'from-cyan-500/20 to-blue-500/10',
  glowColor = 'rgba(56, 189, 248, 0.25)',
  borderColor = 'border-slate-800',
  progress,
  progressColor = 'bg-cyan-500',
  badge,
  badgeColor = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${borderColor} bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/80 shadow-lg hover:shadow-2xl`}
      style={{
        boxShadow: `0 4px 20px -2px ${glowColor}`
      }}
    >
      {/* Background Gradient Accents */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} rounded-full blur-2xl pointer-events-none -mr-10 -mt-10`} />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {value}
            </span>
            {subvalue && (
              <span className="text-xs text-slate-400 font-medium">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-400 shadow-inner">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Progress Bar (if provided) */}
      {typeof progress === 'number' && (
        <div className="mt-4 space-y-1.5">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {/* Badge or Meta */}
      {badge && (
        <div className="mt-3.5 flex items-center justify-between text-xs">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium border text-[11px] ${badgeColor}`}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
