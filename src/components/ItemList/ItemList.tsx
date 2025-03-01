import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShortItemProps, ShortProductCard } from "../ShortProductCard/ShortProductCard";

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
  },
};

// Компонент списка товаров
export const ItemList: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>();
  const [modalItem, setModalItem] = useState<ShortItemProps | null>(null);
 const observerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div>
      <h2>Список товаров</h2>
      <ul>
        {items.map((item) => (
         <ShortProductCard id={item.id} price={item.price} name={item.name} description={item.description} count={item.count}></ShortProductCard>
        ))}
      </ul>
      <div ref={observerRef} style={{ height: "20px", background: "#f0f0f0" }} />
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

