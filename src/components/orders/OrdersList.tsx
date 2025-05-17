import React from 'react';
import { Order, OrderStatus } from '../../api/types';
import { ordersService } from '../../api/services/orders';
import { useOrders } from '../../hooks/useOrders';

const statusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PendingConfirmation]: 'Ожидание подтверждения',
  [OrderStatus.Processing]: 'В обработке',
  [OrderStatus.Packaging]: 'Упаковка',
  [OrderStatus.WaitingForDelivery]: 'Ожидание доставки',
  [OrderStatus.InTransit]: 'В пути',
  [OrderStatus.Delivered]: 'Доставлен',
  [OrderStatus.ReturnRequested]: 'Запрошен возврат',
  [OrderStatus.OrderCancelled]: 'Отменён',
};

function getStatusClass(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PendingConfirmation: return 'order-status order-status-pending';
    case OrderStatus.Processing: return 'order-status order-status-processing';
    case OrderStatus.Packaging: return 'order-status order-status-packaging';
    case OrderStatus.WaitingForDelivery: return 'order-status order-status-waiting';
    case OrderStatus.InTransit: return 'order-status order-status-intransit';
    case OrderStatus.Delivered: return 'order-status order-status-delivered';
    case OrderStatus.ReturnRequested: return 'order-status order-status-return';
    case OrderStatus.OrderCancelled: return 'order-status order-status-cancelled';
    default: return 'order-status';
  }
}

interface OrdersListProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  onOrderUpdate: (order: Order) => void;
  onOrderDelete: (orderId: string) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, loading, error, onOrderUpdate, onOrderDelete }) => {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const handleDelete = async (orderId: string) => {
    if (!window.confirm('Удалить этот заказ?')) return;
    try {
      onOrderDelete(orderId);
    } catch (e) {
      alert('Ошибка удаления заказа');
    }
  };

  if (loading) return <div className="loader">Загрузка заказов...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!orders.length) return <div className="empty">Заказы не найдены</div>;

  return (
    <div className="orders-list">
      <table className="orders-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Пользователь</th>
            <th>Статус</th>
            <th>Товары</th>
            <th>Создан</th>
            <th>Обновлён</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              {/* <td>{order.id}</td> */}
              <td>{order.user?.name || order.user?.email || '—'}</td>
              <td><span className={getStatusClass(order.status)}>{statusLabels[order.status] || order.status}</span></td>
              <td>{order.products.map(p => `${p.product.name} x${p.quantity}`).join(', ')}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{new Date(order.updatedAt).toLocaleString()}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button className="button button-primary button-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedOrder(order)} aria-label="Сменить статус">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ display: 'block', margin: 'auto' }}>
                      <defs>
                        <marker id="arrowhead-green" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
                          <path d="M0,0 L6,3 L0,6 L2,3 Z" fill="#52c41a" />
                        </marker>
                        <marker id="arrowhead-red" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
                          <path d="M0,0 L6,3 L0,6 L2,3 Z" fill="#ff4d4f" />
                        </marker>
                      </defs>
                      <rect x="6" y="6" width="20" height="12" rx="2.5" fill="var(--x5-primary)" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="6" y="18" width="20" height="3" rx="1.5" fill="#2d3a4a"/>
                      <rect x="9" y="10" width="4" height="4" rx="1" fill="#ff6f91"/>
                      <rect x="15" y="11" width="8" height="2" rx="1" fill="white"/>
                      <rect x="15" y="14" width="8" height="2" rx="1" fill="white"/>
                      <rect x="22" y="30" width="20" height="12" rx="2.5" fill="var(--x5-primary)" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="22" y="42" width="20" height="3" rx="1.5" fill="#2d3a4a"/>
                      <rect x="25" y="34" width="6" height="2" rx="1" fill="white"/>
                      <rect x="25" y="37" width="2" height="6" rx="1" fill="#7ed957"/>
                      <rect x="29" y="37" width="2" height="4" rx="1" fill="#7ed957"/>
                      <rect x="33" y="37" width="2" height="2" rx="1" fill="#7ed957"/>
                      {/* Зелёная стрелка вниз (слева направо) */}
                      <path d="M26 18 Q36 18 36 28" stroke="#52c41a" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead-green)"/>
                      {/* Красная стрелка вверх (справа налево) */}
                      <path d="M22 30 Q12 30 12 20" stroke="#ff4d4f" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead-red)"/>
                    </svg>
                  </button>
                  <button
                    className="button button-danger button-image"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}
                    onClick={() => handleDelete(order.id)}
                    aria-label="Удалить заказ"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 6h10M8 6V4a2 2 0 0 1 4 0v2m2 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9v4M11 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Модалка смены статуса */}
      {selectedOrder && (
        <OrderStatusModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={onOrderUpdate} />
      )}
    </div>
  );
};

const OrderStatusModal = ({ order, onClose, onUpdate }: { order: Order, onClose: () => void, onUpdate: (order: Order) => void }) => {
  const [status, setStatus] = React.useState<OrderStatus>(order.status);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [updatedOrder, setUpdatedOrder] = React.useState<Order | null>(null);
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await ordersService.updateOrder(order.id, { status }).then((updated) => {
        setSuccess('Статус успешно обновлён!');
        setUpdatedOrder(updated);
        setShouldUpdate(true);
        setTimeout(() => onClose(), 800);
      });
    } catch (e: any) {
      setError(e.message || 'Ошибка обновления статуса');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!loading && shouldUpdate && updatedOrder) {
      onUpdate(updatedOrder);
    }
    // eslint-disable-next-line
  }, [shouldUpdate, updatedOrder, loading]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Смена статуса заказа</h2>
        <div style={{ marginBottom: 24 }}>
          <strong>Пользователь:</strong> {order.user?.name || order.user?.email || '—'}<br/>
          <strong>Товары:</strong> {order.products.map(p => `${p.product.name} x${p.quantity}`).join(', ')}
        </div>
        <div className="form-group">
          <label htmlFor="order-status">Статус заказа</label>
          <select
            id="order-status"
            className="input"
            value={status}
            onChange={e => setStatus(e.target.value as OrderStatus)}
            disabled={loading}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="modal-actions">
          <button className="button button-success" onClick={handleSave} disabled={loading || status === order.status}>
            Сохранить
          </button>
          <button className="button" onClick={onClose} disabled={loading}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}; 