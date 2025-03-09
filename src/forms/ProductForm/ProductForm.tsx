import React from 'react';
import { useForm } from 'react-hook-form';
import './ProductForm.css';

interface ProductFormData {
  img: string;
  category: string;
  price: number;
  name: string;
  description: string;
  count: number;
}

export const ProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit = (data: ProductFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="sberbank-theme">
      <form className="product-form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="product-field">
          <label className="product-label">URL изображения</label>
          <input
            className="product-input"
            {...register('img', { required: 'Image URL is required' })}
          />
          {errors.img && <span className="product-error">{errors.img.message}</span>}
        </div>
        <div className="product-field">
          <label className="product-label">Категория</label>
          <input
            className="product-input"
            {...register('category', { required: 'Category is required' })}
          />
          {errors.category && <span className="product-error">{errors.category.message}</span>}
        </div>
        <div className="product-field">
          <label className="product-label">Цена</label>
          <input
            type="number"
            className="product-input"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            })}
          />
          {errors.price && <span className="product-error">{errors.price.message}</span>}
        </div>
        <div className="product-field">
          <label className="product-label">Наименование</label>
          <input
            className="product-input"
            {...register('name', { required: 'Product name is required' })}
          />
          {errors.name && <span className="product-error">{errors.name.message}</span>}
        </div>
        <div className="product-field">
          <label className="product-label">Описание</label>
          <textarea
            className="product-input"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <span className="product-error">{errors.description.message}</span>}
        </div>
        <div className="product-field">
          <label className="product-label">Количество</label>
          <input
            type="number"
            className="product-input"
            {...register('count', {
              required: 'Count is required',
              min: { value: 1, message: 'Count must be at least 1' },
            })}
          />
          {errors.count && <span className="product-error">{errors.count.message}</span>}
        </div>
        <button type="submit" className="product-submit-button">Save Product</button>
      </form>
    </div>
  );
};
