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
    <div className="short-product-card-row-wrapper">
      <div className="logo">
        <img className="img" src={shortItemProps.img} alt="fireSpot" />
      </div>
      <div className="name">
        <h1>{shortItemProps.name}</h1>
      </div>
      <div className="price">
        <p>{shortItemProps.price} руб.</p>
      </div>
      <div className="basketButton">
        <BasketButton size={'small'} count={shortItemProps.count} />
      </div>
      <div className="description">
        <div className={'div-max-height'}>{shortItemProps.description}</div>
      </div>
    </div>
  );
};
