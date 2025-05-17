import React from 'react';
import '../styles/HomePage.css';
import logo from './banner.svg';

const HomePage: React.FC = () => {
  return (
    <div className="cart-container">
      <h1 className="home-title">Добро пожаловать в Магазин</h1>
      <div className="home-content">
        <p className="home-description">Лучшие продукты по лучшим ценам. Выбирайте, заказывайте и наслаждайтесь!</p>
        <img src={logo} alt="Магазин" className="banner" />
      </div>
    </div>
  );
};

export default HomePage;
