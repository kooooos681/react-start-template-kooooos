import React, { useState } from "react";
import { Category } from "src/api/services/categories";
import './CategoriesList.css';

export type EditedCategory = {
  name: string;
  photo: string;
};

interface EditCategoryModalProps {
  category?: Category;
  onSave: (category: EditedCategory) => void;
  onClose: () => void;
  onDelete?: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ 
  category, 
  onSave, 
  onClose,
  onDelete 
}) => {
  const [formData, setFormData] = useState<EditedCategory>({
    name: category?.name || '',
    photo: category?.photo || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">
          {category ? 'Редактировать категорию' : 'Добавить категорию'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Название категории</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Введите название категории"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">URL изображения</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="input"
              placeholder="Введите URL изображения"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="button button-success">
              {category ? 'Сохранить' : 'Добавить'}
            </button>
            <button type="button" className="button" onClick={onClose}>
              Отмена
            </button>
            {category && onDelete && (
              <button
                type="button"
                className="button button-danger"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
              >
                Удалить
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
