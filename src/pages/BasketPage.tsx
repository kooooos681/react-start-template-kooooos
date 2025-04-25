import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasketList from '../components/BasketList/BasketList';
import { useOrders } from '../hooks/useOrders';
import '../styles/BasketPage.css';

export const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<Array<{ productId: string; quantity: number }>>([]);
  const navigate = useNavigate();
  const { createOrder, loading, error } = useOrders();

  const handleRemove = (id: string) => {
    setBasket(basket.filter(item => item.productId !== id));
  };

  const handleIncrement = (id: string) => {
    setBasket(basket.map(item => 
      item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id: string) => {
    setBasket(basket.map(item => 
      item.productId === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    ));
  };

  const handleCheckout = async () => {
    try {
      const orderInput = {
        products: basket.map(item => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      };
      await createOrder(orderInput);
      setBasket([]);
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const total = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="basket-page">
      <h1>Корзина</h1>
      {error && <div className="error">{error}</div>}
      <BasketList 
        products={basket.map(item => ({
          id: item.productId,
          title: 'Product', // TODO: Get product title from API
          price: 0, // TODO: Get product price from API
          count: item.quantity,
          onRemove: handleRemove,
          onIncrement: handleIncrement,
          onDecrement: handleDecrement,
        }))}
      />
      <div className="basket-total">
        <p>Итого: {total} товаров</p>
        <button 
          className="button button-primary" 
          onClick={handleCheckout}
          disabled={loading || basket.length === 0}
        >
          {loading ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
};

export default BasketPage;
