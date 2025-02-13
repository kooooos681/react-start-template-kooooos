import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import './pageheader.css';

export const PageHeader = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className="header">
        <button className="customButton" onClick={toggleTheme}>
          {theme === 'light' ? 'dark' : 'light'}
        </button>
      </div>
    </>
  );
};
