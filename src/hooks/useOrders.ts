import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_ORDERS_QUERY,
  CREATE_ORDER_MUTATION,
  REMOVE_ORDER_MUTATION,
  UPDATE_ORDER_STATUS_MUTATION,
} from '../api/graphql/orders';

export interface OrderProduct {
  _id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
  };
}

export interface Order {
  id: string;
  products: OrderProduct[];
}

export interface CreateOrderInput {
  products: {
    id: string;
    quantity: number;
  }[];
}

export const useOrders = () => {
  const [error, setError] = useState<string | null>(null);

  // Получение заказов (корзины)
  const { data: ordersData, loading: ordersLoading, refetch } = useQuery(GET_ORDERS_QUERY, {
    variables: { input: { pagination: { pageSize: 10, pageNumber: 1 } } },
  });

  // Добавление заказа
  const [createOrderMutation, { loading: createLoading }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_ORDERS_QUERY, variables: { input: { pagination: { pageSize: 10, pageNumber: 1 } } } }],
  });

  // Удаление заказа
  const [removeOrderMutation, { loading: removeLoading }] = useMutation(REMOVE_ORDER_MUTATION, {
    refetchQueries: [{ query: GET_ORDERS_QUERY, variables: { input: { pagination: { pageSize: 10, pageNumber: 1 } } } }],
  });

  // Обновление статуса заказа (если нужно)
  const [updateOrderStatus, { loading: updateLoading }] = useMutation(UPDATE_ORDER_STATUS_MUTATION);

  const handleCreateOrder = async (input: CreateOrderInput) => {
    try {
      setError(null);
      const { data } = await createOrderMutation({ variables: { input } });
      return data.orders.add;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка создания заказа');
      throw error;
    }
  };

  const handleRemoveOrder = async (id: string) => {
    try {
      setError(null);
      const { data } = await removeOrderMutation({ variables: { id } });
      return data.orders.remove;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка удаления заказа');
      throw error;
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      setError(null);
      const { data } = await updateOrderStatus({
        variables: { id, status },
        refetchQueries: [{ query: GET_ORDERS_QUERY, variables: { input: { pagination: { pageSize: 10, pageNumber: 1 } } } }],
      });
      return data.updateOrderStatus;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка обновления статуса заказа');
      throw error;
    }
  };

  // Корректно достаем список заказов из вложенности
  const orders = ordersData?.orders?.getMany?.data || [];

  return {
    orders,
    loading: ordersLoading || createLoading || removeLoading || updateLoading,
    error,
    createOrder: handleCreateOrder,
    removeOrder: handleRemoveOrder,
    updateOrderStatus: handleUpdateOrderStatus,
    refetch,
  };
}; 