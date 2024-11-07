import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/hooks/useAuth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import ResetPassword from './components/Auth/ResetPassword'; 
import ResetPasswordConfirm from './components/Auth/ResetPasswordConfirm';
import EmailVerification from './components/Auth/EmailVerification'

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/auth/reset-password-confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
