import { useState, useEffect } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Перевірка наявності токена в localStorage
    return localStorage.getItem('token') !== null;
  });

  const login = (token) => {
    // Переконайтесь, що токен передається правильно та зберігається
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    // Видаляємо токен та статус входу з localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // Перевірка стану авторизації при монтуванні компонента
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return { isLoggedIn, login, logout };
}
