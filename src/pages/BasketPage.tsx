import React from 'react';
import { useNavigate } from 'react-router-dom';
import BasketList from '../components/BasketList/BasketList';
import { useCart } from '../hooks/useCart';
import '../styles/BasketPage.css';

export const BasketPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, loading, error } = useCart();

  // TODO: реализовать удаление/изменение количества через GraphQL

  const handleCheckout = async () => {
    // TODO: оформить заказ через GraphQL, если требуется
    navigate('/orders');
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="basket-page">
      <h1>Корзина</h1>
      {error && <div className="error">{error.message}</div>}
      <BasketList 
        products={cartItems.map(item => ({
          id: item.product.id,
          title: item.product.name,
          price: 0, // TODO: добавить цену, если есть в product
          count: item.quantity,
          onRemove: () => {}, // TODO: реализовать удаление
          onIncrement: () => {}, // TODO: реализовать увеличение
          onDecrement: () => {}, // TODO: реализовать уменьшение
        }))}
      />
      <div className="basket-total">
        <p>Итого: {total} товаров</p>
        <button 
          className="button button-primary" 
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
};

export default BasketPage;
