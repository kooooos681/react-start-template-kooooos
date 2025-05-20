import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import BasketPage from '../pages/BasketPage';
import ModalPage from '../pages/ModalPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ErrorBoundary from '../components/ErrorBoundary';
import { ProfilePage } from '../pages/ProfilePage';
import './App.css';
import CategoriesPage from '../pages/CategoriesPage';
import RegisterPage from "src/pages/RegisterPage";
import OrdersPage from '../pages/OrdersPage';

// SVG Icons
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CategoriesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BasketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OrdersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShopLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 8v16l14 6 14-6V8L16 2z" fill="var(--shop-primary)"/>
    <path d="M16 6l-8 3.5v9l8 3.5 8-3.5v-9L16 6z" fill="white"/>
    <path d="M12 12l4 1.75 4-1.75M12 15l4 1.75 4-1.75" stroke="var(--shop-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
              <Link to="/" className="logo">
                <ShopLogo />
                Shop
              </Link>
              <Link to="/" className={isActive('/')}>
                <HomeIcon />
                Главная
              </Link>
              <Link to="/categories" className={isActive('/categories')}>
                <CategoriesIcon />
                Категории
              </Link>
              <Link to="/basket" className={isActive('/basket')}>
                <BasketIcon />
                Корзина
              </Link>
              {isAuthenticated && (
                <Link to="/orders" className={isActive('/orders')}>
                  <OrdersIcon />
                  Заказы
                </Link>
              )}
            </div>
            <div className="nav-right">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className={isActive('/profile')}>
                    <ProfileIcon />
                    Профиль
                  </Link>
                  {isAdmin && (
                    <Link to="/modal" className={isActive('/modal')}>
                      <EditIcon />
                      Редактировать товары
                    </Link>
                  )}
                  <button onClick={handleLogout} className="nav-button">
                    <LogoutIcon />
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={isActive('/login')}>
                    <ProfileIcon />
                    Войти
                  </Link>
                  <Link to="/register" className={isActive('/register')}>
                    <ProfileIcon />
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
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route
                path="/modal"
                element={
                  <ProtectedRoute requireAdmin>
                    <ModalPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/" element={<ProductsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};
