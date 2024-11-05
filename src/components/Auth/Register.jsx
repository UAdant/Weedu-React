import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Ім'я обов’язкове"),
  email: Yup.string().email('Неправильний формат email').required('Обов’язкове поле'),
  password: Yup.string().min(6, 'Пароль має містити мінімум 6 символів').required('Обов’язкове поле'),
});

export default function Register() {
  const navigate = useNavigate(); 

  const handleRegister = async (values) => {
    try {
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Успішна реєстрація:', data);
      alert('Успішна реєстрація');

      
      navigate('/');
    } catch (error) {
      console.error('Помилка під час реєстрації:', error);
      alert('Помилка під час реєстрації');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Реєстрація</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Ім'я</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Введіть ваше ім'я"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Введіть ваш email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Пароль</label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Введіть ваш пароль"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Зачекайте...' : 'Зареєструватися'}
            </button>
            <div className="text-center mt-4">
              <span>Вже є обліковий запис? </span>
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
  );
}
