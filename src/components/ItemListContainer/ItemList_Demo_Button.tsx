import React, { useState } from 'react';
import ItemList, { Item } from '../ItemList/ItemList';

export const ItemListDemoButton: React.FC = () => {
  const [items] = useState<Item[]>([
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Description for product 1',
      image: 'http://19429ba06ff2.vps.myjino.ru/api/upload/1.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Description for product 2',
      image: 'http://19429ba06ff2.vps.myjino.ru/api/upload/2.jpg',
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
