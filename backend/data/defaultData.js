const { CAREERS } = require('./careersData');

const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Arya Tia',
    email: 'arya.tia@gsfc.ac.in',
    password: 'password123',
    role: 'student',
    status: 'active',
    university: 'GSFC University',
    degree: 'B.Tech Computer Science',
    department: 'Computer Science & Engineering',
    graduationYear: 2026,
    cgpa: 8.4,
    readinessScore: 75,
    permissions: ['view_profile', 'edit_profile', 'analyze_fit', 'manage_skills'],
    createdAt: '2026-09-01T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Dr. Rajesh Sharma (Dean of Careers)',
    email: 'admin@careerlens.io',
    password: 'Admin@2026!Secured',
    role: 'admin',
    status: 'active',
    university: 'GSFC University',
    degree: 'Faculty & Administration',
    department: 'Academic Careers & Placements',
    graduationYear: 2012,
    cgpa: 9.8,
    readinessScore: 98,
    permissions: ['all', 'manage_students', 'grant_access', 'revoke_access', 'view_audit_logs', 'security_telemetry'],
    createdAt: '2026-08-15T08:30:00.000Z'
  },
  {
    id: 3,
    name: 'Kavya Patel',
    email: 'kavya.p@gsfc.ac.in',
    password: 'password123',
    role: 'student',
    status: 'active',
    university: 'GSFC University',
    degree: 'B.Tech Information Technology',
    department: 'IT & Cloud Systems',
    graduationYear: 2026,
    cgpa: 7.9,
    readinessScore: 68,
    permissions: ['view_profile', 'edit_profile', 'analyze_fit', 'manage_skills'],
    createdAt: '2026-09-05T11:15:00.000Z'
  },
  {
    id: 4,
    name: 'Rohan Verma',
    email: 'rohan.v@gsfc.ac.in',
    password: 'password123',
    role: 'student',
    status: 'pending',
    university: 'GSFC University',
    degree: 'B.Tech Computer Science',
    department: 'Computer Science & Engineering',
    graduationYear: 2027,
    cgpa: 7.2,
    readinessScore: 42,
    permissions: ['view_profile'],
    createdAt: '2026-10-02T14:20:00.000Z'
  },
  {
    id: 5,
    name: 'Ananya Iyer',
    email: 'ananya.i@gsfc.ac.in',
    password: 'password123',
    role: 'student',
    status: 'active',
    university: 'GSFC University',
    degree: 'B.Sc Data Science & AI',
    department: 'Mathematical & Computational Sciences',
    graduationYear: 2025,
    cgpa: 9.1,
    readinessScore: 84,
    permissions: ['view_profile', 'edit_profile', 'analyze_fit', 'manage_skills'],
    createdAt: '2026-08-20T09:45:00.000Z'
  }
];

const DEFAULT_USER = DEFAULT_USERS[0];

const DEFAULT_AUDIT_LOGS = [
  {
    id: 1,
    timestamp: '2026-10-08T09:12:30.000Z',
    eventType: 'AUTH_SUCCESS',
    severity: 'INFO',
    actor: 'admin@careerlens.io',
    role: 'admin',
    ip: '192.168.1.104',
    action: 'Administrator Session Initialized',
    details: 'MFA verified and administrative token issued.'
  },
  {
    id: 2,
    timestamp: '2026-10-08T09:15:10.000Z',
    eventType: 'RBAC_VERIFICATION',
    severity: 'INFO',
    actor: 'arya.tia@gsfc.ac.in',
    role: 'student',
    ip: '192.168.1.155',
    action: 'Role-Based Access Verified',
    details: 'PoLP (Principle of Least Privilege) enforced: Student scope granted.'
  },
  {
    id: 3,
    timestamp: '2026-10-08T09:18:42.000Z',
    eventType: 'PERMISSION_GRANTED',
    severity: 'LOW',
    actor: 'admin@careerlens.io',
    role: 'admin',
    ip: '192.168.1.104',
    action: 'Student Access Activated',
    details: 'Granted verified candidate access permission to Kavya Patel (B.Tech IT).'
  },
  {
    id: 4,
    timestamp: '2026-10-08T09:22:15.000Z',
    eventType: 'SECURITY_ALERT',
    severity: 'MEDIUM',
    actor: 'anonymous_probe',
    role: 'unauthenticated',
    ip: '45.33.32.156',
    action: 'Restricted Endpoint Intercepted',
    details: 'Direct request to /api/admin/users blocked: Missing Bearer Token (HTTP 401).'
  }
];

