import React from 'react';
import '../styles/HomePage.css';
import logo from './banner.svg';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Добро пожаловать в Магазин</h1>
      <p>Лучшие продукты по лучшим ценам. Выбирайте, заказывайте и наслаждайтесь!</p>
      <img src={logo} alt="Магазин" className="banner" />
    </div>
  );
};

export default HomePage;
