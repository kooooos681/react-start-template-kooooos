import React, { useState } from 'react';
import ItemList from '../ItemList/ItemList';
import { ItemProps } from '../ItemList/ItemList';
import logo from './favicon.svg';

export const ItemListDemoButton: React.FC = () => {
  const [items] = useState<ItemProps[]>([
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      image: logo
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      image: logo
    }
  ]);

  const handleAddToBasket = (id: number) => {
    console.log('Added to basket:', id);
  };

  return (
    <div>
      <ItemList items={items} onAddToBasket={handleAddToBasket} />
    </div>
  );
};
