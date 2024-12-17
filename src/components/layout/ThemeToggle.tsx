import React from 'react';
import { Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ThemeToggle = () => {
  const { theme, setTheme } = useStore();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Check system preference on mount
  React.useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        theme === 'dark'
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
    >
      <Moon className="w-5 h-5" />
    </button>
  );
};