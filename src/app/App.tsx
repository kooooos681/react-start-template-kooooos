import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import ProductsPage from '../pages/ProductsPage';
import BasketPage from '../pages/BasketPage';
import HomePage from '../pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <header className="header">
        <h1 className="logo">Магазин</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Главная
          </Link>
          <Link to="/profile" className="nav-link">
            Профиль
          </Link>
          <Link to="/products" className="nav-link">
            Товары
          </Link>
          <Link to="/basket" className="nav-link">
            Корзина
          </Link>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
