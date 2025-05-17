import React from 'react';
import { Category } from 'src/api/services/categories';
import CategoryCard from './CategoryCard';

export interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit }) => {
  return (
    <div className="categories-list">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={() => onEdit(category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
