// src/context/ThemeContext.jsx - Theme Provider
import React, { useState, useEffect, createContext, useContext } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'dark';
    } catch (error) {
      console.error("Failed to read theme from localStorage, defaulting to light.", error);
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      // Set data-theme attribute on html element for CSS to target
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}