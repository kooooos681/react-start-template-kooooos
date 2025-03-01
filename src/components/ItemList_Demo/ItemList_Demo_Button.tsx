import React, { useEffect, useRef, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { ShortItemProps } from '../ShortProductCard/ShortProductCard';
import logo from './img.png';

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
  price: Math.random() * 1000,
  description: 'test',
  count: 1,
});

export const ItemListDemoButton: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>(Array.from({ length: 1 }, generateRandomItem));

  const addItem = () => setItems((prev) => [...prev, generateRandomItem()]);

  return (
    <>
      <ItemList itemList={items} />
      <button onClick={addItem}>Показать еще</button>
    </>
  );
};