const DEFAULT_PROFILE = {
  id: 1,
  userId: 1,
  phone: '+91 98765 43210',
  department: 'Computer Science & Engineering',
  cgpa: 8.4,
  semester: 7,
  achievements: '1st Runner-up at University CyberHack 2025; Dean\'s Honour List (Semesters 4 & 5); Active member of Cyber Security Student Club.',
  coursework: 'Network Security, Operating Systems, Computer Networks, Database Management Systems, Data Structures & Algorithms, Cryptography & Network Defense.',
  linkedin: 'https://linkedin.com/in/aryatia',
  github: 'https://github.com/aryatia',
  targetCareerSlug: 'cybersecurity-analyst',
  bio: 'Aspiring Cybersecurity Analyst specializing in threat detection, Linux system defense, and network traffic security. Passionate about automated incident response and cloud infrastructure resilience.'
};

const DEFAULT_STUDENT_SKILLS = [
  { id: 1, userId: 1, name: 'Python', proficiency: 'Intermediate', category: 'Programming' },
  { id: 2, userId: 1, name: 'Linux', proficiency: 'Advanced', category: 'Infrastructure' },
  { id: 3, userId: 1, name: 'Networking', proficiency: 'Intermediate', category: 'Infrastructure' },
  { id: 4, userId: 1, name: 'Git', proficiency: 'Intermediate', category: 'Tools' },
  { id: 5, userId: 1, name: 'Cybersecurity Fundamentals', proficiency: 'Intermediate', category: 'Security' },
  { id: 6, userId: 1, name: 'Firewalls & IDS', proficiency: 'Intermediate', category: 'Security' },
  { id: 7, userId: 1, name: 'Vulnerability Assessment', proficiency: 'Intermediate', category: 'Security' },
  { id: 8, userId: 1, name: 'Web Application Security', proficiency: 'Intermediate', category: 'Security' },
  { id: 9, userId: 1, name: 'Access Control & IAM', proficiency: 'Intermediate', category: 'Security' },
  { id: 10, userId: 1, name: 'Operating Systems Security', proficiency: 'Intermediate', category: 'Security' },
  { id: 11, userId: 1, name: 'SQL', proficiency: 'Beginner', category: 'Database' },
  { id: 12, userId: 1, name: 'Cryptography', proficiency: 'Beginner', category: 'Security' },
  { id: 13, userId: 1, name: 'Incident Response', proficiency: 'Beginner', category: 'Security' },
  { id: 14, userId: 1, name: 'Threat Analysis', proficiency: 'Beginner', category: 'Security' },
  { id: 15, userId: 1, name: 'Communication', proficiency: 'Advanced', category: 'Soft Skills' },
  { id: 16, userId: 1, name: 'Problem Solving', proficiency: 'Advanced', category: 'Soft Skills' },
  { id: 17, userId: 1, name: 'Teamwork', proficiency: 'Intermediate', category: 'Soft Skills' }
];

const DEFAULT_PROJECTS = [
  {
    id: 1,
    userId: 1,
    title: 'Mini SOC Dashboard',
    technologies: 'React, Node.js, JavaScript, Express',
    description: 'Built a lightweight Security Operations Center dashboard monitoring simulated network traffic anomalies, brute-force login attempts, and authentication log intrusions.',
    link: 'https://github.com/aryatia/mini-soc-dashboard',
    role: 'Lead Developer & Architect'
  },
  {
    id: 2,
    userId: 1,
    title: 'Network Security Analyzer',
    technologies: 'Python, Networking, Scapy, Wireshark',
    description: 'Developed an automated packet inspection script capturing SYN flood signatures, port scanning patterns, and generating telemetry reports with mitigation tips.',
    link: 'https://github.com/aryatia/network-security-analyzer',
    role: 'Security Researcher'
  }
];

