import React, { useEffect, useState } from 'react';
import { useGraphQLQuery } from '../hooks/useGraphQL';
import { GET_PRODUCTS_QUERY } from '../api/graphql/products';
import { productsService } from '../api/services/products';
import { Product } from '../api/services/products';

export const ProductList: React.FC = () => {
  const [restProducts, setRestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GraphQL запрос
  const { data: graphqlData, loading: graphqlLoading, error: graphqlError } = useGraphQLQuery(GET_PRODUCTS_QUERY, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  // REST API запрос
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsService.getProducts();
        setRestProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || graphqlLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || graphqlError) {
    return <div>Ошибка: {error || graphqlError?.message}</div>;
  }

  return (
    <div>
      <h2>Продукты (REST API)</h2>
      <ul>
        {restProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>

      <h2>Продукты (GraphQL)</h2>
      <ul>
        {graphqlData?.products.map((product: any) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}; 