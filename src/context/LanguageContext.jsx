import React, { createContext, useContext, useState } from 'react';

// Створюємо контекст для мови
const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ua');

  const handleLanguageChange = () => {
    setLanguage((prev) => (prev === 'ua' ? 'en' : 'ua'));
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};
