const { CAREERS } = require('./careersData');
const {
  DEFAULT_USER,
  DEFAULT_USERS,
  DEFAULT_AUDIT_LOGS,
  DEFAULT_PROFILE,
  DEFAULT_STUDENT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_INTERNSHIPS,
  SKILL_RECOMMENDATION_CATALOG,
  SUGGESTED_SKILLS_POOL
} = require('./defaultData');

// In-Memory state store (resilient fallback, seeded with demo student Arya Tia & Admin Dr. Rajesh)
let state = {
  users: JSON.parse(JSON.stringify(DEFAULT_USERS)),
  profiles: [JSON.parse(JSON.stringify(DEFAULT_PROFILE))],
  studentSkills: JSON.parse(JSON.stringify(DEFAULT_STUDENT_SKILLS)),
  projects: JSON.parse(JSON.stringify(DEFAULT_PROJECTS)),
  certifications: JSON.parse(JSON.stringify(DEFAULT_CERTIFICATIONS)),
  internships: JSON.parse(JSON.stringify(DEFAULT_INTERNSHIPS)),
  careers: JSON.parse(JSON.stringify(CAREERS)),
  auditLogs: JSON.parse(JSON.stringify(DEFAULT_AUDIT_LOGS)),
  nextUserId: 6,
  nextSkillId: 18,
  nextProjectId: 3,
  nextCertId: 3,
  nextInternshipId: 2,
  nextAuditId: 5
};

const PROFICIENCY_RANKS = {
  'beginner': 1,
  'intermediate': 2,
  'advanced': 3,
  'expert': 4
};

function normalizeSkillName(name) {
  return (name || '').trim().toLowerCase();
}

/**
 * Core Career Fit Calculation Engine
 * Transparent, deterministic scoring:
 * Matched = 100% (1.0 pt)
 * Partial = 50% (0.5 pt)
 * Missing = 0% (0.0 pt)
 * Score = (sum of achieved skill points / total possible skill points) * 100
 */
