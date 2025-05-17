import { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '../api/types';
import { apiClient } from '../api/client';
import { API_CONFIG } from '../api/config';

export type OrdersFilters = {
  productIds?: string[];
  userId?: string;
  ids?: string[];
  status?: OrderStatus;
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string;
    lte?: string;
  };
  updatedAt?: {
    gte?: string;
    lte?: string;
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export interface OrdersResponse {
  data: Order[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
}

export function useOrders(initialFilters: OrdersFilters = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ pageSize: 10, pageNumber: 1, total: 0 });
  const [sorting, setSorting] = useState<{ type: 'ASC' | 'DESC'; field: string }>({ type: 'DESC', field: 'createdAt' });
  const [filters, setFilters] = useState<OrdersFilters>(initialFilters);

  const fetchOrders = useCallback(async (overrideFilters?: OrdersFilters) => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {};
      const mergedFilters = { ...filters, ...overrideFilters };
      if (mergedFilters.productIds) params.productIds = JSON.stringify(mergedFilters.productIds);
      if (mergedFilters.userId) params.userId = mergedFilters.userId;
      if (mergedFilters.ids) params.ids = JSON.stringify(mergedFilters.ids);
      if (mergedFilters.status) params.status = JSON.stringify(mergedFilters.status);
      if (mergedFilters.pagination) params.pagination = JSON.stringify(mergedFilters.pagination);
      if (mergedFilters.createdAt) params.createdAt = JSON.stringify(mergedFilters.createdAt);
      if (mergedFilters.updatedAt) params.updatedAt = JSON.stringify(mergedFilters.updatedAt);
      if (mergedFilters.sorting) params.sorting = JSON.stringify(mergedFilters.sorting);

      const res: OrdersResponse = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS.LIST, params);
      setOrders(res.data);
      setPagination(res.pagination);
      setSorting(res.sorting);
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateFilters = (newFilters: OrdersFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Обновление заказа в локальном состоянии
  const updateOrderInState = (updatedOrder: Order | null | undefined) => {
    if (!updatedOrder) return;
    setOrders((prev) => prev.map(order => order.id === updatedOrder.id ? updatedOrder : order));
  };

  // Удаление заказа из локального состояния
  const deleteOrderInState = (orderId: string) => {
    setOrders((prev) => prev.filter(order => order.id !== orderId));
  };

  return {
    orders,
    loading,
    error,
    pagination,
    sorting,
    filters,
    setFilters: updateFilters,
    fetchOrders,
    updateOrderInState,
    deleteOrderInState,
  };
} 