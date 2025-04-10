import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
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
  );
};

export default Header; 