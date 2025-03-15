import React from 'react';
import './basketrow.css';
import { BasketButton } from '../BasketButton/BasketButton';
import delete_logo from './icon_delete.svg';

export interface BasketRowProps {
  img: string;
  name: string;
  price: number;
  count: number;
}

export function BasketRow(props: BasketRowProps) {
  return (
    <div className="basket-row">
      <div className="basket-image">
        <img src={props.img} alt="Product" />
      </div>
      <div className="basket-name">{props.name}</div>
      <div className="basket-price">{props.price} руб./шт.</div>
      <div className="basket-action" onClick={(e) => e.stopPropagation()}>
        <BasketButton count={props.count} />
      </div>
      <div className="basket-total">&nbsp;Итого: {props.price * props.count} руб.</div>
      <div className="basket-delete">
        <button>
          <img src={delete_logo} alt="Delete" />
        </button>
      </div>
    </div>
  );
}
