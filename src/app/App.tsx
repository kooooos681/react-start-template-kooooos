import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import ProductsPage from '../pages/ProductsPage';
import BasketPage from '../pages/BasketPage';
import ModalPage from '../pages/ModalPage';
import RegisterPage from '../pages/RegisterPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-left">
              <Link to="/" className={isActive('/')}>
                Главная
              </Link>
              <Link to="/products" className={isActive('/products')}>
                Товары
              </Link>
              <Link to="/basket" className={isActive('/basket')}>
                Корзина
              </Link>
            </div>
            <div className="nav-right">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className={isActive('/profile')}>
                    Профиль
                  </Link>
                  {isAdmin && (
                    <Link to="/modal" className={isActive('/modal')}>
                      Редактировать товары
                    </Link>
                  )}
                  <button onClick={handleLogout} className="nav-button">
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={isActive('/login')}>
                    Войти
                  </Link>
                  <Link to="/register" className={isActive('/register')}>
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="main">
          <div className="main-container">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};
