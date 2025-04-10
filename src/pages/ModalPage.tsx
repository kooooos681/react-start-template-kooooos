import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types/product';
import './ModalPage.css';

type ModalPageParams = {
  id: string;
};

const ModalPage: React.FC = () => {
  const { id } = useParams<ModalPageParams>();
  const navigate = useNavigate();
  
  if (!id) {
    return <div>Ошибка: ID товара не указан</div>;
  }
  
  const product = products.find((p: Product) => p.id === Number(id));
  
  if (!product) {
    return <div>Товар не найден</div>;
  }
  
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.title} className="modalImage" />
        <h3>{product.title}</h3>
        <p className="modalDescription">{product.description}</p>
        <p className="modalPrice">{product.price} ₽</p>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ModalPage; 