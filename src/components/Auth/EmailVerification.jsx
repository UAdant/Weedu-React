import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const { token } = useParams(); // Отримуємо токен з URL
  const navigate = useNavigate(); // Для навігації після активації

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Токен відсутній.');
      setLoading(false);
      return;
    }

    const activateEmail = async () => {
      try {
        const csrftoken = getCookie('csrftoken'); // Отримуємо CSRF токен з cookies

        fetch(`http://localhost:8000/auth/verify-email/${token}/`, {
            method: 'POST',
            credentials: 'include',  // включаем передачу куки
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})  // если нужен токен, можно передать его тут
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          setLoading(false);
        } else {
          const data = await response.json();
          setError(data.error || 'Сталася помилка при активації.');
          setLoading(false);
        }
      } catch (err) {
        setError('Сталася помилка при зв\'язку з сервером.');
        setLoading(false);
      }
    };

    activateEmail();
  }, [token]);

  // Функція для отримання CSRF токену з cookies
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleGoHome = () => {
    navigate('/');  // Перехід на головну сторінку після активації
  };

  return (
    <div className="email-verification">
      {loading ? (
        <p>Зачекайте, йде перевірка...</p>
      ) : (
        <div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleGoHome}>Повернутись на головну</button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
