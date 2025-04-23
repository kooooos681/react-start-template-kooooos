import React, { useState } from 'react';
import './itemlist.css';
import '../../styles/common.css';

export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ItemListProps {
  items: Item[];
  onAddToBasket: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onAddToBasket }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="itemList">
      <ul className="itemListItems">
        {items.map((item) => (
          <li key={item.id} className="itemListItem">
            <img src={item.image} alt={item.title} className="itemImage" />
            <h3 className="itemTitle">{item.title}</h3>
            <p className="itemPrice">{item.price} ₽</p>
            <p className="itemDescription">{item.description}</p>
            <div className="itemActions">
              <button className="button button-small button-primary" onClick={() => handleItemClick(item)}>
                Подробнее
              </button>
              <button className="button button-small button-success" onClick={() => onAddToBasket(item.id)}>
                В корзину
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.image} alt={selectedItem.title} className="modalImage" />
            <h2 className="modalTitle">{selectedItem.title}</h2>
            <p className="modalDescription">{selectedItem.description}</p>
            <p className="modalPrice">{selectedItem.price} ₽</p>
            <div className="modalActions">
              <button className="button button-primary" onClick={handleCloseModal}>
                Закрыть
              </button>
              <button
                className="button button-success"
                onClick={() => {
                  onAddToBasket(selectedItem.id);
                  handleCloseModal();
                }}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;