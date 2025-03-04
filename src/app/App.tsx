import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../i18n/config';
import { PageHeader } from '../components/PageHeader/PageHeader';

function App() {
  return (
    <>
      <PageHeader />
      <div>
        <header>
          <p>Текст писать тут</p>
        </header>
      </div>
    </>
  );
}

export default App;
