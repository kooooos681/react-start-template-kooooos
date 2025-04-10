import React from 'react';
import './ShortProductCard.css';

interface ShortProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ShortProductCard: React.FC<ShortProductCardProps> = ({ 
  id, 
  title, 
  price, 
  image 
}) => {
  return (
    <div className="shortProductCard">
      <img src={image} alt={title} className="shortProductCardImage" />
      <div className="shortProductCardContent">
        <h3 className="shortProductCardTitle">{title}</h3>
        <p className="shortProductCardPrice">{price} ₽</p>
      </div>
    </div>
  );
};

export default ShortProductCard;