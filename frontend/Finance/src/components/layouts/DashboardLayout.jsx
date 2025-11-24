import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] font-sans">
      {/* Side Menu */}
      <aside
        className={`bg-white text-gray-800 w-64 flex flex-col py-7 px-4 absolute inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 shadow-sm border-r border-gray-100`}
      >
        {/* User Profile */}
        <div className="flex flex-col items-center mb-10 mt-4">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
              alt="Profile"
              className="w-20 h-20 rounded-full shadow-md object-cover border-2 border-white"
            />
          </div>
          <h2 className="text-lg font-bold mt-3 text-gray-800">{user?.name || 'User Name'}</h2>
          <p className="text-sm text-gray-500">Your Money Master</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center py-3 px-6 rounded-xl transition duration-200 ${
              isActive('/dashboard')
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/income"
            className={`flex items-center py-3 px-6 rounded-xl transition duration-200 ${
              isActive('/income')
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-medium">Income</span>
          </Link>

          <Link
            to="/expenses"
            className={`flex items-center py-3 px-6 rounded-xl transition duration-200 ${
              isActive('/expenses')
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <span className="font-medium">Expense</span>
          </Link>

          <Link
            to="/login"
            className="flex items-center py-3 px-6 rounded-xl transition duration-200 text-gray-500 hover:bg-red-50 hover:text-red-600 mt-auto"
            onClick={() => setIsMenuOpen(false)}
          >
             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="font-medium">Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for mobile menu toggle */}
        <header className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm z-20">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Expense Tracker</h1>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F5F7FA] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
