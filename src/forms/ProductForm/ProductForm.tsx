import React from 'react';
import { useForm } from 'react-hook-form';

interface ProductFormData {
  name: string;
  price: number;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Product Name</label>
        <input {...register('name', { required: 'Product name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          {...register('price', {
            required: 'Price is required',
            min: { value: 0, message: 'Price must be positive' },
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}
      </div>
      <button type="submit">Save Product</button>
    </form>
  );
};
