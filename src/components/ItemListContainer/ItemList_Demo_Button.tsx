import React, { useEffect, useRef, useState } from 'react';
import ItemList, { Item } from '../ItemList/ItemList';
import { useProducts } from '../../hooks/useProducts';

export const ItemListDemoButton: React.FC = () => {
  const [useGraphQL, setUseGraphQL] = useState(true);
  const { products, loading, error, loadMore } = useProducts(10, useGraphQL);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        loadMore();
      }
    });

    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, loadMore]);

  const handleAddToBasket = (id: string) => {
    console.log(`Added to basket: ${id}`);
  };

  const toggleApi = () => {
    setUseGraphQL(!useGraphQL);
  };

  return (
    <div>
      <button onClick={toggleApi} className="button button-primary">
        Переключить на {useGraphQL ? 'REST API' : 'GraphQL'}
      </button>
      <ItemList 
        items={products} 
        onAddToBasket={handleAddToBasket} 
        loading={loading}
        error={error}
      />
    </div>
  );
};
