import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  User,
  GraduationCap,
  School,
  Calendar,
  Award,
  ExternalLink,
  Edit3,
  Briefcase,
  FolderGit2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen
} from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import SkillBadge from '../components/SkillBadge';

export default function ProfilePage() {
  const { user, profile, skills } = useApp();
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        setLoading(true);
        const [projData, certData, internData] = await Promise.all([
          api.projects.getAll().catch(() => []),
          api.certifications.getAll().catch(() => []),
          api.internships.getAll().catch(() => [])
        ]);
        setProjects(projData || []);
        setCertifications(certData || []);
        setInternships(internData || []);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolioData();
  }, []);

  const studentName = profile?.user?.name || user?.name || 'Arya Tia';
  const university = profile?.user?.university || user?.university || 'GSFC University';
  const degree = profile?.user?.degree || user?.degree || 'B.Tech Computer Science';
  const graduationYear = profile?.user?.graduationYear || user?.graduationYear || 2026;
  const cgpa = profile?.cgpa || 8.4;
  const github = profile?.github || 'https://github.com/aryatia';
  const linkedin = profile?.linkedin || 'https://linkedin.com/in/aryatia';

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#0d121f] to-[#07090e] p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden glass-card-glow">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center text-2xl font-extrabold text-white">
                {studentName.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#07090e]" />
            </div>

            {/* Student Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {studentName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  Verified Student
                </span>
              </div>
              <p className="text-sm font-medium text-slate-300">
                Computer Science Student • {degree}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-cyan-400" />
                  {university}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
                  CGPA: <strong className="text-slate-200">{cgpa}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Class of {graduationYear}
                </span>
              </div>
            </div>
          </div>

          {/* Socials & Edit Profile Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-sm"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-sm"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <Link
              to="/profile/edit"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300 leading-relaxed max-w-3xl">
            {profile.bio}
          </div>
        )}
      </div>

      {/* Main Grid: Skills + Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skills Badges (Section 18) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Skills Portfolio ({skills.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Verified proficiencies applied in career readiness calculations
                </p>
              </div>
              <Link
                to="/skills"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Manage →
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((s) => (
                <SkillBadge
                  key={s.id || s.name}
                  name={s.name}
                  proficiency={s.proficiency}
                />
              ))}
            </div>
          </div>

          {/* Academic Achievements & Coursework */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-3">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Academic Achievements & Coursework</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Honours & Competitions
                </span>
                <p className="text-slate-300">
                  {profile?.achievements ||
                    "1st Runner-up at University CyberHack 2025; Dean's Honour List (Semesters 4 & 5); Active member of Cyber Security Student Club."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                  Relevant Coursework
                </span>
                <p className="text-slate-300">
                  {profile?.coursework ||
                    "Network Security, Operating Systems, Computer Networks, Database Management Systems, Data Structures & Algorithms, Cryptography & Network Defense."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Projects, Certifications & Internships (Section 18) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Projects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-violet-400" />
                  Projects ({projects.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Real-world artifacts demonstrating hands-on technical competence
                </p>
              </div>
              <Link
                to="/profile/edit"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300"
              >
                + Add Project
              </Link>
            </div>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">
                      {proj.title}
                    </h4>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies?.split(',').map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-700/60"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Internships */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Certifications */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certifications</span>
              </div>
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                  >
                    <p className="font-bold text-white">{c.name}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{c.organization}</p>
                    <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                      {c.issueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internships */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm border-b border-slate-800 pb-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Internships</span>
              </div>
              <div className="space-y-2">
                {internships.map((i) => (
                  <div
                    key={i.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                  >
                    <p className="font-bold text-white">{i.role}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{i.company}</p>
                    <span className="text-[10px] text-blue-400 font-mono block mt-1">
                      {i.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
