import React, { useCallback } from 'react';
import { useOrders } from '../hooks/useOrders';
import { OrdersList } from '../components/orders/OrdersList';
import '../components/orders/OrdersList.css';
import { Order, OrderStatus } from '../api/types';

const statusOptions = [
  { value: '', label: 'Все статусы' },
  { value: OrderStatus.PendingConfirmation, label: 'Ожидание подтверждения' },
  { value: OrderStatus.Processing, label: 'В обработке' },
  { value: OrderStatus.Packaging, label: 'Упаковка' },
  { value: OrderStatus.WaitingForDelivery, label: 'Ожидание доставки' },
  { value: OrderStatus.InTransit, label: 'В пути' },
  { value: OrderStatus.Delivered, label: 'Доставлен' },
  { value: OrderStatus.ReturnRequested, label: 'Запрошен возврат' },
  { value: OrderStatus.OrderCancelled, label: 'Отменён' },
];

const sortOptions = [
  { value: 'createdAt', label: 'По дате создания' },
  { value: 'updatedAt', label: 'По дате обновления' },
  { value: 'id', label: 'По ID' },
];

const OrdersPage: React.FC = () => {
  const { orders, loading, error, pagination, setFilters, filters, sorting, updateOrderInState, deleteOrderInState } = useOrders();

  const handlePrevPage = () => {
    if (pagination.pageNumber > 1) {
      setFilters({ pagination: { ...pagination, pageNumber: pagination.pageNumber - 1 } });
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    if (pagination.pageNumber < totalPages) {
      setFilters({ pagination: { ...pagination, pageNumber: pagination.pageNumber + 1 } });
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setFilters({ status: value as OrderStatus, pagination: { ...pagination, pageNumber: 1 } });
    } else {
      setFilters({ status: undefined, pagination: { ...pagination, pageNumber: 1 } });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sorting: { ...sorting, field: e.target.value as 'createdAt' | 'updatedAt' | 'id' | 'name' | 'date' } });
  };

  // Обновление заказа в таблице после смены статуса
  const handleOrderUpdate = useCallback((updatedOrder: Order) => {
    updateOrderInState(updatedOrder);
  }, [updateOrderInState]);

  // Обновление заказа в таблице после смены статуса
  const handleOrderDelete = useCallback((orderId: string) => {
    deleteOrderInState(orderId);
  }, [deleteOrderInState]);

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="orders-page">
      <h1 className="profile-title">Список заказов</h1>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <select value={filters.status || ''} onChange={handleStatusChange} className="input">
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select value={sorting.field} onChange={handleSortChange} className="input">
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <OrdersList orders={orders} loading={loading} error={error} onOrderUpdate={handleOrderUpdate} onOrderDelete={handleOrderDelete} />
      <div className="pagination" style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, alignSelf: 'flex-end', marginLeft: 'auto' }}>
        <span style={{ width: '70%' }} />
        <button
          className="button button-primary button-image"
          onClick={handlePrevPage}
          disabled={pagination.pageNumber === 1}
          aria-label="Предыдущая страница"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span 
          style={{ 
            minWidth: 48, 
            textAlign: 'center', 
            fontSize: '1.05em', 
            fontWeight: 600, 
            background: 'var(--shop-primary, #ff671f)', 
            color: 'white', 
            borderRadius: 12, 
            padding: '4px 16px', 
            margin: '0 4px', 
            letterSpacing: 1, 
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            display: 'inline-block',
            fontFamily: 'inherit'
          }}
        >
          {pagination.pageNumber} <span style={{ opacity: 0.7, fontWeight: 400 }}>/ {totalPages || 1}</span>
        </span>
        <button
          className="button button-primary button-image"
          onClick={handleNextPage}
          disabled={pagination.pageNumber === totalPages || totalPages === 0}
          aria-label="Следующая страница"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {loading && <div className="loading">Загрузка...</div>}
      {(pagination.pageNumber === totalPages && orders.length > 0 && !loading) && (
        <div className="no-more-items">Больше заказов нет</div>
      )}
    </div>
  );
};

export default OrdersPage; 