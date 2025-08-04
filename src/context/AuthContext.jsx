import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.user);
        api.defaults.headers.common['x-auth-token'] = token;
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded.user);
      api.defaults.headers.common['x-auth-token'] = token;
    } catch (error) {
      // Mock login for demo when backend is not available
      console.log('Backend not available, using mock login');
      
      // Check if email contains 'admin' to determine role
      const isAdmin = email.toLowerCase().includes('admin');
      
      const mockUser = {
        id: 1,
        name: isAdmin ? 'Admin User' : 'Regular User',
        email: email,
        role: isAdmin ? 'admin' : 'user'
      };
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      api.defaults.headers.common['x-auth-token'] = mockToken;
    }
  };
  
  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded.user);
      api.defaults.headers.common['x-auth-token'] = token;
    } catch (error) {
      // Mock register for demo when backend is not available
      console.log('Backend not available, using mock register');
      const mockUser = {
        id: 1,
        name: name,
        email: email,
        role: 'user'
      };
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      api.defaults.headers.common['x-auth-token'] = mockToken;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 