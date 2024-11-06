import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Іконки для полів

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Обов’язкове поле'),
  password: Yup.string().min(8, 'Пароль має містити мінімум 8 символів').required('Обов’язкове поле'),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Стан для видимості пароля

  const handleLogin = async (values, { setFieldError }) => {
    try {
      const response = await fetch('http://localhost:8000/auth/login/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Помилка під час входу:', errorData);

        // Якщо помилка у username, відображаємо її під полем
        if (errorData.errors.username) {
          setFieldError('username', errorData.errors.username);
        }

        // Якщо помилка у password, відображаємо її під полем
        if (errorData.errors.password) {
          setFieldError('password', errorData.errors.password);
        }
      } else {
        const data = await response.json();
        const token = data.access_token;
        localStorage.setItem('token', token); 
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/'); // Перенаправлення на головну сторінку
      }
    } catch (error) {
      console.error('Помилка під час входу:', error);
      alert('Помилка під час входу');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Авторизація</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <label className="block text-gray-700">Ім'я користувача</label>
                <div className="flex items-center border border-gray-300 rounded focus:ring focus:ring-blue-200">
                  <AiOutlineUser className="text-gray-600 ml-3" size={20} />
                  <Field
                    type="text"
                    name="username"
                    className="w-full p-2 pl-8 focus:outline-none"
                    placeholder="Введіть ваше ім'я користувача"
                  />
                </div>
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="relative">
                <div className='flex justify-between'>
                <label className="block text-gray-700">Пароль</label>
                <button
                  onClick={() => navigate('/reset-password')}
                  className="text-blue-500 hover:underline"
                >
                  Забув пароль?
                </button>
                </div>
                <div className="flex items-center border border-gray-300 rounded focus:ring focus:ring-blue-200">
                  <AiOutlineLock className="text-gray-600 ml-3" size={20} />
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full p-2 pl-8 focus:outline-none"
                    placeholder="Введіть ваш пароль"
                  />
                  <button
                    type="button"
                    className="absolute right-3 mt-1 transform"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-600" size={20} />
                    ) : (
                      <AiOutlineEye className="text-gray-600" size={20} />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Зачекайте...' : 'Увійти'}
              </button>
              <div className="text-center mt-4">
                <span>Немає облікового запису? </span>
                <button
                  onClick={() => navigate('/register')}
                  className="text-blue-500 hover:underline"
                >
                  Зареєструйтеся
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
