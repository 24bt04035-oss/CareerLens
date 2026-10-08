import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronLeft,
  Sparkles,
  BarChart3
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';

export default function CareerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { switchTargetCareer, showToast } = useApp();
  const [career, setCareer] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareer() {
      try {
        setLoading(true);
        const [cData, aData] = await Promise.all([
          api.careers.getById(id),
          api.careers.getAnalysis(id)
        ]);
        setCareer(cData);
        setAnalysis(aData);
      } catch (err) {
        console.error('Error fetching career detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCareer();
  }, [id]);

  const handleSetTarget = async () => {
    if (!career) return;
    await switchTargetCareer(career.slug);
    showToast(`Set ${career.title} as your target career!`, 'success');
    navigate('/analysis');
  };

  if (loading || !career) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const score = analysis?.score ?? 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <div>
        <Link
          to="/careers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </Link>
      </div>

      {/* Main Career Hero Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              {career.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {career.title}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {career.description}
            </p>
          </div>

          <button
            onClick={handleSetTarget}
            className="shrink-0 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
          >
            <span>Set as Target & Analyze Fit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Market stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Salary Benchmark</span>
            <span className="font-bold text-white text-base font-mono mt-0.5 block">
              {career.avgSalary}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Industry Demand</span>
            <span className="font-bold text-emerald-400 text-base mt-0.5 block">
              {career.marketGrowth}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Your Immediate Match</span>
            <span className="font-bold text-cyan-400 text-base font-mono mt-0.5 block">
              {score}% Readiness
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Required Skills & Readiness Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Required skills table */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">
            Required Career Competencies ({career.skills?.length || 0})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-3">Skill</th>
                  <th className="py-3 px-3">Importance</th>
                  <th className="py-3 px-3">Required Level</th>
                  <th className="py-3 px-3">Your Level</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {analysis?.skillsBreakdown?.map((s) => (
                  <tr key={s.name} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-white">{s.name}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{s.importance}</td>
                    <td className="py-3 px-3 text-cyan-300 font-semibold font-mono">{s.requiredLevel}</td>
                    <td className="py-3 px-3 text-slate-300 font-mono">{s.studentLevel}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          s.status === 'Matched'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                            : s.status === 'Partial'
                            ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                            : 'bg-rose-950/60 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Readiness Radial Card */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Readiness Preview
          </h4>
          <RadialGauge
            score={score}
            size={180}
            matchedCount={analysis?.matchedCount || 0}
            partialCount={analysis?.partialCount || 0}
            missingCount={analysis?.missingCount || 0}
            label="Match"
          />
          <button
            onClick={handleSetTarget}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md"
          >
            Launch Full Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}
