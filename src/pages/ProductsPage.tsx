import "../styles/ProductsPage.css";
import React, { useState, useRef, useEffect } from 'react';
import '../styles/common.css';
import editButton from 'src/icons/edit_button.svg';
import EditProductModal, { EditedItem } from "src/components/product/EditProductModal";
import { CreateProductInput, UpdateProductInput, useProducts } from "src/hooks/useProducts";
import { useBasket } from "../hooks/useBasket";

export interface Item {
  id: string;
  name: string;
  price: number;
  desc: string;
  photo: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    photo?: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ProductsPage: React.FC = () => {

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { products, loading, error, createProduct, updateProduct, deleteProduct, loadMore, hasMore } = useProducts(20);
  const { addToBasket } = useBasket();
  const [showModalAddProduct, setShowModalAddProduct] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
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

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowModalDetail(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModalDetail(false);
  };

  const handleButtonAdd = () => {
    setSelectedItem(null);
    setShowModalAddProduct(true);
  }

  const handleItemEdit = (item: Item) => {
    setSelectedItem(item);
    setShowModalAddProduct(true);
  };

  const handleAdd = (item: EditedItem) => {
    const newProduct: CreateProductInput = {
      name: item.name,
      desc: item.desc,
      price: item.price,
      photo: item.photo,
      categoryId: item.categoryId,
    }
    createProduct(newProduct);
  };

  const handleUpdate = (item: EditedItem) => {
    const updProduct: UpdateProductInput = {
      name: item.name,
      desc: item.desc,
      price: item.price,
      photo: item.photo,
      categoryId: item.categoryId,
    }
    updateProduct(selectedItem.id, updProduct);
  };

  const handleDelete = () => {
    deleteProduct(selectedItem.id);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="products-header">
        <h1 className="products-title">Товары</h1>
        <div className="products-actions">
          <button className="button button-success" onClick={handleButtonAdd} aria-label="Добавить товар">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="14" y="6" width="4" height="20" rx="2" fill="white"/>
              <rect x="6" y="14" width="20" height="4" rx="2" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="itemList">
        <ul className="itemListItems">
          {products.map((item) => (
            <li key={item.id} className="itemListItem">
              <img src={item.photo} alt={item.name} className="itemImage" />
              <div className="itemContent">
                <h3 className="itemTitle">{item.name}</h3>
                <p className="itemPrice">{item.price} ₽</p>
                <p className="itemDescription">{item.desc}</p>
                <p className="itemCategory">{item.category?.name}</p>
                <div className="itemActions">
                  <button className="button button-primary button-image" onClick={() => handleItemClick(item)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <rect x="9" y="8" width="2" height="6" rx="1" fill="currentColor"/>
                      <rect x="9" y="5" width="2" height="2" rx="1" fill="currentColor"/>
                    </svg>
                  </button>
                  <button 
                    className="button button-primary button-image" 
                    onClick={() => addToBasket(item)}
                    aria-label="В корзину"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM0 0V2H2L5.6 9.59L4.25 12.04C4.09 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.5C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <button className="button button-primary button-image" onClick={() => handleItemEdit(item)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Observer target */}
        {hasMore && <div ref={observerTarget} style={{ height: '20px', margin: '20px 0' }}></div>}

        {selectedItem && showModalDetail && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedItem.photo} alt={selectedItem.name} className="modalImage" />
              <h2 className="modalTitle">{selectedItem.name}</h2>
              <p className="modalDescription">{selectedItem.desc}</p>
              <p className="modalPrice">{selectedItem.price} ₽</p>
              <p className="modalCategory">{selectedItem.category?.name}</p>
              <div className="modalActions">
                <button className="button button-primary" onClick={handleCloseModal}>
                  Закрыть
                </button>
                <button
                  className="button button-success"
                  onClick={() => {
                    addToBasket(selectedItem);
                    handleCloseModal();
                  }}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        )}

        {showModalAddProduct && selectedItem == null &&
          <EditProductModal onSave={handleAdd} onClose={() => setShowModalAddProduct(false)} />}

        {showModalAddProduct && selectedItem &&
          <EditProductModal product={selectedItem} onSave={handleUpdate} onClose={() => setShowModalAddProduct(false)} onDelete={handleDelete} />}

        {loading && <div className="loading">Загрузка...</div>}
        {!hasMore && products.length > 0 && (
          <div className="no-more-items">Товаров больше нет</div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;