'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function ThemeWrapper() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const body = document.body;
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(darkMode ? 'dark-mode' : 'light-mode');
  }, [darkMode]);

  return null;
}
