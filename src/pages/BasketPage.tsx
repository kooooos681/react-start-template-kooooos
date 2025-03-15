import React, { useState } from 'react';
import BasketList from '../components/BasketList/BasketList';
import '../styles/BasketPage.css';
import logo from '../components/ItemListContainer/favicon.svg';

const BasketPage: React.FC = () => {
  const [basket] = useState([
    { img: logo, name: 'Молоко', price: 100, count: 2 },
    { img: logo, name: 'Хлеб', price: 50, count: 1 },
  ]);

  const total = basket.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="cart-container">
      <h1>Корзина</h1>
      <BasketList products={basket} />
      <h3>Итого: {total} ₽</h3>
    </div>
  );
};

export default BasketPage;
