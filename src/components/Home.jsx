import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Перехід на сторінку логіну після виходу
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
      <p className="text-lg mb-8">You are logged in!</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-200"
      >
        Log Out
      </button>
    </div>
  );
}
