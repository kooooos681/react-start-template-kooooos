import React from 'react';
import { Category } from 'src/api/services/categories';
import './CategoriesList.css';

export interface CategoryProps {
  category: Category;
  onEdit: () => void;
}

const CategoryCard: React.FC<CategoryProps> = ({ category, onEdit }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="category-card">
      <div className="category-image">
        <img src={category.photo} alt={category.name} />
      </div>
      <div className="category-info">
        <h3>{category.name}</h3>
        <p>
          <strong>Создано:</strong> {formatDate(category.createdAt)}
        </p>
        <p>
          <strong>Обновлено:</strong> {formatDate(category.updatedAt)}
        </p>
      </div>
      <div className="category-actions">
        <button 
          className="button button-primary button-image"
          onClick={onEdit}
          aria-label="Редактировать категорию"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
