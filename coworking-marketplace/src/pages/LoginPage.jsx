import React from 'react';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <LogIn className="mr-2" /> Login
        </h1>
        <p>Login form coming soon...</p>
      </div>
    </div>
  );
};

export default LoginPage;