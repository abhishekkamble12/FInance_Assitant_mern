import React, { createContext, useState } from 'react';

import api from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    console.log('Auth Check:', { storedToken: !!storedToken, storedUser });

    if (storedToken && storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
        console.log('Auth Restored Successfully');
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      console.log('Auth Check Failed: Missing or invalid token/user');
      // Clean up invalid data silently
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/register', { name, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
