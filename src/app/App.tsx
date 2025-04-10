import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import ProfilePage from '../pages/ProfilePage';
import ProductsPage from '../pages/ProductsPage';
import BasketPage from '../pages/BasketPage';
import HomePage from '../pages/HomePage';
import ModalPage from '../pages/ModalPage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/modal/:id" element={<ModalPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
