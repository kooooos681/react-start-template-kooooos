import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShortItemProps, ShortProductCard } from "../ShortProductCard/ShortProductCard";
import { ItemList } from "../ItemList/ItemList";

// Функция для генерации случайного товара
export const generateRandomItem = (): ShortItemProps => ({
  id: Math.random().toString(36),
  name: "Товар " + Math.floor(Math.random() * 100),
  price: (Math.random() * 1000),
  description: "test",
  count: 1
});

// Компонент списка товаров
export const ItemListDemo: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>(Array.from({ length: 10 }, generateRandomItem));
  // const [modalItem, setModalItem] = useState<ShortItemProps | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setItems((prev) => [...prev, ...Array.from({ length: 5 }, generateRandomItem)]);
  //       }
  //     },
  //     { threshold: 1 }
  //   );
  //   if (observerRef.current) {
  //     observer.observe(observerRef.current);
  //   }
  //   return () => observer.disconnect();
  // }, []);

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


  return (
    <>
    <ItemList></ItemList>
    </>
  );
};
// // Компонент модального окна
// interface ModalProps {
//   item: ShortItemProps;
//   onClose: () => void;
// }
// const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
//   return createPortal(
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <h3>{item.name}</h3>
//         <p>Цена: {item.price} ₽</p>
//         <button onClick={onClose}>Закрыть</button>
//       </div>
//     </div>,
//     document.body
//   );
// };