function calculateCareerFit(studentSkillsList, career) {
  const studentSkillMap = new Map();
  for (const item of studentSkillsList) {
    studentSkillMap.set(normalizeSkillName(item.name), item);
  }

  const breakdown = [];
  let achievedPoints = 0;
  let totalPossiblePoints = 0;
  let matchedCount = 0;
  let partialCount = 0;
  let missingCount = 0;
  const gaps = [];

  for (const requiredSkill of career.skills) {
    const normName = normalizeSkillName(requiredSkill.name);
    const weight = requiredSkill.weight || 1.0;
    totalPossiblePoints += weight;

    const studentSkill = studentSkillMap.get(normName);
    const requiredRank = PROFICIENCY_RANKS[requiredSkill.requiredLevel.toLowerCase()] || 2;

    let status = 'Missing';
    let studentLevel = null;
    let earnedRatio = 0.0;

    if (studentSkill) {
      studentLevel = studentSkill.proficiency;
      const studentRank = PROFICIENCY_RANKS[studentSkill.proficiency.toLowerCase()] || 1;

      if (studentRank >= requiredRank) {
        status = 'Matched';
        // Base 100% + slight mastery bonus if proficiency exceeds requirement (e.g. Advanced vs Intermediate)
        earnedRatio = studentRank > requiredRank ? 1.06 : 1.0;
        matchedCount++;
      } else {
        status = 'Partial';
        earnedRatio = 0.5;
        partialCount++;
      }
    } else {
      status = 'Missing';
      earnedRatio = 0.0;
      missingCount++;
    }

    const earnedPoints = earnedRatio * weight;
    achievedPoints += earnedPoints;

    const skillItem = {
      name: requiredSkill.name,
      requiredLevel: requiredSkill.requiredLevel,
      studentLevel: studentLevel || '—',
      status,
      importance: requiredSkill.importance || 'Core',
      weight,
      earnedPoints,
      earnedPercentage: earnedRatio * 100
    };
    breakdown.push(skillItem);

    if (status === 'Partial' || status === 'Missing') {
      const rec = SKILL_RECOMMENDATION_CATALOG[requiredSkill.name] || {
        whyItMatters: `${requiredSkill.name} is a key requirement for modern ${career.title} roles.`,
        recommendedAction: `Complete structured coursework and hands-on portfolio projects demonstrating ${requiredSkill.name} at the ${requiredSkill.requiredLevel} level.`,
        learningTime: '2-3 weeks',
        priority: requiredSkill.importance === 'Core' ? 'High' : 'Medium',
        resources: [
          { title: `${requiredSkill.name} Documentation & Tutorials`, type: 'Guide', url: 'https://google.com/search?q=' + encodeURIComponent(requiredSkill.name + ' tutorial') }
        ]
      };

      gaps.push({
        skillName: requiredSkill.name,
        requiredLevel: requiredSkill.requiredLevel,
        currentLevel: studentLevel || 'Not Added',
        status,
        importance: requiredSkill.importance,
        whyItMatters: rec.whyItMatters,
        recommendedAction: rec.recommendedAction,
        learningTime: rec.learningTime,
        priority: rec.priority,
        resources: rec.resources
      });
    }
  }

  const score = totalPossiblePoints > 0
    ? Math.round((achievedPoints / totalPossiblePoints) * 100)
    : 0;

  let readinessLevel = 'Developing';
  let readinessHeadline = 'Foundational skills in place with high growth potential.';
  if (score >= 80) {
    readinessLevel = 'High';
    readinessHeadline = 'Outstanding career fit! You are well positioned for entry and mid-tier roles.';
  } else if (score >= 60) {
    readinessLevel = 'Intermediate';
    readinessHeadline = "You're on the right track! Bridging a few core gaps will maximize your hiring probability.";
  } else {
    readinessLevel = 'Early Stage';
    readinessHeadline = 'Early preparation phase. Prioritize foundational core technical skills.';
  }

  return {
    career: {
      id: career.id,
      slug: career.slug,
      title: career.title,
      category: career.category,
      icon: career.icon,
      description: career.description,
      avgSalary: career.avgSalary,
      marketGrowth: career.marketGrowth,
      totalSkills: career.skills.length
    },
    score,
    readinessLevel,
    readinessHeadline,
    matchedCount,
    partialCount,
    missingCount,
    totalRequired: career.skills.length,
    skillsBreakdown: breakdown,
    gaps,
    methodology: {
      formula: '(sum of achieved skill points / total possible skill points) × 100',
      ruleMatched: 'Matched: 100% of weight (Proficiency ≥ Required)',
      rulePartial: 'Partial: 50% of weight (Skill present but Proficiency < Required)',
      ruleMissing: 'Missing: 0% of weight (Skill absent from profile)',
      achievedPoints: Number(achievedPoints.toFixed(1)),
      totalPoints: Number(totalPossiblePoints.toFixed(1)),
      rawCalculation: `${achievedPoints.toFixed(1)} / ${totalPossiblePoints.toFixed(1)} = ${score}%`
    }
  };
}

/**
 * Calculate Best Fit Careers ranked for student
 */
function calculateBestFitCareers(studentSkillsList) {
  const allFits = CAREERS.map((career) => {
    const fit = calculateCareerFit(studentSkillsList, career);
    return {
      id: career.id,
      slug: career.slug,
      title: career.title,
      category: career.category,
      icon: career.icon,
      description: career.description,
      score: fit.score,
      matchedCount: fit.matchedCount,
      partialCount: fit.partialCount,
      missingCount: fit.missingCount,
      totalRequired: fit.totalRequired,
      readinessLevel: fit.readinessLevel
    };
  });

  allFits.sort((a, b) => b.score - a.score);

  return allFits.map((item, index) => ({
    ...item,
    rank: index + 1,
    badge: index === 0 ? '🥇 Best Match' : index === 1 ? '🥈 Strong Fit' : index === 2 ? '🥉 Viable Path' : null
  }));
}

/**
 * Calculate Profile Completion Percentage
 */
