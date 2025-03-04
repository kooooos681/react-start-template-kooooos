import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <label>{t('themeSwitcherCaption')}</label>
      <button className="customButton" onClick={toggleTheme}>
        {theme === 'light' ? t('themeLight') : t('themeDark')}
      </button>
    </div>
  );
};
