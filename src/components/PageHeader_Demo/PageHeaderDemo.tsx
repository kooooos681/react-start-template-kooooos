import React from 'react';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../LanguageProvider/LanguageProvider';
import { PageHeader } from '../PageHeader/PageHeader';
import { useTranslation } from 'react-i18next';

export const PageHeaderDemo = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <PageHeader></PageHeader>
        <p>{t('demoCaption')}</p>
      </LanguageProvider>
    </ThemeProvider>
  );
};
