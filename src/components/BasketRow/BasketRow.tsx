import React, { memo } from 'react';
import './basketrow.css';

export interface BasketRowProps {
  id: string;
  title: string;
  price: number;
  count: number;
  onRemove: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
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
      <button 
        className="basketRowRemove" 
        onClick={() => onRemove(id)}
        title="Удалить"
        aria-label="Удалить товар"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default memo(BasketRow);
