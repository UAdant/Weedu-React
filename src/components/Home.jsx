import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      logout();
      alert('Ви вийшли з акаунту');
      navigate('/login');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Головна сторінка</h1>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleProfileClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Вийти з акаунту
        </button>
      </div>
    </div>
  );
}
