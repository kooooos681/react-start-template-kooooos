import React from 'react';
import './shortproductcard.css';
import { BasketButton } from '../BasketButton/BasketButton';

export interface ShortItemProps {
  id: string;
  img: string;
  price: number;
  name: string;
  description: string;
  count: number;
}

export const ShortProductCard = (shortItemProps: ShortItemProps) => {
  return (
    <div className="product-row">
      <div className="product-image">
        <img src={shortItemProps.img} alt={shortItemProps.name} />
      </div>
      <div className="product-details">
        <h2 className="product-name">{shortItemProps.name}</h2>
        <p className="product-description">{shortItemProps.description}</p>
      </div>
      <div className="product-price">
        <span>{shortItemProps.price} руб.</span>
      </div>
      <div className="product-action" onClick={(e) => e.stopPropagation()}>
        <BasketButton size={'small'} count={shortItemProps.count} />
      </div>
    </div>
  );
};