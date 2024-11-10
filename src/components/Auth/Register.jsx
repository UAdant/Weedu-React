import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { translations } from '../../utils/translations';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Register = () => {
  const { language, handleLanguageChange } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [timer, setTimer] = useState(180); // 3 хвилини в секундах
  const [serverMessage, setServerMessage] = useState('');
  const [apiErrors, setApiErrors] = useState({}); // для збереження помилок від сервера

  useEffect(() => {
    if (!formVisible) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(countdown);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(countdown); // очищення таймера при відключенні
    }
  }, [formVisible]);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t.invalidEmail).required(t.requiredField),
      username: Yup.string().required(t.requiredField),
      password: Yup.string()
        .min(8, t.passwordMinLength)
        .matches(/[0-9]/, t.passwordMustContainNumber)
        .matches(/[\W_]/, t.passwordMustContainSpecialChar) // для спеціальних символів
        .required(t.requiredField),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t.passwordMatch)
        .required(t.requiredField),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setServerError('');
      setServerMessage('');
      setApiErrors({}); // очищаємо попередні помилки

      try {
        const response = await axios.post('http://localhost:8000/auth/register/', {
          email: values.email,
          username: values.username,
          password: values.password,
          confirm_password: values.confirmPassword,
        });

        if (response.status === 200) {
          setFormVisible(false); // ховаємо форму після успішної реєстрації
          setServerMessage(t.registrationSuccessful); // повідомлення від сервера
        }
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 400 && error.response.data.errors) {
          // Якщо сервер повернув помилки (наприклад, "User with this name already exists")
          setApiErrors(error.response.data.errors);
        } else {
          setServerError(t.errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {formVisible ? (
        <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">{t.register}</h2>

          {/* Вибір мови */}
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

          {/* Поле для email */}
          <div className="mb-4">
            <label>{t.email}</label>
            <input
              type="email"
              name="email"
              className="border p-2 w-full"
              placeholder={t.enterEmail}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
            {apiErrors.email && <div className="text-red-500">{apiErrors.email}</div>} {/* Помилка від сервера */}
          </div>

          {/* Поле для username */}
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
            {formik.errors.username && <div className="text-red-500">{formik.errors.username}</div>}
            {apiErrors.username && <div className="text-red-500">{apiErrors.username}</div>} {/* Помилка від сервера */}
          </div>

          {/* Поле для пароля */}
          <div className="mb-4">
            <label>{t.password}</label>
            <input
              type="password"
              name="password"
              className="border p-2 w-full"
              placeholder={t.enterPassword}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
          </div>

          {/* Поле для підтвердження пароля */}
          <div className="mb-6">
            <label>{t.confirmPassword}</label>
            <input
              type="password"
              name="confirmPassword"
              className="border p-2 w-full"
              placeholder={t.enterConfirmPassword}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && <div className="text-red-500">{formik.errors.confirmPassword}</div>}
          </div>

          {/* Виведення помилок від сервера */}
          {serverError && <div className="text-red-500 mb-4">{serverError}</div>}

          <button type="submit" className="bg-green-500 text-white w-full py-2" disabled={loading}>
            {loading ? t.wait : t.register}
          </button>

          <p className="mt-4 text-center">
            {t.alreadyHaveAccount}{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              {t.loginHere}
            </Link>
          </p>
        </form>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">{t.confirmationTitle}</h2>
          <p>{serverMessage}</p>
          <p className="text-sm mt-4">{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}</p>
        </div>
      )}
    </div>
  );
};

export default Register;
