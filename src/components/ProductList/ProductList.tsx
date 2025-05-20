import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

interface Product {
  id: string;
  name: string;
  photo: string;
  desc: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
}

interface CartItem {
  orderId: string;
  _id: string;
  product: { id: string; name: string };
  quantity: number;
}

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

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
  onAddToCart?: (id: string) => void;
  cartItems?: CartItem[];
  isAuthError?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onLoadMore,
  hasMore,
  onAddToCart,
  cartItems = [],
  isAuthError = false,
}) => {
  if (loading && products.length === 0) {
    return <div>Загрузка...</div>;
  }

  if (products.length > 0) {
    return (
      <div className="product-list">
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.product.id === product.id);
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              photo={product.photo}
              desc={product.desc}
              price={product.price}
              category={product.category.name}
              onAddToCart={onAddToCart}
              inCart={!!cartItem}
              cartQuantity={cartItem?.quantity}
              isAuthError={isAuthError}
            />
          );
        })}
        {hasMore && (
          <button onClick={onLoadMore} disabled={loading}>
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        )}
      </div>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <div>Товары не найдены</div>;
};

export default ProductList; 