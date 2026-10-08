import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import CareerCard from '../components/CareerCard';
import { useApp } from '../context/AppContext';
import { Briefcase, Search, Sparkles, Filter } from 'lucide-react';

export default function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { profile, switchTargetCareer } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCareers() {
      try {
        setLoading(true);
        const data = await api.careers.getAll();
        setCareers(data || []);
      } catch (err) {
        console.error('Failed to load careers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCareers();
  }, []);

  const categories = ['All', 'Security & Infrastructure', 'Data & Analytics', 'Engineering & Development', 'Artificial Intelligence', 'Design & Product', 'Product & Leadership'];

  const filteredCareers = careers.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.skills?.some(s => s.name.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAnalyzeFit = async (career) => {
    await switchTargetCareer(career.slug);
    navigate('/analysis');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>8 Predefined University Career Pathways</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Explore Career Tracks
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Select any industry career profile to instantly benchmark your skills, discover requirements, and evaluate your readiness fit score.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles or skills (e.g. Python, Cloud)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Career Cards Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((c) => (
            <CareerCard
              key={c.id}
              career={c}
              isTarget={c.slug === profile?.targetCareerSlug}
              onAnalyze={handleAnalyzeFit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
