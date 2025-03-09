import React from 'react';
import './App.css';
import '../i18n/config';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { ItemListDemoButton } from 'src/components/ItemListContainer/ItemList_Demo_Button';

function App() {
  return (
    <>
      <PageHeader />
      <div>
        <header>
          <p>Текст писать тут</p>
        </header>
      </div>
      <ItemListDemoButton />
    </>
  );
}

export default App;
