import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../i18n/config';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { ItemListDemo } from '../components/ItemList_Demo/ItemList_Demo';

function App() {
  return (
    <>
      <PageHeader />
      <div>
        <header>
          <p>Текст писать тут</p>
        </header>
      </div>
      <ItemListDemo />
    </>
  );
}

export default App;
