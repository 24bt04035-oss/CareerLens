import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  ShieldCheck,
  Briefcase,
  CheckCircle,
  Save,
  ArrowRight,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';
import ProficiencySelector from '../components/ProficiencySelector';

export default function ProfileEditPage() {
  const { profile, user, refreshData, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [saving, setSaving] = useState(false);

  // Form states
  const [personalForm, setPersonalForm] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    department: '',
    graduationYear: 2026,
    linkedin: '',
    github: '',
    bio: ''
  });

  const [academicForm, setAcademicForm] = useState({
    cgpa: 8.4,
    semester: 7,
    achievements: '',
    coursework: ''
  });

  // Dynamic entities
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', technologies: '', description: '', link: '', role: '' });
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState({ name: '', organization: '', issueDate: '', domain: '', credentialUrl: '' });
  const [internships, setInternships] = useState([]);
  const [newIntern, setNewIntern] = useState({ company: '', role: '', duration: '', description: '', technologies: '' });

  useEffect(() => {
    if (profile) {
      setPersonalForm({
        name: profile.user?.name || user?.name || '',
        email: profile.user?.email || user?.email || '',
        phone: profile.phone || '',
        university: profile.user?.university || user?.university || '',
        degree: profile.user?.degree || user?.degree || '',
        department: profile.department || '',
        graduationYear: profile.user?.graduationYear || user?.graduationYear || 2026,
        linkedin: profile.linkedin || '',
        github: profile.github || '',
        bio: profile.bio || ''
      });

      setAcademicForm({
        cgpa: profile.cgpa || 8.4,
        semester: profile.semester || 7,
        achievements: profile.achievements || '',
        coursework: profile.coursework || ''
      });
    }

    async function loadPortfolio() {
      const [p, c, i] = await Promise.all([
        api.projects.getAll().catch(() => []),
        api.certifications.getAll().catch(() => []),
        api.internships.getAll().catch(() => [])
      ]);
      setProjects(p || []);
      setCertifications(c || []);
      setInternships(i || []);
    }
    loadPortfolio();
  }, [profile, user]);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await api.profile.update({
        ...personalForm,
        ...academicForm
      });
      showToast('Profile updated successfully!', 'success');
      await refreshData();
    } catch (err) {
      showToast(`Save error: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      const added = await api.projects.add(newProject);
      setProjects([...projects, added]);
      setNewProject({ title: '', technologies: '', description: '', link: '', role: '' });
      showToast('Project added!', 'success');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.projects.delete(id);
      setProjects(projects.filter(p => p.id !== id));
      showToast('Project removed', 'info');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!newCert.name) return;
    try {
      const added = await api.certifications.add(newCert);
      setCertifications([...certifications, added]);
      setNewCert({ name: '', organization: '', issueDate: '', domain: '', credentialUrl: '' });
      showToast('Certification added!', 'success');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCert = async (id) => {
    try {
      await api.certifications.delete(id);
      setCertifications(certifications.filter(c => c.id !== id));
      showToast('Certification removed', 'info');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleAddInternship = async (e) => {
    e.preventDefault();
    if (!newIntern.company) return;
    try {
      const added = await api.internships.add(newIntern);
      setInternships([...internships, added]);
      setNewIntern({ company: '', role: '', duration: '', description: '', technologies: '' });
      showToast('Internship added!', 'success');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteInternship = async (id) => {
    try {
      await api.internships.delete(id);
      setInternships(internships.filter(i => i.id !== id));
      showToast('Internship removed', 'info');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const tabs = [
    { id: 'personal', name: 'Personal Details', icon: User },
    { id: 'academic', name: 'Academic Records', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderGit2 },
    { id: 'certifications', name: 'Certifications', icon: ShieldCheck },
    { id: 'internships', name: 'Internships', icon: Briefcase }
  ];

  const completionPercent = profile?.completionPercentage ?? 85;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Completion Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Profile Builder & Stepper
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Edit Student Profile
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize your credentials to maximize your verified hiring and readiness scores.
          </p>
        </div>

        {/* Profile Completion Indicator (Section 12) */}
        <div className="w-full md:w-64 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Profile Completion</span>
            <span className="text-cyan-400 font-mono">{completionPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
        {/* Tab 1: Personal Details */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalForm.name}
                  onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">University</label>
                <input
                  type="text"
                  value={personalForm.university}
                  onChange={(e) => setPersonalForm({ ...personalForm, university: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Degree</label>
                <input
                  type="text"
                  value={personalForm.degree}
                  onChange={(e) => setPersonalForm({ ...personalForm, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  value={personalForm.department}
                  onChange={(e) => setPersonalForm({ ...personalForm, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Graduation Year</label>
                <input
                  type="number"
                  value={personalForm.graduationYear}
                  onChange={(e) => setPersonalForm({ ...personalForm, graduationYear: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={personalForm.linkedin}
                  onChange={(e) => setPersonalForm({ ...personalForm, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={personalForm.github}
                  onChange={(e) => setPersonalForm({ ...personalForm, github: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-xs">Professional Bio</label>
              <textarea
                rows={3}
                value={personalForm.bio}
                onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Academic Details */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Cumulative GPA (CGPA)</label>
                <input
                  type="number"
                  step="0.01"
                  value={academicForm.cgpa}
                  onChange={(e) => setAcademicForm({ ...academicForm, cgpa: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Current Semester</label>
                <input
                  type="number"
                  value={academicForm.semester}
                  onChange={(e) => setAcademicForm({ ...academicForm, semester: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="text-xs space-y-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Academic Achievements</label>
                <textarea
                  rows={2}
                  value={academicForm.achievements}
                  onChange={(e) => setAcademicForm({ ...academicForm, achievements: e.target.value })}
                  placeholder="e.g. Dean's Honour List, Hackathon awards, research grants..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Relevant Coursework</label>
                <textarea
                  rows={2}
                  value={academicForm.coursework}
                  onChange={(e) => setAcademicForm({ ...academicForm, coursework: e.target.value })}
                  placeholder="e.g. Network Security, Operating Systems, Cryptography..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Projects Portfolio
            </h3>

            {/* List */}
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-xs">{p.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.description}</p>
                    <span className="text-[10px] text-cyan-400 font-mono mt-1 block">{p.technologies}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleAddProject} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3 text-xs">
              <h5 className="font-bold text-cyan-300">Add New Project</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies (e.g. React, Node.js)"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  required
                />
              </div>
              <textarea
                placeholder="Brief description of architecture and outcomes..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                rows={2}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-xs">{c.name}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.organization} • {c.issueDate}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCert(c.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCert} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3 text-xs">
              <h5 className="font-bold text-cyan-300">Add Certification</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={newCert.organization}
                  onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Certification
              </button>
            </form>
          </div>
        )}

        {/* Tab 5: Internships */}
        {activeTab === 'internships' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Internships & Work Experience
            </h3>
            <div className="space-y-3">
              {internships.map((i) => (
                <div key={i.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-xs">{i.role} at {i.company}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{i.duration}</p>
                    <p className="text-xs text-slate-300 mt-1">{i.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteInternship(i.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddInternship} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3 text-xs">
              <h5 className="font-bold text-cyan-300">Add Internship Record</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={newIntern.company}
                  onChange={(e) => setNewIntern({ ...newIntern, company: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newIntern.role}
                  onChange={(e) => setNewIntern({ ...newIntern, role: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Duration (e.g. 3 Months, Summer 2025)"
                value={newIntern.duration}
                onChange={(e) => setNewIntern({ ...newIntern, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
              />
              <textarea
                placeholder="Responsibilities & outcomes..."
                value={newIntern.description}
                onChange={(e) => setNewIntern({ ...newIntern, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                rows={2}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Internship
              </button>
            </form>
          </div>
        )}

        {/* Global Save Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => navigate('/profile')}
            className="text-xs text-slate-400 hover:text-white"
          >
            ← Back to Profile View
          </button>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
