import React, { useState } from 'react';
import BasketList from '../components/BasketList/BasketList';
import '../styles/BasketPage.css';
import { useBasket } from '../hooks/useBasket';
import { ordersService } from '../api/services/orders';
import { OrderStatus } from '../api/types';

const BasketPage: React.FC = () => {
  const { basket, removeFromBasket, incrementCount, decrementCount, total } = useBasket();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOrder = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!basket.length) {
        setError('Корзина пуста');
        setLoading(false);
        return;
      }
      await ordersService.createOrder({
        products: basket.map(item => ({ id: item.id, quantity: item.count })),
        status: OrderStatus.PendingConfirmation,
      });
      setSuccess('Заказ успешно оформлен!');
      // Очищаем корзину
      basket.forEach(item => removeFromBasket(item.id));
    } catch (e: any) {
      setError(e.message || 'Ошибка оформления заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="products-header" >
        <h1 className="products-title">Корзина</h1>
        <div className="products-actions">
          <button
            className="button button-success"
            onClick={handleOrder}
            disabled={loading || !basket.length}
            aria-label="Оформить заказ"
            style={{width: '100px'}}
          >
            Оформить заказ
          </button>
        </div>
      </div>
      <div className="cart-container">
        <BasketList
          products={basket.map(item => ({
            ...item,
            title: item.name,
            onRemove: removeFromBasket,
            onIncrement: incrementCount,
            onDecrement: decrementCount
          }))}
        />
        <div className="cart-total">
          <h3>Итого: {total} ₽</h3>
        </div>
        {success && <div className="success" style={{ marginTop: 16 }}>{success}</div>}
        {error && <div className="error" style={{ marginTop: 16 }}>{error}</div>}
      </div>
    </>
  );
};

export default BasketPage;
