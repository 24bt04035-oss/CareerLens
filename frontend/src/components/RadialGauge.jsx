import React from 'react';

export default function RadialGauge({
  score = 78,
  size = 220,
  strokeWidth = 14,
  matchedCount = 10,
  partialCount = 4,
  missingCount = 2,
  showBreakdown = true,
  label = "Career Ready",
  sublabel
}) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  // Dynamic color palette based on readiness
  const getColors = () => {
    if (safeScore >= 75) {
      return {
        stroke: '#10b981', // emerald-500
        glow: 'rgba(16, 185, 129, 0.35)',
        text: 'text-emerald-400',
        badge: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
      };
    } else if (safeScore >= 50) {
      return {
        stroke: '#f59e0b', // amber-500
        glow: 'rgba(245, 158, 11, 0.35)',
        text: 'text-amber-400',
        badge: 'bg-amber-950/60 text-amber-400 border-amber-500/30'
      };
    } else {
      return {
        stroke: '#f43f5e', // rose-500
        glow: 'rgba(244, 63, 94, 0.35)',
        text: 'text-rose-400',
        badge: 'bg-rose-950/60 text-rose-400 border-rose-500/30'
      };
    }
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Outer Glow Halo */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: colors.stroke }}
        />

        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-70"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease',
              filter: `drop-shadow(0 0 10px ${colors.glow})`
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex items-baseline">
            {safeScore}
            <span className="text-xl sm:text-2xl font-bold text-slate-400 ml-0.5">%</span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
            {label}
          </span>
          {sublabel && (
            <span className="text-[11px] text-slate-500 mt-0.5 max-w-[140px] truncate">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {/* Pill Counters Breakdown */}
      {showBreakdown && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="text-xs font-medium text-slate-300">
              Matched: <strong className="text-emerald-400 font-bold">{matchedCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
            <span className="text-xs font-medium text-slate-300">
              Partial: <strong className="text-amber-400 font-bold">{partialCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-rose-500/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400/50" />
            <span className="text-xs font-medium text-slate-300">
              Missing: <strong className="text-rose-400 font-bold">{missingCount}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
