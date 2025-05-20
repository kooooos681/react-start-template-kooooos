import React, { useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList/ProductList';
import { useCart } from '../hooks/useCart';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const { products, loading, error, loadMore, hasMore } = useProducts();
  const { addToCart, cartItems, isAuthError } = useCart();

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  // Обработчик добавления в корзину через GraphQL
  const handleAddToCart = (id: string) => {
    addToCart(id, 1);
  };

  return (
    <div className="products-page" onScroll={handleScroll}>
      <div className="products-header">
        <h1>Товары</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <ProductList
        products={products}
        loading={loading}
        error={error}
        onLoadMore={loadMore}
        hasMore={hasMore}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        isAuthError={isAuthError}
      />
    </div>
  );
};

export default ProductsPage;