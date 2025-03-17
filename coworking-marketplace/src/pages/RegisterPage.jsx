import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = ({ setToken }) => {
  const navigate = useNavigate();

  const handleRegister = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/'); // Redirect to homepage after registration
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;