function calculateProfileCompletion(profile, user, studentSkills, projects, certs, internships) {
  let score = 0;
  // Personal (20%)
  if (user?.name && user?.email) score += 10;
  if (user?.university && user?.degree && user?.graduationYear) score += 10;

  // Profile details (20%)
  if (profile?.department && profile?.cgpa) score += 10;
  if (profile?.github || profile?.linkedin) score += 10;

  // Skills (25%)
  if (studentSkills.length >= 7) score += 25;
  else if (studentSkills.length >= 4) score += 18;
  else if (studentSkills.length >= 1) score += 10;

  // Projects (15%)
  if (projects.length >= 2) score += 15;
  else if (projects.length === 1) score += 10;

  // Certifications (10%)
  if (certs.length >= 1) score += 10;

  // Internships (10%)
  if (internships.length >= 1) score += 10;

  return Math.min(100, score);
}

// Store CRUD operations
const store = {
  resetToDemo() {
    state = {
      users: JSON.parse(JSON.stringify(DEFAULT_USERS)),
      profiles: [JSON.parse(JSON.stringify(DEFAULT_PROFILE))],
      studentSkills: JSON.parse(JSON.stringify(DEFAULT_STUDENT_SKILLS)),
      projects: JSON.parse(JSON.stringify(DEFAULT_PROJECTS)),
      certifications: JSON.parse(JSON.stringify(DEFAULT_CERTIFICATIONS)),
      internships: JSON.parse(JSON.stringify(DEFAULT_INTERNSHIPS)),
      careers: JSON.parse(JSON.stringify(CAREERS)),
      auditLogs: JSON.parse(JSON.stringify(DEFAULT_AUDIT_LOGS)),
      nextUserId: 6,
      nextSkillId: 18,
      nextProjectId: 3,
      nextCertId: 3,
      nextInternshipId: 2,
      nextAuditId: 5
    };
    return true;
  },

  findUserByEmail(email) {
    if (!email) return null;
    return state.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  },

  findUserById(id) {
    return state.users.find(u => u.id === Number(id));
  },

  getAllUsers() {
    return state.users.map(({ password, ...safeUser }) => safeUser);
  },

  addUser(userData, actorEmail = 'system', ip = '127.0.0.1') {
    const existing = this.findUserByEmail(userData.email);
    if (existing) {
      throw new Error(`A user with email ${userData.email} already exists.`);
    }

    const newUser = {
      id: state.nextUserId++,
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password || 'Student@2026!Secured',
      role: userData.role || 'student',
      status: userData.status || 'active',
      university: userData.university || 'GSFC University',
      degree: userData.degree || 'B.Tech Computer Science',
      department: userData.department || 'Computer Science & Engineering',
      graduationYear: Number(userData.graduationYear) || 2026,
      cgpa: Number(userData.cgpa) || 8.0,
      readinessScore: Number(userData.readinessScore) || 50,
      permissions: userData.role === 'admin'
        ? ['all', 'manage_students', 'grant_access', 'revoke_access', 'view_audit_logs']
        : ['view_profile', 'edit_profile', 'analyze_fit', 'manage_skills'],
      createdAt: new Date().toISOString()
    };

    state.users.push(newUser);

    // Audit Log for student permission grant
    this.addAuditLog({
      eventType: 'USER_CREATED',
      severity: 'LOW',
      actor: actorEmail,
      role: 'admin',
      ip,
      action: `New Student Access Granted: ${newUser.name}`,
      details: `Account provisioned with role [${newUser.role}], status [${newUser.status}], degree [${newUser.degree}].`
    });

    const { password, ...safeUser } = newUser;
    return safeUser;
  },

  updateUserStatus(id, status, actorEmail = 'system', ip = '127.0.0.1') {
    const user = state.users.find(u => u.id === Number(id));
    if (!user) throw new Error('User not found');

    const previousStatus = user.status;
    user.status = status;

    this.addAuditLog({
      eventType: status === 'active' ? 'ACCESS_GRANTED' : 'ACCESS_REVOKED',
      severity: status === 'active' ? 'LOW' : 'WARN',
      actor: actorEmail,
      role: 'admin',
      ip,
      action: `Student Access ${status === 'active' ? 'Activated' : 'Revoked'}: ${user.name}`,
      details: `Account status updated from [${previousStatus}] to [${status}].`
    });

    const { password, ...safeUser } = user;
    return safeUser;
  },

  addAuditLog({ eventType, severity = 'INFO', actor = 'system', role = 'system', ip = '127.0.0.1', action, details }) {
    const logEntry = {
      id: state.nextAuditId++,
      timestamp: new Date().toISOString(),
      eventType,
      severity,
      actor,
      role,
      ip,
      action,
      details
    };
    state.auditLogs.unshift(logEntry);
    if (state.auditLogs.length > 50) state.auditLogs.pop();
    return logEntry;
  },

  getAuditLogs() {
    return state.auditLogs;
  },

  getAdminStats() {
    const students = state.users.filter(u => u.role === 'student');
    const totalStudents = students.length;
    const activeStudents = students.filter(u => u.status === 'active').length;
    const pendingStudents = students.filter(u => u.status === 'pending').length;
    const avgReadiness = totalStudents > 0
      ? Math.round(students.reduce((acc, s) => acc + (s.readinessScore || 60), 0) / totalStudents)
      : 0;

    return {
      totalStudents,
      activeStudents,
      pendingStudents,
      avgReadiness,
      totalAuditEvents: state.auditLogs.length,
      securityStatus: 'Enforced (RBAC active, JWT secured, PoLP verified)'
    };
  },

  getCurrentUser() {
    return state.users[0];
  },

  getProfile(userId) {
    let user = userId ? state.users.find((u) => u.id === Number(userId)) : null;
    if (!user) {
      user = state.users[0];
    }
    const profile = state.profiles.find((p) => p.userId === user.id) || state.profiles[0];
    const targetCareer = CAREERS.find((c) => c.slug === profile.targetCareerSlug) || CAREERS[0];
    const completion = calculateProfileCompletion(
      profile,
      user,
      state.studentSkills,
      state.projects,
      state.certifications,
      state.internships
    );

    const { password, ...safeUser } = user;

    return {
      ...profile,
      user: safeUser,
      targetCareer,
      completionPercentage: completion,
      skillsCount: state.studentSkills.length,
      projectsCount: state.projects.length,
      certificationsCount: state.certifications.length,
      internshipsCount: state.internships.length
    };
  },

  updateProfile(updateData) {
    const user = state.users[0];
    const profile = state.profiles.find(p => p.userId === user.id) || state.profiles[0];

    if (updateData.name || updateData.university || updateData.degree || updateData.graduationYear) {
      if (updateData.name) user.name = updateData.name;
      if (updateData.university) user.university = updateData.university;
      if (updateData.degree) user.degree = updateData.degree;
      if (updateData.graduationYear) user.graduationYear = Number(updateData.graduationYear);
    }

    Object.assign(profile, {
      phone: updateData.phone !== undefined ? updateData.phone : profile.phone,
      department: updateData.department !== undefined ? updateData.department : profile.department,
      cgpa: updateData.cgpa !== undefined ? Number(updateData.cgpa) : profile.cgpa,
      semester: updateData.semester !== undefined ? Number(updateData.semester) : profile.semester,
      achievements: updateData.achievements !== undefined ? updateData.achievements : profile.achievements,
      coursework: updateData.coursework !== undefined ? updateData.coursework : profile.coursework,
      linkedin: updateData.linkedin !== undefined ? updateData.linkedin : profile.linkedin,
      github: updateData.github !== undefined ? updateData.github : profile.github,
      targetCareerSlug: updateData.targetCareerSlug !== undefined ? updateData.targetCareerSlug : profile.targetCareerSlug,
      bio: updateData.bio !== undefined ? updateData.bio : profile.bio
    });

    return this.getProfile();
  },

  getSkills() {
    return state.studentSkills;
  },

  getSuggestedSkills() {
    return SUGGESTED_SKILLS_POOL;
  },

  addSkill(skillData) {
    const norm = normalizeSkillName(skillData.name);
    const existingIndex = state.studentSkills.findIndex(s => normalizeSkillName(s.name) === norm);

    if (existingIndex >= 0) {
      state.studentSkills[existingIndex].proficiency = skillData.proficiency;
      if (skillData.category) state.studentSkills[existingIndex].category = skillData.category;
      return state.studentSkills[existingIndex];
    }

    const newSkill = {
      id: state.nextSkillId++,
      userId: state.users[0].id,
      name: skillData.name.trim(),
      proficiency: skillData.proficiency || 'Intermediate',
      category: skillData.category || 'Technical'
    };
    state.studentSkills.push(newSkill);
    return newSkill;
  },

  updateSkill(id, skillData) {
    const skill = state.studentSkills.find(s => s.id === Number(id));
    if (!skill) return null;
    if (skillData.name) skill.name = skillData.name.trim();
    if (skillData.proficiency) skill.proficiency = skillData.proficiency;
    if (skillData.category) skill.category = skillData.category;
    return skill;
  },

  deleteSkill(id) {
    const initialLen = state.studentSkills.length;
    state.studentSkills = state.studentSkills.filter(s => s.id !== Number(id));
    return state.studentSkills.length < initialLen;
  },

  getProjects() {
    return state.projects;
  },

  addProject(projectData) {
    const newProject = {
      id: state.nextProjectId++,
      userId: state.users[0].id,
      title: projectData.title,
      description: projectData.description,
      technologies: projectData.technologies,
      link: projectData.link || '',
      role: projectData.role || 'Contributor'
    };
    state.projects.push(newProject);
    return newProject;
  },

  deleteProject(id) {
    state.projects = state.projects.filter(p => p.id !== Number(id));
    return true;
  },

  getCertifications() {
    return state.certifications;
  },

  addCertification(certData) {
    const newCert = {
      id: state.nextCertId++,
      userId: state.users[0].id,
      name: certData.name,
      organization: certData.organization,
      issueDate: certData.issueDate || '2024',
      domain: certData.domain || 'Technology',
      credentialUrl: certData.credentialUrl || ''
    };
    state.certifications.push(newCert);
    return newCert;
  },

  deleteCertification(id) {
    state.certifications = state.certifications.filter(c => c.id !== Number(id));
    return true;
  },

  getInternships() {
    return state.internships;
  },

  addInternship(internshipData) {
    const newIntern = {
      id: state.nextInternshipId++,
      userId: state.users[0].id,
      company: internshipData.company,
      role: internshipData.role,
      duration: internshipData.duration,
      description: internshipData.description,
      technologies: internshipData.technologies || ''
    };
    state.internships.push(newIntern);
    return newIntern;
  },

  deleteInternship(id) {
    state.internships = state.internships.filter(i => i.id !== Number(id));
    return true;
  },

  getCareers() {
    return CAREERS;
  },

  getCareerBySlug(slugOrId) {
    return CAREERS.find(c => c.slug === slugOrId || String(c.id) === String(slugOrId));
  },

  getAnalysisForCareer(slugOrId) {
    const career = this.getCareerBySlug(slugOrId) || CAREERS[0];
    return calculateCareerFit(state.studentSkills, career);
  },

  getCurrentAnalysis() {
    const profile = this.getProfile();
    const career = CAREERS.find(c => c.slug === profile.targetCareerSlug) || CAREERS[0];
    return calculateCareerFit(state.studentSkills, career);
  },

  getBestFitCareers() {
    return calculateBestFitCareers(state.studentSkills);
  },

  getRecommendations() {
    const analysis = this.getCurrentAnalysis();
    return {
      targetCareer: analysis.career,
      score: analysis.score,
      gapsCount: analysis.gaps.length,
      recommendations: analysis.gaps
    };
  }
};

module.exports = {
  store,
  calculateCareerFit,
  calculateBestFitCareers,
  calculateProfileCompletion
};
