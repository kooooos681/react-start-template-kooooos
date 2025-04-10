import React from 'react';
import './BasketList.css';
import BasketRow, { BasketRowProps } from '../BasketRow/BasketRow';

interface BasketListProps {
  products: BasketRowProps[];
}

const BasketList: React.FC<BasketListProps> = ({ products }) => {
  return (
    <div className="basket-list">
      {products.map((product) => (
        <BasketRow key={product.id} {...product} />
      ))}
    </div>
  );
};

export default BasketList;
