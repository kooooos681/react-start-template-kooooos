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

  const addRandomItem = () => {
    //addItem(generateRandomItem());
  }

  return (
    <>
    <button >test button33</button>
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

