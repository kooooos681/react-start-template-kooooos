import React, { useState } from 'react';
import BasketList from '../components/BasketList/BasketList';
import '../styles/BasketPage.css';
import logo from '../components/ItemListContainer/favicon.svg';

const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState([
    { id: 1, title: 'Молоко', price: 100, count: 2 },
    { id: 2, title: 'Хлеб', price: 50, count: 1 },
  ]);

  const handleRemove = (id: number) => {
    setBasket(basket.filter(item => item.id !== id));
  };

  const handleIncrement = (id: number) => {
    setBasket(basket.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ));
  };

  const handleDecrement = (id: number) => {
    setBasket(basket.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
    ));
  };

  const total = basket.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="cart-container">
      <h1>Корзина</h1>
      <BasketList 
        products={basket.map(item => ({
          ...item,
          onRemove: handleRemove,
          onIncrement: handleIncrement,
          onDecrement: handleDecrement
        }))} 
      />
      <h3>Итого: {total} ₽</h3>
    </div>
  );
};

export default BasketPage;
