import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  name: string;
  photo: string;
  desc: string;
  price: number;
  category: string;
  onAddToCart?: (id: string) => void;
  inCart?: boolean;
  cartQuantity?: number;
  isAuthError?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  photo,
  desc,
  price,
  category,
  onAddToCart,
  inCart = false,
  cartQuantity = 0,
  isAuthError = false,
}) => {
  return (
    <article className="product-card" role="article">
      <img
        src={photo || 'https://via.placeholder.com/150'}
        alt={name}
        className="product-image"
      />
      <h2 className="product-title">{name}</h2>
      <div className="product-price-container">
        <p className="product-price">{price} ₽</p>
      </div>
      <p className="product-description">{desc}</p>
      <p className="product-category">Категория: {category}</p>
      {isAuthError ? (
        <div className="error">Для добавления в корзину нужно авторизоваться</div>
      ) : inCart ? (
        <div className="cart-counter">
          <button className="button" disabled>-</button>
          <span>{cartQuantity}</span>
          <button className="button" disabled>+</button>
        </div>
      ) : (
        <button
          className="button button-primary"
          onClick={() => {
            if (onAddToCart) onAddToCart(id);
          }}
        >
          В корзину
        </button>
      )}
    </article>
  );
};

export default ProductCard; 