import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      logout();
      // alert('Ви вийшли з акаунту');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Дашборд</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-500 p-2 rounded block">Головна</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-500 p-2 rounded block">Статистика</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-500 p-2 rounded block">Налаштування</a>
          </li>
          <li className="mb-4">
            <button
              onClick={handleProfileClick}
              className="hover:bg-blue-500 p-2 rounded block w-full text-left"
            >
              Вийти з акаунту
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Ласкаво просимо на головну сторінку</h1>
          <button
            onClick={handleProfileClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Вийти з акаунту
          </button>
        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Картка 1</h3>
            <p className="text-gray-600">Деяка інформація про картку.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Картка 2</h3>
            <p className="text-gray-600">Деяка інформація про картку.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Картка 3</h3>
            <p className="text-gray-600">Деяка інформація про картку.</p>
          </div>
        </div>

        {/* Data section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Дані користувача</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">№</th>
                <th className="px-4 py-2 border-b">Ім'я</th>
                <th className="px-4 py-2 border-b">Дата</th>
                <th className="px-4 py-2 border-b">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">1</td>
                <td className="px-4 py-2 border-b">Іван Іванов</td>
                <td className="px-4 py-2 border-b">2024-11-06</td>
                <td className="px-4 py-2 border-b text-green-500">Активний</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">2</td>
                <td className="px-4 py-2 border-b">Петро Петров</td>
                <td className="px-4 py-2 border-b">2024-11-06</td>
                <td className="px-4 py-2 border-b text-red-500">Неактивний</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
