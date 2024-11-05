import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Неправильний формат email').required('Обов’язкове поле'),
  password: Yup.string().min(6, 'Пароль має містити мінімум 6 символів').required('Обов’язкове поле'),
});

export default function Login() {
  const navigate = useNavigate(); 
  const handleLogin = async (values) => {
    try {
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Успішний вхід:', data);
      alert('Успішний вхід');

      
      navigate('/');
    } catch (error) {
      console.error('Помилка під час входу:', error);
      alert('Помилка під час входу');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Авторизація</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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
  );
}
