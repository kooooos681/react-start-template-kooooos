import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShortItemProps, ShortProductCard } from '../ShortProductCard/ShortProductCard';
import { randomUUID } from 'node:crypto';
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
  },
};

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
// Функция для генерации случайного товара
export const generateRandomItem = (): ShortItemProps => ({
  id: generateUUID(),
  name: 'Товар ' + Math.floor(Math.random() * 100),
  price: Math.random() * 1000,
  description: 'test',
  count: 1,
});
// Компонент списка товаров
export const ItemList: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>(Array.from({ length: 10 }, generateRandomItem));
  const [modalItem, setModalItem] = useState<ShortItemProps | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("adding")
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
    <div>
      <h2>Список товаров</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
          <ShortProductCard 
            id={item.id}
            price={item.price}
            name={item.name}
            description={item.description}
            count={item.count}
          ></ShortProductCard>
          </li>
        ))}
      </ul>
      <div ref={observerRef} style={{ height: '20px', background: '#f0f0f0' }} />
      {modalItem && <Modal item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  );
};
// Компонент модального окна
interface ModalProps {
  item: ShortItemProps;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{item.name}</h3>
        <p>Цена: {item.price} ₽</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>,
    document.body
  );
};