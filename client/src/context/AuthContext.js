import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import api from '../config/api';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwt_decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };

  // Load user data if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token && !isTokenExpired(token)) {
        try {
          const res = await api.get('/api/auth/me');
          setCurrentUser(res.data);
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
          setToken(null);
          setCurrentUser(null);
        }
      } else if (token && isTokenExpired(token)) {
        // Clear expired token
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData);
      const { token, user } = res.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await api.post('/api/auth/login', userData);
      const { token, user } = res.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        isTeacher: currentUser?.role === 'teacher' || currentUser?.role === 'admin',
        isStudent: currentUser?.role === 'student'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
