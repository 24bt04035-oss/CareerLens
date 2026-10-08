import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('careerlens_token') || null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [theme, setThemeState] = useState(() => localStorage.getItem('careerlens_theme') || 'light');

  const setTheme = useCallback((newTheme) => {
    const validTheme = newTheme === 'dark' ? 'dark' : 'light';
    setThemeState(validTheme);
    localStorage.setItem('careerlens_theme', validTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light', 'theme-dark', 'theme-light');
      document.documentElement.classList.add(validTheme, `theme-${validTheme}`);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light', 'theme-dark', 'theme-light');
      document.documentElement.classList.add(theme, `theme-${theme}`);
    }
  }, [theme]);

  // Toast notifier
  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Refresh profile, skills, and summary
  const refreshData = useCallback(async () => {
    if (!localStorage.getItem('careerlens_token')) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [profileData, skillsData, summaryData] = await Promise.all([
        api.profile.get().catch(() => null),
        api.skills.getAll().catch(() => ({ skills: [] })),
        api.analysis.getSummary().catch(() => null)
      ]);

      if (profileData) {
        setProfile(profileData);
        if (profileData.user) {
          setUser((prev) => {
            if (!prev) return profileData.user;
            if (prev.id === profileData.user.id) {
              return { ...prev, ...profileData.user };
            }
            return prev;
          });
        }
      }

      if (skillsData?.skills) {
        setSkills(skillsData.skills);
      }

      if (summaryData) {
        setSummary(summaryData);
      }
    } catch (err) {
      console.error('Error loading app state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify active session token on boot
  const initAuth = useCallback(async () => {
    const savedToken = localStorage.getItem('careerlens_token');
    if (!savedToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.auth.getMe();
      if (res.user) {
        setUser(res.user);
        setToken(savedToken);
        await refreshData();
      } else {
        throw new Error('Invalid token');
      }
    } catch (err) {
      console.warn('Session verification failed, logging out:', err.message);
      localStorage.removeItem('careerlens_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Switch target career
  const switchTargetCareer = async (slug) => {
    try {
      await api.profile.setTargetCareer(slug);
      showToast(`Target career updated! Calculating readiness...`, 'success');
      await refreshData();
      return true;
    } catch (err) {
      showToast(`Failed to update target career: ${err.message}`, 'error');
      return false;
    }
  };

  // Reset demo state
  const resetDemoData = async () => {
    try {
      await api.system.resetDemo();
      showToast('✨ Demo data reset to Arya Tia baseline!', 'success');
      await refreshData();
    } catch (err) {
      showToast(`Reset error: ${err.message}`, 'error');
    }
  };

  // Login handler with JWT token storage
  const login = async (email, password) => {
    try {
      const res = await api.auth.login({ email, password });
      if (res.token && res.user) {
        localStorage.setItem('careerlens_token', res.token);
        setToken(res.token);
        setUser(res.user);
        showToast(`🔒 Authentication Successful! Welcome, ${res.user.name} (${res.user.role.toUpperCase()})`, 'success');
        await refreshData();
        return { success: true, user: res.user };
      }
      throw new Error('Invalid login response');
    } catch (err) {
      showToast(`Authentication Error: ${err.message}`, 'error');
      return { success: false, error: err.message };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('careerlens_token');
    setToken(null);
    setUser(null);
    setProfile(null);
    setSkills([]);
    setSummary(null);
    showToast('Signed out securely. Cryptographic session terminated.', 'info');
  };

  const value = {
    token,
    user,
    setUser,
    profile,
    skills,
    summary,
    loading,
    toasts,
    theme,
    setTheme,
    toggleTheme,
    showToast,
    removeToast,
    refreshData,
    switchTargetCareer,
    resetDemoData,
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
