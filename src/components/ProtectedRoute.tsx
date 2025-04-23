import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  requireAdmin = false,
}) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth);

  if (requireAuth && !isAuthenticated) {
    // Редирект на страницу логина с сохранением пути для возврата
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Редирект на главную страницу, если пользователь не админ
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 