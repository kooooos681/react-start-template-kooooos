import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ShortItemProps, ShortProductCard } from '../ShortProductCard/ShortProductCard';
import './itemlist.css';

interface ItemListProps {
  itemList: ShortItemProps[];
}

export const ItemList: React.FC<ItemListProps> = ({ itemList }) => {
  const [modalItem, setModalItem] = useState<ShortItemProps | null>(null);

  return (
    <div className="product-list">
      {itemList.map((item) => (
        <div key={item.id} className="product-item" onClick={() => setModalItem(item)}>
          <ShortProductCard {...item} />
        </div>
      ))}
      {modalItem && <Modal item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  );
};

interface ModalProps {
  item: ShortItemProps;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{item.name}</h3>
        <p>Цена: {item.price} ₽</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>,
    document.body
  );
};