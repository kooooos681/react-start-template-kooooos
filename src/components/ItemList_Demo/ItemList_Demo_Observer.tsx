import React, { useEffect, useRef, useState } from 'react';
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
  price: Math.random() * 1000,
  description: 'test',
  count: 1,
});

export const ItemListDemoObserver: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>(Array.from({ length: 1 }, generateRandomItem));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItems((prev) => [...prev, ...Array.from({ length: 5 }, generateRandomItem)]);
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const observerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <ItemList itemList={items} />
      <div ref={observerRef} style={{ height: '2px', background: '#f0f0f0' }} />
    </>
  );
};
