import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Compass,
  LineChart,
  ShieldCheck,
  Check,
  AlertTriangle,
  X,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Plus,
  RefreshCw,
  ExternalLink,
  Award
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';
import GapCard from '../components/GapCard';
import ProficiencySelector from '../components/ProficiencySelector';

const LEVEL_TO_PERCENT = {
  'beginner': 25,
  'intermediate': 50,
  'advanced': 75,
  'expert': 100
};

export default function AnalysisPage() {
  const { profile, refreshData, switchTargetCareer, showToast } = useApp();
  const [analysis, setAnalysis] = useState(null);
  const [allCareers, setAllCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [selectedCareerSlug, setSelectedCareerSlug] = useState('cybersecurity-analyst');
  const [quickEditSkill, setQuickEditSkill] = useState(null);

  // Load analysis for selected career or target career
  const fetchAnalysisData = async (slug) => {
    try {
      setLoading(true);
      const targetSlug = slug || profile?.targetCareerSlug || 'cybersecurity-analyst';
      setSelectedCareerSlug(targetSlug);

      const [analysisData, careersData] = await Promise.all([
        api.careers.getAnalysis(targetSlug),
        api.careers.getAll()
      ]);

      setAnalysis(analysisData);
      setAllCareers(careersData || []);

      // If score is high, shoot joyful confetti celebration!
      if (analysisData?.score >= 70) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas-confetti unavailable
        }
      }
    } catch (err) {
      console.error('Failed to load analysis:', err);
      showToast('Error loading analysis data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysisData(profile?.targetCareerSlug);
  }, [profile?.targetCareerSlug]);

  const handleCareerChange = async (newSlug) => {
    setSelectedCareerSlug(newSlug);
    await switchTargetCareer(newSlug);
    await fetchAnalysisData(newSlug);
  };

  const handleQuickProficiencyUpdate = async (skillName, newLevel) => {
    try {
      await api.skills.add({
        name: skillName,
        proficiency: newLevel,
        category: 'Technical'
      });
      showToast(`Updated ${skillName} to ${newLevel}! Recalculating fit...`, 'success');
      setQuickEditSkill(null);
      await refreshData();
      await fetchAnalysisData(selectedCareerSlug);
    } catch (err) {
      showToast(`Update error: ${err.message}`, 'error');
    }
  };

  if (loading && !analysis) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
        <p className="text-sm font-semibold text-slate-400">Computing real-time career readiness analytics...</p>
      </div>
    );
  }

  const score = analysis?.score ?? 78;
  const career = analysis?.career;
  const matchedCount = analysis?.matchedCount ?? 10;
  const partialCount = analysis?.partialCount ?? 4;
  const missingCount = analysis?.missingCount ?? 2;
  const totalRequired = analysis?.totalRequired ?? 16;
  const gaps = analysis?.gaps || [];

  return (
    <div className="space-y-10 pb-20">
      {/* Top Header & Career Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deterministic Career Readiness Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Career Fit Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Compare your proficiencies against verified industry benchmarks for your target role.
          </p>
        </div>

        {/* Target Career Dropdown Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-semibold hidden sm:inline-block">
            Target Career:
          </label>
          <div className="relative">
            <select
              value={selectedCareerSlug}
              onChange={(e) => handleCareerChange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs font-bold text-white shadow-lg cursor-pointer outline-none transition-all"
            >
              {allCareers.map((c) => (
                <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main WOW HERO Card: Radial Donut + Big Score + Headline */}
      <div className="relative rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900/95 via-[#0c111e] to-[#090d16] p-8 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden glass-card-glow">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-violet-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Radial Donut Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner">
            <RadialGauge
              score={score}
              size={230}
              strokeWidth={16}
              matchedCount={matchedCount}
              partialCount={partialCount}
              missingCount={missingCount}
              label="Career Ready"
              sublabel={career?.title}
            />
          </div>

          {/* Right Column: Hero Metrics & Insights */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400">
                Target Role Fit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                {career?.title || 'Cybersecurity Analyst'}
              </h2>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>{analysis?.readinessHeadline || "You're on the right track!"}</span>
              </div>
            </div>

            {/* Three Breakdown Counter Cards (Section 14) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center shadow-lg">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Matched</span>
                </div>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {matchedCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Full proficiency
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center shadow-lg">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Partial</span>
                </div>
                <span className="text-3xl font-extrabold text-amber-400 font-mono">
                  {partialCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Needs leveling up
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center shadow-lg">
                <div className="flex items-center justify-center gap-1.5 text-rose-400 mb-1">
                  <X className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Missing</span>
                </div>
                <span className="text-3xl font-extrabold text-rose-400 font-mono">
                  {missingCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Not yet in profile
                </span>
              </div>
            </div>

            {/* Quick Transparency Note */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              <span>
                Calculation based on <strong>{totalRequired}</strong> industry requirement benchmarks.
              </span>
              <button
                onClick={() => setShowFormulaModal(!showFormulaModal)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 ml-2 shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>How is this calculated?</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Accordion / Modal (Section 17 requirement) */}
      {showFormulaModal && (
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl shadow-xl animate-in fade-in space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">
                How is your readiness score calculated?
              </h3>
            </div>
            <button
              onClick={() => setShowFormulaModal(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            CareerLens uses a transparent and explainable weighted scoring model. Each required career skill is evaluated against your current proficiency:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <strong className="text-emerald-400 block mb-1">✓ Matched = 100% (1.0 pt)</strong>
              <p className="text-slate-300">Your proficiency meets or exceeds the required level.</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
              <strong className="text-amber-400 block mb-1">◐ Partial = 50% (0.5 pt)</strong>
              <p className="text-slate-300">You possess the skill, but your proficiency is lower than required.</p>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30">
              <strong className="text-rose-400 block mb-1">✕ Missing = 0% (0.0 pt)</strong>
              <p className="text-slate-300">The skill has not yet been added to your student profile.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Overall Score = (Sum of achieved skill points / Total required points) × 100</span>
            <span className="text-emerald-400 font-bold">
              {analysis?.methodology?.rawCalculation || `${matchedCount * 1 + partialCount * 0.5} / ${totalRequired} = ${score}%`}
            </span>
          </div>
        </div>
      )}

      {/* Section 9: SKILL ANALYSIS TABLE */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Required Competencies
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Skill Comparison Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Detailed side-by-side view of your proficiency vs target career requirements.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-xl shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Skill</th>
                  <th className="py-3.5 px-4">Importance</th>
                  <th className="py-3.5 px-4">Required Level</th>
                  <th className="py-3.5 px-4">Your Level</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {analysis?.skillsBreakdown?.map((item) => {
                  const isMatched = item.status === 'Matched';
                  const isPartial = item.status === 'Partial';
                  const isMissing = item.status === 'Missing';

                  const studentPercent = LEVEL_TO_PERCENT[item.studentLevel?.toLowerCase()] || 0;
                  const reqPercent = LEVEL_TO_PERCENT[item.requiredLevel?.toLowerCase()] || 50;

                  return (
                    <tr
                      key={item.name}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Skill Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </div>
                      </td>

                      {/* Importance */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-[10px] font-mono text-slate-300">
                          {item.importance}
                        </span>
                      </td>

                      {/* Required Level */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-cyan-300 font-mono">
                            {item.requiredLevel}
                          </span>
                        </div>
                      </td>

                      {/* Your Level + Visual Progress Bar */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span
                            className={`font-mono font-semibold ${
                              item.studentLevel === '—'
                                ? 'text-slate-500'
                                : 'text-slate-200'
                            }`}
                          >
                            {item.studentLevel}
                          </span>
                          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isMatched
                                  ? 'bg-emerald-400'
                                  : isPartial
                                  ? 'bg-amber-400'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${studentPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isMatched && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                            <Check className="w-3.5 h-3.5" />
                            <span>Matched</span>
                          </span>
                        )}
                        {isPartial && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/30">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Partial</span>
                          </span>
                        )}
                        {isMissing && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-950/60 text-rose-400 border border-rose-500/30">
                            <X className="w-3.5 h-3.5" />
                            <span>Missing</span>
                          </span>
                        )}
                      </td>

                      {/* Quick Action Button */}
                      <td className="py-3.5 px-4 text-right">
                        {isMatched ? (
                          <span className="text-[11px] text-emerald-400/80 font-mono">
                            ✓ Satisfied
                          </span>
                        ) : (
                          <button
                            onClick={() => setQuickEditSkill(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 transition-all shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                            <span>{isMissing ? 'Add Skill' : 'Upgrade'}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 15: YOUR SKILL GAPS CARDS */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Priority Actions
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Your Skill Gaps ({gaps.length})
            </h3>
            <p className="text-xs text-slate-400">
              Address these missing or partial proficiencies to boost your career readiness to 90%+.
            </p>
          </div>
        </div>

        {gaps.length === 0 ? (
          <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-2">
            <Check className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">All Skills Satisfied!</h4>
            <p className="text-xs text-slate-300">
              Your profile satisfies all core requirements for {career?.title}. You are ready for entry and mid-tier roles!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gaps.map((gap) => (
              <GapCard
                key={gap.skillName}
                gap={gap}
                onResolved={() => fetchAnalysisData(selectedCareerSlug)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Skill Level Up Modal */}
      {quickEditSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#0d121f] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-cyan-400 font-semibold uppercase">Quick Profile Update</span>
                <h3 className="text-lg font-bold text-white">
                  Update Proficiency: {quickEditSkill.name}
                </h3>
              </div>
              <button
                onClick={() => setQuickEditSkill(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Target requirement: <strong className="text-cyan-300">{quickEditSkill.requiredLevel}</strong>. Select your verified level:
            </p>

            <ProficiencySelector
              value={quickEditSkill.requiredLevel}
              onChange={(lvl) => handleQuickProficiencyUpdate(quickEditSkill.name, lvl)}
            />

            <div className="pt-2 text-right">
              <button
                onClick={() => setQuickEditSkill(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
