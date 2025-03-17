import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { LogIn } from 'lucide-react';
import { login } from '../utils/api';

const LoginPage = ({ setToken }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      navigate('/'); // Redirect to homepage after successful login
    } catch (error) {
      setError(error.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <LogIn className="mr-2" size={24} /> Login
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;