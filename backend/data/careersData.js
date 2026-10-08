const CAREERS = [
  {
    id: 1,
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security & Infrastructure',
    icon: 'ShieldAlert',
    description: 'Protect systems, networks, and sensitive data from cyber threats, unauthorized access, and vulnerabilities.',
    avgSalary: '$98,000 - $135,000',
    marketGrowth: '+32% (Much faster than avg)',
    skills: [
      { name: 'Networking', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Linux', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Cybersecurity Fundamentals', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Python', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Git', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Firewalls & IDS', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Vulnerability Assessment', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Web Application Security', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Access Control & IAM', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Operating Systems Security', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Cryptography', requiredLevel: 'Intermediate', importance: 'Specialized', weight: 1.0 },
      { name: 'Incident Response', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Threat Analysis', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'SQL', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 },
      { name: 'SIEM', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Security Forensics', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 }
    ]
  },
  {
    id: 2,
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    icon: 'BarChart3',
    description: 'Turn complex data into actionable business intelligence through statistical querying, modeling, and dashboards.',
    avgSalary: '$75,000 - $105,000',
    marketGrowth: '+23% (Fast growth)',
    skills: [
      { name: 'Excel', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'SQL', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Python', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 },
      { name: 'Statistics', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Power BI', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Data Visualization', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 }
    ]
  },
  {
    id: 3,
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    icon: 'BrainCircuit',
    description: 'Build predictive statistical models and machine learning pipelines to extract deep insights from massive datasets.',
    avgSalary: '$115,000 - $160,000',
    marketGrowth: '+36% (Much faster than avg)',
    skills: [
      { name: 'Python', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Statistics', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Machine Learning', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'SQL', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Pandas', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 },
      { name: 'NumPy', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 },
      { name: 'Data Visualization', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 }
    ]
  },
  {
    id: 4,
    slug: 'software-developer',
    title: 'Software Developer',
    category: 'Engineering & Development',
    icon: 'Code2',
    description: 'Architect, engineer, and deploy robust web services, desktop applications, and scalable backend platforms.',
    avgSalary: '$90,000 - $140,000',
    marketGrowth: '+25% (High demand)',
    skills: [
      { name: 'Programming', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Data Structures', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Algorithms', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Git', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Database', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'OOP', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Problem Solving', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 }
    ]
  },
  {
    id: 5,
    slug: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    category: 'Artificial Intelligence',
    icon: 'Sparkles',
    description: 'Design and deploy state-of-the-art machine learning and deep learning neural architectures into production.',
    avgSalary: '$125,000 - $175,000',
    marketGrowth: '+40% (Explosive growth)',
    skills: [
      { name: 'Python', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Machine Learning', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Deep Learning', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Statistics', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'SQL', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 },
      { name: 'TensorFlow/PyTorch', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Git', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 }
    ]
  },
  {
    id: 6,
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & Product',
    icon: 'Palette',
    description: 'Craft intuitive, accessible, and delightful digital user interfaces, design systems, and product experiences.',
    avgSalary: '$80,000 - $120,000',
    marketGrowth: '+16% (Steady demand)',
    skills: [
      { name: 'Figma', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'UI Design', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'UX Research', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Prototyping', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Wireframing', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Design Thinking', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 }
    ]
  },
  {
    id: 7,
    slug: 'product-manager',
    title: 'Product Manager',
    category: 'Product & Leadership',
    icon: 'Layers',
    description: 'Define product vision, align cross-functional teams, orchestrate agile sprints, and drive product-market fit.',
    avgSalary: '$105,000 - $155,000',
    marketGrowth: '+20% (High demand)',
    skills: [
      { name: 'Product Strategy', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Communication', requiredLevel: 'Advanced', importance: 'Core', weight: 1.0 },
      { name: 'Market Research', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Agile/Scrum', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Analytics', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Leadership', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 }
    ]
  },
  {
    id: 8,
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Security & Infrastructure',
    icon: 'Cloud',
    description: 'Deploy, automate, monitor, and scale modern distributed cloud architectures and microservices.',
    avgSalary: '$100,000 - $145,000',
    marketGrowth: '+28% (Very high demand)',
    skills: [
      { name: 'AWS/Azure', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Linux', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Networking', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Docker', requiredLevel: 'Intermediate', importance: 'Core', weight: 1.0 },
      { name: 'Kubernetes', requiredLevel: 'Beginner', importance: 'Secondary', weight: 1.0 },
      { name: 'Python', requiredLevel: 'Intermediate', importance: 'Secondary', weight: 1.0 },
      { name: 'Cloud Security', requiredLevel: 'Beginner', importance: 'Core', weight: 1.0 }
    ]
  }
];

module.exports = { CAREERS };
