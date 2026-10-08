import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Wrench,
  Search,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle,
  Tag,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  FolderPlus
} from 'lucide-react';
import ProficiencySelector from '../components/ProficiencySelector';
import SkillBadge from '../components/SkillBadge';

const SUGGESTED_SKILLS = [
  'Python', 'Java', 'JavaScript', 'React', 'SQL', 'Excel',
  'Power BI', 'Linux', 'Networking', 'AWS', 'Docker',
  'Machine Learning', 'Figma', 'Git', 'Communication', 'Leadership',
  'SIEM', 'Incident Response', 'Cryptography', 'Threat Analysis'
];

export default function SkillsPage() {
  const { skills, refreshData, showToast, summary } = useApp();
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedSkillName, setSelectedSkillName] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState('Intermediate');
  const [selectedCategory, setSelectedCategory] = useState('Technical');
  const [activeFilterCategory, setActiveFilterCategory] = useState('All');
  const [saving, setSaving] = useState(false);

  const handleSelectSuggested = (skillName) => {
    setSelectedSkillName(skillName);
    // Auto-detect category
    if (['Communication', 'Leadership', 'Teamwork', 'Problem Solving'].includes(skillName)) {
      setSelectedCategory('Soft Skills');
    } else if (['SIEM', 'Incident Response', 'Cryptography', 'Threat Analysis', 'Cybersecurity Fundamentals'].includes(skillName)) {
      setSelectedCategory('Security');
    } else if (['SQL', 'Excel', 'Power BI', 'Statistics', 'Pandas', 'NumPy'].includes(skillName)) {
      setSelectedCategory('Data & Analytics');
    } else {
      setSelectedCategory('Technical');
    }
  };

  const handleSaveSkill = async (e) => {
    if (e) e.preventDefault();
    const nameToAdd = selectedSkillName.trim();
    if (!nameToAdd) {
      showToast('Please specify a skill name', 'error');
      return;
    }

    try {
      setSaving(true);
      await api.skills.add({
        name: nameToAdd,
        proficiency: selectedProficiency,
        category: selectedCategory
      });
      showToast(`🎉 Added ${nameToAdd} (${selectedProficiency}) to your profile!`, 'success');
      setSelectedSkillName('');
      await refreshData();
    } catch (err) {
      showToast(`Failed to add skill: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id, name) => {
    try {
      await api.skills.delete(id);
      showToast(`Removed ${name} from your profile`, 'info');
      await refreshData();
    } catch (err) {
      showToast(`Failed to delete skill: ${err.message}`, 'error');
    }
  };

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesCategory =
      activeFilterCategory === 'All' ||
      (activeFilterCategory === 'Soft Skills' && (s.category || '').toLowerCase() === 'soft skills') ||
      (activeFilterCategory === 'Technical' && (s.category || '').toLowerCase() !== 'soft skills');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold text-cyan-400 mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Interactive Skill Input Experience</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Skill Manager & Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add skills and update your proficiencies. Changes recalculate your career readiness score in real time.
          </p>
        </div>

        {/* Live readiness badge */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">
              Current Target Fit
            </span>
            <span className="text-lg font-bold text-cyan-300">
              {summary?.targetCareer?.title || 'Cybersecurity Analyst'}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xl">
            {summary?.kpis?.careerReadiness ?? 78}%
          </div>
        </div>
      </div>

      {/* Main Grid: Add Skill Form + Current Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Entry Card */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Add or Update Skill
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Type any skill or click one of the suggested competencies below.
            </p>
          </div>

          <form onSubmit={handleSaveSkill} className="space-y-4">
            {/* Skill Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Skill Name
              </label>
              <input
                type="text"
                value={selectedSkillName}
                onChange={(e) => setSelectedSkillName(e.target.value)}
                placeholder="e.g. SIEM, Python, Docker..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
              />
            </div>

            {/* Suggested Skills Pill Pool (Section 13) */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Suggested Industry Skills
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {SUGGESTED_SKILLS.map((suggested) => {
                  const alreadyHas = skills.some(
                    (s) => s.name.toLowerCase() === suggested.toLowerCase()
                  );
                  const isSelected = selectedSkillName.toLowerCase() === suggested.toLowerCase();

                  return (
                    <button
                      key={suggested}
                      type="button"
                      onClick={() => handleSelectSuggested(suggested)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 scale-105 shadow-md shadow-cyan-500/20'
                          : alreadyHas
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      {alreadyHas ? `✓ ${suggested}` : `+ ${suggested}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Proficiency Selector (Section 13 requirement) */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Proficiency Level
              </span>
              <ProficiencySelector
                value={selectedProficiency}
                onChange={setSelectedProficiency}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="Technical">Technical</option>
                <option value="Security">Security & Infrastructure</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Programming">Programming & Code</option>
                <option value="Soft Skills">Soft Skills & Leadership</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving || !selectedSkillName.trim()}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Add / Update Skill in Profile'}
            </button>
          </form>
        </div>

        {/* Right Column: Existing Skills Inventory */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Search your skills..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {['All', 'Technical', 'Soft Skills'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    activeFilterCategory === cat
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">
                Your Skills ({filteredSkills.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                Click any skill to edit proficiency
              </span>
            </div>

            {filteredSkills.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No skills matched your search filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredSkills.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-slate-700 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {s.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                          {s.proficiency}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {s.category || 'Technical'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedSkillName(s.name);
                          setSelectedProficiency(s.proficiency);
                          if (s.category) setSelectedCategory(s.category);
                        }}
                        title="Edit this skill"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteSkill(s.id, s.name)}
                        title="Delete skill"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
