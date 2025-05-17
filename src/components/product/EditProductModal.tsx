import React, { useState } from "react";
import deleteButton from "src/icons/delete_button.svg"
import { useCategories } from "src/hooks/useCategories";
import { Category } from 'src/api/types';
import { Item } from "src/pages/ProductsPage";

export type EditedItem = {
  name: string;
  desc: string;
  price: number;
  photo: string;
  categoryId: string;
  category: Category;
}

interface EditProductModalProps {
  product?: Item;
  onDelete?: () => void;
  onSave: (product: EditedItem) => void;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onDelete, onClose }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    desc: product?.desc || '',
    price: product?.price || 0,
    photo: product?.photo || '',
    categoryId: product?.categoryId || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const selectedCategory = categories.find(c => c.id === formData.categoryId);
    if (!selectedCategory) return;
    const editProduct: EditedItem = {
      name: formData.name,
      desc: formData.desc,
      price: formData.price,
      photo: formData.photo,
      categoryId: formData.categoryId,
      category: {
        id: selectedCategory.id,
        name: selectedCategory.name,
        photo: selectedCategory.photo,
        createdAt: selectedCategory.createdAt.toString(),
        updatedAt: selectedCategory.updatedAt.toString()
      }
    };
    onSave(editProduct);
    onClose();
  };

  const handleDelete = () => {
    onDelete && onDelete();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h2 className="modal-title">
          {product ? "Изменить товар" : "Добавить товар"}
        </h2>
        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            placeholder="Название"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Ссылка на фото</label>
          <input
            id="photo"
            name="photo"
            placeholder="Ссылка на фото"
            className="input"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Описание</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Описание"
            className="input"
            value={formData.desc}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Цена</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            placeholder="Цена"
            className="input"
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Категория</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            className="input"
            onChange={handleChange}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button type="submit" className="button button-success">
            {product ? "Сохранить" : "Добавить"}
          </button>
          <button type="button" className="button" onClick={onClose}>
            Отмена
          </button>
          {product && onDelete && (
            <button type="button" className="button button-danger" onClick={handleDelete}>
              Удалить
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;
