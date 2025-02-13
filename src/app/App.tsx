import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { ThemeProvider } from '../components/ThemeProvider/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <PageHeader></PageHeader>
      <div>
        <header>
          <p>Текст писать тут</p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
