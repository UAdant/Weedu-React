import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Невірний формат email').required('Обов’язкове поле'),
});

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    try {
      const response = await fetch('http://localhost:8000/auth/reset-password/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Помилка під час відновлення пароля:', errorData);
      } else {
        alert('Посилання для відновлення пароля надіслано на вашу пошту.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Помилка під час відновлення пароля:', error);
      alert('Помилка під час відновлення пароля');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Відновлення пароля</h2>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <label className="block text-gray-700">Електронна пошта</label>
                <div className="flex items-center border border-gray-300 rounded focus:ring focus:ring-blue-200">
                  <FaEnvelope className="absolute left-3 text-gray-500" />
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 pl-10 focus:outline-none"
                    placeholder="Введіть вашу електронну пошту"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Зачекайте...' : 'Відправити посилання для відновлення'}
              </button>
              <div className="text-center mt-4">
                <span>Пам'ятаєте пароль? </span>
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-500 hover:underline"
                >
                  Увійти
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
