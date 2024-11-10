import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/hooks/useAuth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import ResetPassword from './components/Auth/ResetPassword';
import ResetPasswordConfirm from './components/Auth/ResetPasswordConfirm';
import EmailVerification from './components/Auth/EmailVerification';
import { LanguageProvider } from './context/LanguageContext';

// Компонент для захисту приватних маршрутів
const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" />;
  return element;
};



function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password_reset_confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />

          {/* Захищений маршрут */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />

          {/* Перенаправлення на домашню сторінку, якщо маршрут не знайдено */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
