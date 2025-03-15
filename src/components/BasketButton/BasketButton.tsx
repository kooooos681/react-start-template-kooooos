import React from 'react';
import './basketbutton.css';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  count: number;
}

export function BasketButton({ primary = false, size = 'medium', backgroundColor, ...props }: ButtonProps) {
  const count = props.count;
  const mode = primary ? 'primary' : 'secondary';

  if (count === 0) {
    return (
      <button type="button" className={`button ${size} ${mode}`} style={{ backgroundColor }} {...props}>
        В корзину
      </button>
    );
  }

  return (
    <div className="counterContainer">
      <button className="decrement">-</button>
      <input className="countInput" value={count} readOnly />
      <button className="increment">+</button>
    </div>
  );
}