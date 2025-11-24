import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContextFile.jsx';
import { useAuth } from './hooks/useAuth';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/HOme';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import FinanceLanding from './pages/Landing/FinanceLanding';
import { UserProvider } from './context/UserContext.jsx';

import './App.css'; // Assuming you have some global CSS or TailwindCSS setup
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <UserProvider>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
              
            }
          />
          <Route
            path="/income"
            element={
              <PrivateRoute>
                <Income />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <PrivateRoute>
                <Expense />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<FinanceLanding />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all for undefined routes */}
        </Routes>
      </AuthProvider>
    </Router>
    </UserProvider>
  );
}

export default App;
