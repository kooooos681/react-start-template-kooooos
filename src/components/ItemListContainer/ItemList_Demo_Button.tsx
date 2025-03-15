import React, { useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { ShortItemProps } from '../ShortProductCard/ShortProductCard';
import logo from './favicon.svg';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const generateRandomItem = (): ShortItemProps => ({
  id: generateUUID(),
  img: logo,
  name: 'Товар ' + Math.floor(Math.random() * 100),
  price: Math.floor(Math.random() * 100000)/100,
  description: 'description',
  count: 1,
});

export const ItemListDemoButton: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>(Array.from({ length: 5 }, generateRandomItem));

  const addItem = () => setItems((prev) => [...prev, ...Array.from({ length: 5 }, generateRandomItem)]);

  return (
    <>
      <ItemList itemList={items} />
      <button onClick={addItem}>Показать еще 5</button>
    </>
  );
};
