import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/auth/verify-email/${token}/`, {
          method: 'POST',
        });

        const data = await response.json();

        // Check if response contains expected fields
        if (response.ok && data.message) {
          setMessage(data.message);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError('Невідома помилка при підтвердженні.');
        }
      } catch (err) {
        setError('Помилка при підтвердженні.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        {message ? (
          <div className="text-center">
            <AiOutlineCheckCircle className="text-green-500 mx-auto mb-4" size={50} />
            <p className="text-gray-700 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Перейти до входу
            </button>
          </div>
        ) : (
          <div className="text-center">
            <AiOutlineCloseCircle className="text-red-500 mx-auto mb-4" size={50} />
            <p className="text-gray-700 mb-6">{error || 'Зачекайте, ми перевіряємо вашу електронну пошту...'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
