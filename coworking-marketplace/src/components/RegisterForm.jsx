import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { register } from '../utils/api';

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); // Added name field
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await register(formData); // Send name, email, password to backend
      onRegister(response.token); // Pass token to parent (RegisterPage)
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="card max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <UserPlus className="mr-2" size={24} /> Register
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;