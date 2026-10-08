import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
  Layers,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import GapCard from '../components/GapCard';

export default function RecommendationsPage() {
  const { profile, refreshData, showToast } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const res = await api.recommendations.get();
      setData(res);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [profile?.targetCareerSlug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Generating dynamic recommendation roadmap...</p>
      </div>
    );
  }

  const recommendations = data?.recommendations || [];
  const targetCareer = data?.targetCareer || { title: 'Cybersecurity Analyst' };
  const currentScore = data?.score ?? 78;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold text-cyan-400 mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Rule-Based Action Roadmap Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Targeted Learning Recommendations
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Personalized, actionable milestones to bridge your skill gaps for <strong>{targetCareer.title}</strong>.
          </p>
        </div>

        {/* Current status card */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Gaps Identified
            </span>
            <span className="text-lg font-bold text-rose-400 font-mono">
              {recommendations.length} items
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 font-mono font-bold text-sm border border-cyan-800/60">
            {currentScore}% Fit
          </div>
        </div>
      </div>

      {/* Hero Banner: Why Take Action Now */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-violet-950/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Projected Hiring Velocity</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Closing your {recommendations.length} skill gaps increases readiness to 100%
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            Each recommendation below links directly to industry labs and hands-on portfolio projects. Once completed, mark the skill as acquired to see your score surge.
          </p>
        </div>

        <Link
          to="/analysis"
          className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md"
        >
          View Gap Matrix →
        </Link>
      </div>

      {/* Recommendations Cards Grid */}
      {recommendations.length === 0 ? (
        <div className="p-12 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-3">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Critical Gaps Remaining!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            You currently possess all core and specialized competencies required for {targetCareer.title}. Consider applying for internships or exploring adjacent tracks like Cloud Engineering.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <GapCard
              key={rec.skillName}
              gap={rec}
              onResolved={loadRecommendations}
            />
          ))}
        </div>
      )}
    </div>
  );
}
