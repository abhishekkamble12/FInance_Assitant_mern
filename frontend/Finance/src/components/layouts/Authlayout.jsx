import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      
      <div className="bg-white p-8 rounded-4xl shadow-md w-full max-w-md border-4 ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
