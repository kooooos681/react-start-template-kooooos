import React from 'react';
import './App.css';
import '../i18n/config';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { ItemList } from '../components/ItemList/ItemList';

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
