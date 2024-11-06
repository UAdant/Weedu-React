import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Стан для помилки
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    if (!values.password) {
      console.error('Пароль не може бути порожнім');
      return; // Не відправляти запит, якщо пароль порожній
    }

    const requestBody = {
      uibd64: uid, // Використовується uid з URL
      token: token, // Токен отримується з URL
      new_password: values.password, // Новий пароль
    };

    console.log('Запит на скидання пароля:', requestBody);  // Логування даних перед відправкою

    try {
      const response = await fetch(`http://localhost:8000/auth/reset-password-confirm/${uid}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Помилка скидання пароля:', errorData);

        // Перевірка на помилку токена
        if (errorData.server && errorData.server[0] === 'Неправильний чи прострочений токен.') {
          setIsValid(false); // Невірний або прострочений токен
          setErrorMessage('Неправильний чи прострочений токен'); // Виведення помилки
        } else {
          setErrorMessage('Помилка при скиданні пароля'); // Генеричне повідомлення про помилку
        }
      } else {
        alert('Пароль успішно змінено!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Помилка скидання пароля:', error);
      alert('Помилка скидання пароля');
      setErrorMessage('Сталася помилка при скиданні пароля');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Встановіть новий пароль</h2>
        <Formik
          initialValues={{ password: '' }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .min(8, 'Пароль повинен містити не менше 8 символів')
              .matches(/[A-Za-z0-9]/, 'Пароль повинен містити хоча б одну літеру або цифру')
              .matches(/[^A-Za-z0-9]/, 'Пароль повинен містити хоча б один спеціальний символ')
              .required('Пароль обов\'язковий'),
          })}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <label className="block text-gray-700">Новий пароль</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 pl-8 focus:outline-none border border-gray-300 rounded"
                  placeholder="Введіть новий пароль"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />

                {!isValid && (
                  <div className="text-red-500 mt-1 text-sm">{errorMessage}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Зачекайте...' : 'Встановити новий пароль'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
