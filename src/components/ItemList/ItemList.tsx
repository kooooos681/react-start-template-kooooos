import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ShortItemProps, ShortProductCard } from '../ShortProductCard/ShortProductCard';

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

interface ItemListProps {
  itemList: ShortItemProps[];
}

export const ItemList: React.FC<ItemListProps> = ({ itemList }: ItemListProps) => {
  const [modalItem, setModalItem] = useState<ShortItemProps | null>(null);

  return (
    <>
      <div>
        <h2>Список товаров</h2>
        <ul>
          {itemList.map((item) => (
            <li key={item.id} onClick={() => setModalItem(item)}>
              <ShortProductCard
                id={item.id}
                img={item.img}
                price={item.price}
                name={item.name}
                description={item.description}
                count={item.count}
              ></ShortProductCard>
            </li>
          ))}
        </ul>
        {modalItem && <Modal item={modalItem} onClose={() => setModalItem(null)} />}
      </div>
    </>
  );
};

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
