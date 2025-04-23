import React, { useState } from 'react';
import ItemList, { Item } from '../ItemList/ItemList';
import logo from './favicon.svg';

export const ItemListDemoButton: React.FC = () => {
  const [items] = useState<Item[]>([
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Description for product 1',
      image: logo,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Description for product 2',
      image: logo,
    },
  ]);

  const handleAddToBasket = (id: number) => {
    console.log(`Added to basket: ${id}`);
  };

  return (
    <div>
      <ItemList items={items} onAddToBasket={handleAddToBasket} />
    </div>
  );
};
