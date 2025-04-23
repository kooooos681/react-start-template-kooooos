import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import LoginPage from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import ProductsPage from '../pages/ProductsPage';
import BasketPage from '../pages/BasketPage';
import ModalPage from '../pages/ModalPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import './App.css';

export const App: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/products">Товары</Link>
        <Link to="/basket">Корзина</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile">Профиль</Link>
            {isAdmin && <Link to="/modal">Редактировать товары</Link>}
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </nav>

      <main className="main">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requireAuth>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route
            path="/modal"
            element={
              <ProtectedRoute requireAdmin>
                <ModalPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Главная страница</div>} />
        </Routes>
      </main>
    </div>
  );
};
