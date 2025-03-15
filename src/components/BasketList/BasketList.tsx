import React from 'react';
import '../../styles/ProductList.css';
import { BasketRow, BasketRowProps } from '../BasketRow/BasketRow';

interface BasketListProps {
  products: BasketRowProps[];
}

const BasketList: React.FC<BasketListProps> = ({ products }) => {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <BasketRow {...product} />
      ))}
    </ul>
  );
};

export default BasketList;