const DEFAULT_CERTIFICATIONS = [
  {
    id: 1,
    userId: 1,
    name: 'AWS Academy Cloud Foundations',
    organization: 'Amazon Web Services (AWS)',
    issueDate: 'August 2024',
    domain: 'Cloud Infrastructure',
    credentialUrl: 'https://aws.amazon.com/verification/AWSCF-89412'
  },
  {
    id: 2,
    userId: 1,
    name: 'Introduction to Cybersecurity',
    organization: 'Cisco Networking Academy',
    issueDate: 'January 2024',
    domain: 'Cybersecurity',
    credentialUrl: 'https://www.credly.com/org/cisco/badge/intro-to-cyber'
  }
];

const DEFAULT_INTERNSHIPS = [
  {
    id: 1,
    userId: 1,
    company: 'TechCorp Innovations / CyberDefense Labs',
    role: 'Security Engineering Intern',
    duration: '3 Months (Jun 2025 - Aug 2025)',
    description: 'Assisted senior SOC analysts in triaging false positive alerts, validating vulnerability scans with Nessus, and scripting threat intelligence feeds using Python.',
    technologies: 'Linux, Python, Bash, SIEM, Wireshark'
  }
];

const SKILL_RECOMMENDATION_CATALOG = {
  'SIEM': {
    whyItMatters: 'SIEM (Security Information & Event Management) is the nerve center of modern Security Operations Centers (SOCs) for real-time aggregation and correlation of security alerts.',
    recommendedAction: 'Learn SIEM fundamentals, set up Splunk Free or Elastic Security locally, ingest Linux authentication logs, and practice analyzing security incident alerts.',
    learningTime: '2-3 weeks',
    priority: 'High',
    resources: [
      { title: 'Elastic Security SIEM Quickstart', type: 'Lab', url: 'https://www.elastic.co/training' },
      { title: 'Splunk Fundamentals & Log Ingestion', type: 'Course', url: 'https://www.splunk.com' }
    ]
  },
  'Incident Response': {
    whyItMatters: 'When critical breaches occur, structured containment, eradication, and post-mortem reporting determine organizational resilience and recovery time.',
    recommendedAction: 'Study the NIST SP 800-61 Incident Handling Guide; practice investigating compromised endpoints and memory dumps on TryHackMe or CyberDefenders.',
    learningTime: '3 weeks',
    priority: 'High',
    resources: [
      { title: 'NIST Computer Security Incident Handling Guide', type: 'Documentation', url: 'https://csrc.nist.gov' },
      { title: 'TryHackMe Incident Response Practice Rooms', type: 'Interactive Lab', url: 'https://tryhackme.com' }
    ]
  },
  'Threat Analysis': {
    whyItMatters: 'Adversary tracking and threat intelligence allow security teams to proactively anticipate attack vectors rather than reacting after compromise.',
    recommendedAction: 'Master the MITRE ATT&CK framework and threat intelligence feeds (AlienVault OTX, MISP). Build automated scripts to monitor threat actors.',
    learningTime: '2 weeks',
    priority: 'Medium',
    resources: [
      { title: 'MITRE ATT&CK Navigator & Matrix', type: 'Framework', url: 'https://attack.mitre.org' },
      { title: 'SANS Cyber Threat Intelligence Fundamentals', type: 'Guide', url: 'https://www.sans.org' }
    ]
  },
  'Cryptography': {
    whyItMatters: 'Cryptography safeguards data at rest and in transit through encryption, digital signatures, hashing algorithms, and PKI infrastructure.',
    recommendedAction: 'Advance beyond fundamentals: implement AES-GCM and RSA key exchanges, practice SSL/TLS certificate inspection, and understand modern hash security.',
    learningTime: '2 weeks',
    priority: 'Medium',
    resources: [
      { title: 'Cryptopals Crypto Challenges', type: 'Practice', url: 'https://cryptopals.com' },
      { title: 'Khan Academy Cryptography Theory', type: 'Course', url: 'https://www.khanacademy.org' }
    ]
  },
  'SQL': {
    whyItMatters: 'Databases hold high-value targets; querying relational structures and defending against SQL Injection (SQLi) are mandatory analyst competencies.',
    recommendedAction: 'Practice writing complex multi-table JOINs, subqueries, and window functions; test database forensics and query security on PortSwigger Web Academy.',
    learningTime: '1-2 weeks',
    priority: 'Medium',
    resources: [
      { title: 'PortSwigger Web Security Academy: SQL Injection', type: 'Hands-on Labs', url: 'https://portswigger.net' },
      { title: 'Mode Analytics Advanced SQL Tutorial', type: 'Tutorial', url: 'https://mode.com/sql-tutorial' }
    ]
  },
  'Power BI': {
    whyItMatters: 'Translates raw tabular data into intuitive executive dashboards and KPI visual monitors.',
    recommendedAction: 'Build a Power BI dashboard using a public dataset (e.g. cybersecurity incident logs or financial KPIs) with interactive filters and DAX measures.',
    learningTime: '1-2 weeks',
    priority: 'Medium',
    resources: [
      { title: 'Microsoft Power BI Official Learning Path', type: 'Course', url: 'https://learn.microsoft.com' }
    ]
  },
  'Machine Learning': {
    whyItMatters: 'Predictive algorithms unlock classification, regression, pattern discovery, and behavioral anomaly detection.',
    recommendedAction: 'Build a beginner ML classification project using Scikit-Learn in Python on a clean dataset (e.g., Titanic or Network Intrusion detection).',
    learningTime: '3-4 weeks',
    priority: 'High',
    resources: [
      { title: 'Scikit-Learn Machine Learning Tutorials', type: 'Code Labs', url: 'https://scikit-learn.org' }
    ]
  },
  'Git': {
    whyItMatters: 'Collaborative code versioning, branch management, and automated pull request workflows are standard across industry teams.',
    recommendedAction: 'Create a GitHub repository, practice feature branching, resolving merge conflicts, and set up a basic GitHub Actions workflow.',
    learningTime: '3-5 days',
    priority: 'Medium',
    resources: [
      { title: 'Learn Git Branching (Visual Interactive)', type: 'Simulator', url: 'https://learngitbranching.js.org' }
    ]
  },
  'Figma': {
    whyItMatters: 'Modern industry standard for prototyping wireframes, creating design systems, and conducting developer handoffs.',
    recommendedAction: 'Create a mobile app wireframe and interactive prototype in Figma using auto-layout, components, and design variables.',
    learningTime: '1-2 weeks',
    priority: 'Medium',
    resources: [
      { title: 'Figma 101 Video Tutorials', type: 'Official Guides', url: 'https://help.figma.com' }
    ]
  },
  'Docker': {
    whyItMatters: 'Containerization guarantees environment parity across development, testing, and production servers.',
    recommendedAction: 'Containerize a Node.js or Python backend with a multi-stage Dockerfile and run it locally with docker-compose.',
    learningTime: '1 week',
    priority: 'Medium',
    resources: [
      { title: 'Docker Getting Started Guide', type: 'Documentation', url: 'https://docs.docker.com' }
    ]
  },
  'AWS/Azure': {
    whyItMatters: 'Cloud services host modern scalable web apps, data lakes, and enterprise infrastructure.',
    recommendedAction: 'Deploy a serverless API using AWS Lambda or an EC2 instance with security groups, VPC peering, and IAM roles.',
    learningTime: '2-3 weeks',
    priority: 'High',
    resources: [
      { title: 'AWS Skill Builder Free Tier', type: 'Course', url: 'https://skillbuilder.aws' }
    ]
  }
};

const SUGGESTED_SKILLS_POOL = [
  'Python', 'Java', 'JavaScript', 'React', 'SQL', 'Excel',
  'Power BI', 'Linux', 'Networking', 'AWS', 'Docker',
  'Machine Learning', 'Figma', 'Git', 'Communication', 'Leadership',
  'Cybersecurity Fundamentals', 'SIEM', 'Incident Response', 'Cryptography',
  'Threat Analysis', 'Statistics', 'Pandas', 'NumPy', 'Data Structures',
  'Algorithms', 'Product Strategy', 'Agile/Scrum', 'Deep Learning', 'Kubernetes'
];

module.exports = {
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
};
