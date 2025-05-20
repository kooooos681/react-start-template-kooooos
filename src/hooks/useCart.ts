import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import {
  GET_ORDERS_QUERY,
  CREATE_ORDER_MUTATION,
  REMOVE_ORDER_MUTATION,
} from '../api/graphql/orders';

interface CartProduct {
  id: string;
  name: string;
}

interface CartOrderProduct {
  _id: string;
  quantity: number;
  product: CartProduct;
}

interface CartOrder {
  id: string;
  products: CartOrderProduct[];
}

export const useCart = () => {
  // Получение корзины (orders.getMany)
  const { data, loading, error, refetch } = useQuery(GET_ORDERS_QUERY, {
    variables: { input: { pagination: { pageSize: 10, pageNumber: 1 } } },
    fetchPolicy: 'network-only',
  });

  // Добавление товара в корзину (orders.add)
  const [addToCartMutation, { loading: addLoading }] = useMutation(CREATE_ORDER_MUTATION);
  // Удаление заказа (orders.remove)
  const [removeOrderMutation, { loading: removeLoading }] = useMutation(REMOVE_ORDER_MUTATION);

  // Добавить товар в корзину
  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      await addToCartMutation({
        variables: {
          input: {
            products: [{ id: productId, quantity }],
          },
        },
      });
      await refetch();
      return true;
    } catch (e: any) {
      return e;
    }
  }, [addToCartMutation, refetch]);

  // Удалить заказ (по id заказа)
  const removeOrder = useCallback(async (orderId: string) => {
    await removeOrderMutation({ variables: { id: orderId } });
    await refetch();
  }, [removeOrderMutation, refetch]);

  // Корзина — это массив заказов (orders.getMany.data)
  const orders: CartOrder[] = data?.orders?.getMany?.data || [];

  // Можно собрать все товары из всех заказов (если нужно)
  const cartItems = useMemo(() => orders.flatMap((order: CartOrder) => order.products.map((p: CartOrderProduct) => ({
    orderId: order.id,
    _id: p._id,
    product: p.product,
    quantity: p.quantity,
  }))), [orders]);

  // Проверка на ошибку авторизации
  const isAuthError = useMemo(() => {
    if (!error) return false;
    return (
      error.message.includes('not authenticated') ||
      error.message.toLowerCase().includes('auth')
    );
  }, [error]);

  return {
    cartItems,
    orders,
    loading: loading || addLoading || removeLoading,
    error,
    isAuthError,
    addToCart,
    removeOrder,
    refetch,
  };
}; 