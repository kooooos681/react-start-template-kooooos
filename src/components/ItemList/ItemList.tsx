import React, { useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import './itemlist.css';

export interface ItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ItemListProps {
  items: ItemProps[];
  onAddToBasket: (id: number) => void;
}

interface ModalProps {
  item: ItemProps;
  onClose: () => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onAddToBasket }) => {
  const [modalItem, setModalItem] = useState<ItemProps | null>(null);

  return (
    <div className="itemList">
      <h2>Items</h2>
      <ul className="itemListItems">
        {items.map((item: ItemProps) => (
          <li key={item.id} className="itemListItem" onClick={() => setModalItem(item)}>
            <div className="itemTitle">{item.title}</div>
            <div className="itemPrice">{item.price} ₽</div>
            <button onClick={(e) => {
              e.stopPropagation();
              onAddToBasket(item.id);
            }}>Add to Basket</button>
          </li>
        ))}
      </ul>
      {modalItem && <Modal item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleClick}>
        <img src={item.image} alt={item.title} className="modalImage" />
        <h3>{item.title}</h3>
        <p>Цена: {item.price} ₽</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>,
    document.body
  );
};

export default ItemList;