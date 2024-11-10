import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { translations } from '../../utils/translations';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaGlobe } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';

const Login = () => {
  const { login, isLoggedIn } = useAuth();
  const { language, handleLanguageChange } = useLanguage();
  const t = translations[language];  // Використовуємо поточний переклад
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Перенаправлення на домашню сторінку, якщо користувач увійшов
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Ініціалізація форми
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t.requiredField),
      password: Yup.string()
        .required(t.requiredField)
        .min(8, t.passwordMinLength) // Перевірка на мінімальну довжину
        .matches(/[0-9]/, t.passwordNumLength) // Перевірка на наявність хоча б однієї цифри
        .matches(/[!@#$%^&*(),.?":{}|<>]/, t.passwordCharrLength), // Перевірка на наявність хоча б одного спеціального символу
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(''); // Очищаємо попередні помилки
      setPasswordError(''); // Очищаємо помилки пароля
      try {
        // Відправка даних на сервер для авторизації
        const response = await axios.post('http://localhost:8000/auth/login/', values);
    
        if (response.status === 200 && response.data.access_token) {
          // Збереження токена та виклик функції login
          login(response.data.access_token);
        } else {
          setError(t.invalidCredentials);
        }
      } catch (err) {
        // Виведення помилки залежно від мови
        if (err.response && err.response.data.errors) {
          if (err.response.data.errors.username) {
            setError(t.userNotFound); // Перевірка на відсутність користувача
          } else if (err.response.data.errors.password) {
            // Якщо помилка пароля, встановлюємо відповідне повідомлення
            setPasswordError(t.errorsPassword); // Виводимо помилку пароля
          }
        } else {
          setError(t.serverError);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // Очищення помилки пароля, коли користувач вводить нове значення
  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    setPasswordError(''); // Очищення помилки при введенні пароля
  };

  // Оновлення мови та перерисовка компонентів
  useEffect(() => {
    // Оновлення помилок при зміні мови
    setError('');
    setPasswordError('');
  }, [language]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">{t.login}</h2>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleLanguageChange}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaGlobe size={20} className="mr-2" />
            {language === 'ua' ? 'UA' : 'EN'}
          </button>
        </div>

        <div className="mb-4">
          <label>{t.username}</label>
          <input
            type="text"
            name="username"
            className="border p-2 w-full"
            placeholder={t.enterUsername}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username && (
            <div className="text-red-500">{formik.errors.username}</div>
          )}
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
        </div>

        <div className="mb-6">
          <div className='flex justify-between'>
          <div><label>{t.password}</label></div>
          <div>
          <Link to="/reset-password" className="text-blue-500 underline">
            Забув пароль?
          </Link>
          </div>
          </div>
          <input
            type="password"
            name="password"
            className="border p-2 w-full"
            placeholder={t.enterPassword}
            onChange={handlePasswordChange} // Оновлення функції onChange
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
          
          {/* Виведення помилки пароля, якщо є */}
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        </div>

        <button type="submit" className="bg-blue-500 text-white w-full py-2" disabled={loading}>
          {loading ? t.wait : t.login}
        </button>

        <div className="mt-4 text-center">
          <span>{t.noAccount}</span>{' '}
          <Link to="/register" className="text-blue-500 underline">
            {t.registerHere}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
