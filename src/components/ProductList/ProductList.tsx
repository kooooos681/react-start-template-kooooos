import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { products } from '../../data/products';
import './ProductList.css';

const ProductList: React.FC = () => {
  return (
    <div className="productList">
      <h2>Our Products</h2>
      <ul className="productListItems">
        {products.map((product: Product) => (
          <li key={product.id} className="productListItem">
            <Link to={`/modal/${product.id}`} className="productLink">
              <img src={product.image} alt={product.title} className="productImage" />
              <h3 className="productTitle">{product.title}</h3>
              <p className="productDescription">{product.description}</p>
              <p className="productPrice">{product.price} ₽</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList; 