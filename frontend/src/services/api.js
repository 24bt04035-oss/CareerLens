const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('careerlens_token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // If session expired or unauthorized, propagate error for context to handle
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.error || errorData.message || `HTTP error ${response.status}`);
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
    register: (data) => request('/auth/register', { method: 'POST', body: data }),
    getMe: () => request('/auth/me')
  },

  // Admin Management (RBAC Restricted: Admin Role Only)
  admin: {
    getUsers: () => request('/admin/users'),
    createUser: (data) => request('/admin/users', { method: 'POST', body: data }),
    updateUserStatus: (id, status) => request(`/admin/users/${id}/status`, { method: 'PUT', body: { status } }),
    getAuditLogs: () => request('/admin/audit-logs'),
    getStats: () => request('/admin/stats')
  },

  // Profile
  profile: {
    get: () => request('/profile'),
    update: (data) => request('/profile', { method: 'PUT', body: data }),
    setTargetCareer: (targetCareerSlug) => request('/profile/target-career', { method: 'POST', body: { targetCareerSlug } })
  },

  // Skills
  skills: {
    getAll: () => request('/skills'),
    add: (skill) => request('/skills', { method: 'POST', body: skill }),
    update: (id, skill) => request(`/skills/${id}`, { method: 'PUT', body: skill }),
    delete: (id) => request(`/skills/${id}`, { method: 'DELETE' })
  },

  // Careers
  careers: {
    getAll: () => request('/careers'),
    getById: (id) => request(`/careers/${id}`),
    getAnalysis: (id) => request(`/careers/${id}/analysis`)
  },

  // Analysis
  analysis: {
    getCurrent: () => request('/analysis'),
    getSummary: () => request('/analysis/summary'),
    getBestFit: () => request('/analysis/best-fit')
  },

  // Recommendations
  recommendations: {
    get: () => request('/recommendations')
  },

  // Projects
  projects: {
    getAll: () => request('/projects'),
    add: (project) => request('/projects', { method: 'POST', body: project }),
    delete: (id) => request(`/projects/${id}`, { method: 'DELETE' })
  },

  // Certifications
  certifications: {
    getAll: () => request('/certifications'),
    add: (cert) => request('/certifications', { method: 'POST', body: cert }),
    delete: (id) => request(`/certifications/${id}`, { method: 'DELETE' })
  },

  // Internships
  internships: {
    getAll: () => request('/internships'),
    add: (intern) => request('/internships', { method: 'POST', body: intern }),
    delete: (id) => request(`/internships/${id}`, { method: 'DELETE' })
  },

  // System
  system: {
    resetDemo: () => request('/reset-demo', { method: 'POST' }),
    health: () => request('/health')
  }
};
