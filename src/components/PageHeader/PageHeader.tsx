import React from 'react';
import './pageheader.css';
import { LanguageSwitcher } from '../Switchers/LanguageSwitcher';
import { ThemeSwitcher } from '../Switchers/ThemeSwitcher';

export const PageHeader = () => {
  return (
    <>
      <div className="header">
        <ThemeSwitcher></ThemeSwitcher>
        <LanguageSwitcher></LanguageSwitcher>
      </div>
    </>
  );
};
