import { useState, useEffect } from 'react';
import { Item } from "src/pages/ProductsPage";

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  count: number;
}

const BASKET_STORAGE_KEY = 'shopping_basket';

export const useBasket = () => {
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    const savedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item: Item) => {
    setBasket(prevBasket => {
      const existingItem = prevBasket.find(basketItem => basketItem.id === item.id);
      if (existingItem) {
        return prevBasket.map(basketItem =>
          basketItem.id === item.id
            ? { ...basketItem, count: basketItem.count + 1 }
            : basketItem
        );
      }
      return [...prevBasket, { id: item.id, name: item.name, price: item.price, count: 1 }];
    });
  };

  const removeFromBasket = (id: string) => {
    setBasket(prevBasket => prevBasket.filter(item => item.id !== id));
  };

  const incrementCount = (id: string) => {
    setBasket(prevBasket =>
      prevBasket.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrementCount = (id: string) => {
    setBasket(prevBasket =>
      prevBasket.map(item =>
        item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
      )
    );
  };

  const total = basket.reduce((sum, item) => sum + item.price * item.count, 0);

  return {
    basket,
    addToBasket,
    removeFromBasket,
    incrementCount,
    decrementCount,
    total
  };
}; 