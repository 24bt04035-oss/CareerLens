import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Compass,
  UserCheck,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  BrainCircuit,
  Code2,
  Sparkles,
  Layers,
  ArrowRight,
  ChevronRight,
  Plus,
  RefreshCw,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Award,
  BookOpen
} from 'lucide-react';
import StatCard from '../components/StatCard';
import RadialGauge from '../components/RadialGauge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function DashboardPage() {
  const { user, profile, summary, refreshData, switchTargetCareer, showToast } = useApp();
  const [careersList, setCareersList] = useState([]);
  const [bestFits, setBestFits] = useState([]);
  const [changingCareer, setChangingCareer] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadExtraData() {
      try {
        setLoading(true);
        const [careersData, bestFitData] = await Promise.all([
          api.careers.getAll().catch(() => []),
          api.analysis.getBestFit().catch(() => [])
        ]);
        setCareersList(careersData || []);
        setBestFits(bestFitData || []);
      } catch (err) {
        console.error('Error fetching dashboard extras:', err);
      } finally {
        setLoading(false);
      }
    }
    loadExtraData();
  }, []);

  const handleCareerChange = async (slug) => {
    setChangingCareer(false);
    await switchTargetCareer(slug);
    const updatedBestFit = await api.analysis.getBestFit().catch(() => []);
    setBestFits(updatedBestFit);
  };

  // Safe fallback metrics
  const targetCareerTitle = summary?.targetCareer?.title || 'Cybersecurity Analyst';
  const readinessScore = summary?.kpis?.careerReadiness ?? 78;
  const profileCompletion = summary?.kpis?.profileCompletion ?? 85;
  const matchedDisplay = summary?.kpis?.skillsMatched || '12 / 16';
  const gapsCount = summary?.kpis?.skillGaps ?? 4;
  const matchedCount = summary?.kpis?.skillsMatchedCount ?? 10;
  const partialCount = summary?.kpis?.partialCount ?? 4;
  const missingCount = summary?.kpis?.missingCount ?? 2;

  // Chart data for Readiness across available careers
  const chartCareersData = bestFits.slice(0, 5).map((c) => ({
    name: c.title.replace(' Analyst', '').replace(' Engineer', '').replace(' Developer', ''),
    score: c.score,
    fullTitle: c.title
  }));

  // Skill distribution data (Technical vs Soft)
  const skillDistData = [
    { name: 'Technical Skills', value: summary?.skillDistribution?.technical || 7, color: '#38bdf8' },
    { name: 'Soft Skills', value: summary?.skillDistribution?.soft || 3, color: '#a855f7' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Dashboard Top Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Hello, {user?.name || 'Arya Tia'} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Let's see how close you are to your career goal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/skills"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Skills</span>
          </Link>

          <Link
            to="/analysis"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Run Deep Fit Analysis</span>
          </Link>
        </div>
      </div>

      {/* Four KPI Cards from Section 7 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Profile Completion */}
        <StatCard
          title="Profile Completion"
          value={`${profileCompletion}%`}
          subvalue="Academic & Projects"
          icon={UserCheck}
          progress={profileCompletion}
          progressColor="bg-gradient-to-r from-blue-500 to-cyan-400"
          gradient="from-blue-600/20 to-cyan-500/10"
          glowColor="rgba(56, 189, 248, 0.2)"
          badge="Verified Student Profile"
          badgeColor="bg-blue-950/60 text-blue-300 border-blue-800/50"
        />

        {/* KPI 2: Career Readiness */}
        <StatCard
          title="Career Readiness"
          value={`${readinessScore}%`}
          subvalue="Weighted Fit"
          icon={TrendingUp}
          progress={readinessScore}
          progressColor="bg-gradient-to-r from-emerald-500 to-teal-400"
          gradient="from-emerald-600/20 to-cyan-500/10"
          glowColor="rgba(16, 185, 129, 0.2)"
          badge={readinessScore >= 75 ? 'Target Fit: Strong' : 'Developing Fit'}
          badgeColor="bg-emerald-950/60 text-emerald-300 border-emerald-800/50"
        />

        {/* KPI 3: Skills Matched */}
        <StatCard
          title="Skills Matched"
          value={matchedDisplay}
          subvalue="Target Competencies"
          icon={CheckCircle}
          progress={(matchedCount / (summary?.kpis?.totalRequired || 8)) * 100}
          progressColor="bg-gradient-to-r from-cyan-500 to-blue-400"
          gradient="from-cyan-600/20 to-violet-500/10"
          glowColor="rgba(6, 182, 212, 0.2)"
          badge={`${matchedCount} Core Skills Satisfied`}
          badgeColor="bg-cyan-950/60 text-cyan-300 border-cyan-800/50"
        />

        {/* KPI 4: Skill Gaps */}
        <StatCard
          title="Skill Gaps"
          value={gapsCount}
          subvalue="Actionable Items"
          icon={AlertCircle}
          progress={gapsCount > 0 ? (gapsCount / (summary?.kpis?.totalRequired || 8)) * 100 : 0}
          progressColor="bg-gradient-to-r from-amber-500 to-rose-400"
          gradient="from-amber-600/20 to-rose-500/10"
          glowColor="rgba(245, 158, 11, 0.2)"
          badge={`${missingCount} Missing • ${partialCount} Partial`}
          badgeColor="bg-amber-950/60 text-amber-300 border-amber-800/50"
        />
      </div>

      {/* Main Grid: Target Career Card + Career Readiness Donut Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Large Target Career Card (Section 7) */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-[#0c101a] p-6 sm:p-7 backdrop-blur-xl shadow-xl relative overflow-hidden glass-card-glow">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                Your Target Career
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {targetCareerTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                {summary?.targetCareer?.description ||
                  'Protect systems, networks, and data from cyber threats and intrusions.'}
              </p>
            </div>

            <button
              onClick={() => setChangingCareer(true)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-medium flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3 text-cyan-400" />
              <span>Change Target</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 my-6 py-4 px-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-400 block">Expected Skills</span>
              <span className="text-xl font-bold text-white font-mono">
                {summary?.kpis?.totalRequired || 8}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Your Skills</span>
              <span className="text-xl font-bold text-cyan-300 font-mono">
                {summary?.skillDistribution?.total || 10}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Readiness</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">
                {readinessScore}%
              </span>
            </div>
          </div>

          {/* Call to action & analysis route */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent skill comparison: 100% matched weight, 50% partial weight, 0% missing weight.
            </p>
            <Link
              to="/analysis"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <span>View Career Analysis →</span>
            </Link>
          </div>
        </div>

        {/* Section 8: Large Career Readiness Visualization */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Career Readiness Visualization
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {targetCareerTitle}
              </span>
            </div>

            {/* Glowing Donut/Radial score */}
            <div className="py-2">
              <RadialGauge
                score={readinessScore}
                size={200}
                matchedCount={matchedCount}
                partialCount={partialCount}
                missingCount={missingCount}
                label="Career Ready"
              />
            </div>
          </div>

          {/* Short explanation requirement from Section 8 */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-semibold block mb-0.5">
              Analyzer Insight:
            </span>
            "You're strong in networking and Linux, but improving SIEM and incident response would significantly increase your readiness."
          </div>
        </div>
      </div>

      {/* Career Change Modal */}
      {changingCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-[#0d121f] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Select Your Target Career</h3>
                <p className="text-xs text-slate-400">Choose any of the 8 predefined university career profiles</p>
              </div>
              <button
                onClick={() => setChangingCareer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {careersList.map((c) => {
                const isCurrent = c.slug === profile?.targetCareerSlug;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleCareerChange(c.slug)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-md'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{c.title}</span>
                        {isCurrent && (
                          <span className="text-[10px] text-cyan-400 font-semibold">Active</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mb-2">{c.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/60">
                      <span className="text-slate-400">{c.totalSkills || c.skills?.length} skills</span>
                      <span className="text-emerald-400 font-semibold">{c.fitScore || 0}% fit</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section 20: "BEST FIT CAREERS" / Careers You Could Pursue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Cross-Disciplinary Fit
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Careers You Could Pursue
            </h2>
            <p className="text-xs text-slate-400">
              Algorithmically calculated across all 8 career models based on your current skills.
            </p>
          </div>

          <Link
            to="/careers"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Browse All 8 Careers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bestFits.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700/80 text-white">
                    {item.badge}
                  </span>
                  <span className="text-lg font-extrabold text-cyan-400 font-mono">
                    {item.score}%
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 py-2 border-y border-slate-800/80">
                  <span>Matched: <strong className="text-emerald-400">{item.matchedCount}</strong></span>
                  <span>Partial: <strong className="text-amber-400">{item.partialCount}</strong></span>
                  <span>Missing: <strong className="text-rose-400">{item.missingCount}</strong></span>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between">
                <button
                  onClick={() => handleCareerChange(item.slug)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all hover:text-white"
                >
                  <span>Explore Career →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section (Technical vs Soft skills + Career readiness comparison) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Career Readiness Comparison Bar Chart */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Career Readiness Across Roles
              </h3>
              <p className="text-xs text-slate-400">
                Compare where your skill portfolio delivers the highest immediate leverage
              </p>
            </div>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartCareersData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  domain={[0, 100]}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs">
                          <p className="font-bold text-white">{data.fullTitle}</p>
                          <p className="text-cyan-400 font-mono mt-0.5">
                            Readiness: {data.score}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {chartCareersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.score >= 75
                          ? '#10b981'
                          : entry.score >= 50
                          ? '#06b6d4'
                          : '#6366f1'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Distribution: Technical vs Soft Skills */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Skill Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Technical vs Soft skills balance
            </p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillDistData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950 border border-slate-700 p-2 rounded-lg text-xs">
                            <span className="font-semibold text-white">{payload[0].name}: </span>
                            <span className="text-cyan-400 font-bold">{payload[0].value} skills</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-[11px] text-slate-400">Technical</span>
              </div>
              <span className="text-lg font-bold text-white">
                {summary?.skillDistribution?.technical || 7}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-[11px] text-slate-400">Soft Skills</span>
              </div>
              <span className="text-lg font-bold text-white">
                {summary?.skillDistribution?.soft || 3}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
