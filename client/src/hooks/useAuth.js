import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // You can decode token or fetch user data here
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await apiClient.login(credentials);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setUser(data.user || { email: credentials.email });
        return { success: true };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await apiClient.register(userData);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setUser(data.user || { email: userData.email });
        return { success: true };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return {
    isLoggedIn,
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError
  };
}