import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../i18n/config';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { ThemeProvider } from '../components/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../components/LanguageProvider/LanguageProvider';

function App() {

  return (
    <ThemeProvider>
      <LanguageProvider>
      <PageHeader></PageHeader>
      <div>
        <header>
          <p>Текст писать тут</p>
        </header>
      </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
