import React, { useState, useRef, useEffect } from "react";
import CategoryList from '../components/categories/CategoriesList';
import { useCategories } from "src/hooks/useCategories";
import { Category } from "src/api/services/categories";
import EditCategoryModal, { EditedCategory } from "src/components/categories/EditCategoryModal";
import '../styles/CategoriesPage.css';

const CategoriesPage: React.FC = () => {
  const { categories, loading, error, loadMore, hasMore, createCategory, updateCategory, deleteCategory } = useCategories(20);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading, loadMore, hasMore]);

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSave = (category: EditedCategory) => {
    if (selectedCategory) {
      updateCategory(selectedCategory.id, category);
    } else {
      createCategory(category);
    }
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="categories-header">
        <h1 className="categories-title">Категории</h1>
        <div className="categories-actions">
          <button 
            className="button button-success" 
            onClick={handleAdd}
            aria-label="Добавить категорию"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="14" y="6" width="4" height="20" rx="2" fill="white"/>
              <rect x="6" y="14" width="20" height="4" rx="2" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
      />

      {hasMore && <div ref={observerTarget} style={{ height: '20px', margin: '20px 0' }}></div>}

      {showModal && (
        <EditCategoryModal
          category={selectedCategory || undefined}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          onDelete={selectedCategory ? handleDelete : undefined}
        />
      )}
      {loading && <div className="loading">Загрузка...</div>}
      {!hasMore && categories.length > 0 && (
        <div className="no-more-items">Категорий больше нет</div>
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default CategoriesPage;
