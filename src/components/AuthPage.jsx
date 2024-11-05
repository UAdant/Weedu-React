import React, { useState } from 'react';
import Login from './Auth/Login';
import Register from './Auth/Register';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? 'Авторизація' : 'Реєстрація'}
        </h2>
        {isLogin ? <Login /> : <Register />}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Немає облікового запису? Зареєструватися' : 'Вже маєте обліковий запис? Увійти'}
          </button>
        </div>
      </div>
    </div>
  );
}