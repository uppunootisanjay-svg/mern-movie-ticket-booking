import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('cinepass_token');
      if (token) {
        try {
          const profile = await apiClient('/auth/profile', { token });
          setUser({ ...profile, token });
        } catch (err) {
          console.error('Failed to load profile:', err);
          localStorage.removeItem('cinepass_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    localStorage.setItem('cinepass_token', data.token);
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await apiClient('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });
    localStorage.setItem('cinepass_token', data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('cinepass_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
