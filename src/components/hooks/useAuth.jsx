import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Ініціалізація стану при завантаженні сторінки
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/'); // Перенаправлення на головну сторінку, якщо користувач увійшов
    }
  }, [navigate]);

  // Функція для входу
  const login = (token) => {
    localStorage.setItem('access_token', token);
    setIsLoggedIn(true);
    navigate('/'); // Перенаправлення на головну сторінку після успішного входу
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/login'); // Перенаправлення на сторінку логіну після виходу
  };

  return { isLoggedIn, login, logout };
};
