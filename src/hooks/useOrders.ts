import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_ORDERS_QUERY,
  CREATE_ORDER_MUTATION,
  UPDATE_ORDER_STATUS_MUTATION,
} from '../api/graphql/orders';

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  products: OrderProduct[];
  status: string;
  total: number;
  createdAt: string;
}

export interface CreateOrderInput {
  products: {
    id: string;
    quantity: number;
  }[];
}

export const useOrders = () => {
  const [error, setError] = useState<string | null>(null);

  const { data: ordersData, loading: ordersLoading } = useQuery(GET_ORDERS_QUERY);
  const [createOrder, { loading: createLoading }] = useMutation(CREATE_ORDER_MUTATION);
  const [updateOrderStatus, { loading: updateLoading }] = useMutation(UPDATE_ORDER_STATUS_MUTATION);

  const handleCreateOrder = async (input: CreateOrderInput) => {
    try {
      setError(null);
      const { data } = await createOrder({
        variables: { input },
        refetchQueries: [{ query: GET_ORDERS_QUERY }],
      });
      return data.createOrder;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка создания заказа');
      throw error;
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      setError(null);
      const { data } = await updateOrderStatus({
        variables: { id, status },
        refetchQueries: [{ query: GET_ORDERS_QUERY }],
      });
      return data.updateOrderStatus;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка обновления статуса заказа');
      throw error;
    }
  };

  return {
    orders: ordersData?.orders || [],
    loading: ordersLoading || createLoading || updateLoading,
    error,
    createOrder: handleCreateOrder,
    updateOrderStatus: handleUpdateOrderStatus,
  };
}; 