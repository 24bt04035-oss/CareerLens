import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, ExternalLink, ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export default function GapCard({ gap, onResolved }) {
  const { showToast, refreshData } = useApp();
  const [resolving, setResolving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isMissing = gap.status === 'Missing';

  const handleQuickAdd = async (level) => {
    try {
      setResolving(true);
      await api.skills.add({
        name: gap.skillName,
        proficiency: level || gap.requiredLevel,
        category: 'Technical'
      });
      showToast(`🎉 Added ${gap.skillName} (${level || gap.requiredLevel}) to your profile!`, 'success');
      setShowModal(false);
      await refreshData();
      if (onResolved) onResolved();
    } catch (err) {
      showToast(`Error adding skill: ${err.message}`, 'error');
    } finally {
      setResolving(false);
    }
  };

  return (
    <>
      <div
        className={`group relative flex flex-col justify-between rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] ${
          isMissing
            ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50 shadow-lg shadow-rose-950/30'
            : 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50 shadow-lg shadow-amber-950/30'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-xl ${
                  isMissing
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {isMissing ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
              </span>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {gap.skillName}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold border ${
                      isMissing
                        ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {gap.status}
                  </span>
                  {gap.priority && (
                    <span className="text-[10px] text-slate-400">
                      Priority: <strong className="text-slate-300">{gap.priority}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right text-[11px]">
              <span className="text-slate-400 block">Required:</span>
              <span className="font-semibold text-cyan-300 font-mono">
                {gap.requiredLevel}
              </span>
              <span className="text-slate-400 block mt-1">Current:</span>
              <span className="font-semibold text-slate-300 font-mono">
                {gap.currentLevel}
              </span>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="space-y-2 mb-4 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Why it matters:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {gap.whyItMatters}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                Recommended action:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {gap.recommendedAction}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
          {gap.learningTime && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3 text-cyan-400" />
              {gap.learningTime}
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/50 hover:border-cyan-700 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start Learning</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              disabled={resolving}
              onClick={() => handleQuickAdd(gap.requiredLevel)}
              title="Add this skill at required proficiency to close the gap"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/50 transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{resolving ? 'Updating...' : '+ I have this'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Learning Resource Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0d111b] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  Targeted Learning Guide
                </span>
                <h3 className="text-lg font-bold text-white">
                  Bridge Your Gap: {gap.skillName}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <p className="font-semibold text-white mb-1">Recommended Pathway</p>
                <p>{gap.recommendedAction}</p>
              </div>

              {gap.resources && gap.resources.length > 0 && (
                <div>
                  <p className="font-semibold text-slate-200 mb-2">Curated Resources & Labs:</p>
                  <div className="space-y-2">
                    {gap.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all text-slate-200 group"
                      >
                        <div>
                          <span className="font-medium text-white group-hover:text-cyan-300">
                            {res.title}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            Type: {res.type}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Ready to level up your score?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => handleQuickAdd(gap.requiredLevel)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-md"
                >
                  Mark as Acquired ({gap.requiredLevel})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
