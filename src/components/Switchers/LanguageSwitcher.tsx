import React from 'react';
import { useLanguage } from '../LanguageProvider/LanguageProvider';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div>
        <label>{t('langSwitcherCaption')}</label>
    <button className="customButton" onClick={toggleLanguage}>
            {t('langSwitcherText')}
        </button>
    </div>
  );
};
