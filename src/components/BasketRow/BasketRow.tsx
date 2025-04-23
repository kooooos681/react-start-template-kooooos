import React, { memo } from 'react';
import './basketrow.css';

export interface BasketRowProps {
  id: number;
  title: string;
  price: number;
  count: number;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}

const BasketRow: React.FC<BasketRowProps> = ({ id, title, price, count, onRemove, onIncrement, onDecrement }) => {
  return (
    <div className="basketRow">
      <span className="basketRowTitle">{title}</span>
      <span className="basketRowPrice">{price} ₽</span>
      <div className="basketRowControls">
        <button onClick={() => onDecrement(id)}>-</button>
        <span>{count}</span>
        <button onClick={() => onIncrement(id)}>+</button>
      </div>
      <button className="basketRowRemove" onClick={() => onRemove(id)}>
        Удалить
      </button>
    </div>
  );
};

export default memo(BasketRow);
