'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  return {
    theme,
    setTheme,
    isDark,
    toggleTheme,
  };
} 