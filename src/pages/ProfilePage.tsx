import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { ProtectedRoute } from '../components/ProtectedRoute';
import '../styles/ProfilePage.css';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: profile, loading } = useAppSelector((state) => state.profile);
  const { isAdmin } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <ProtectedRoute requireAuth>
      <div className="profile-page">
        <div className="profile-container">
          <h1>Профиль пользователя</h1>
          {profile && (
            <div className="profile-info">
              <img src={profile.avatar} alt="Avatar" className="avatar" />
              <div className="details">
                <p><strong>Имя:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Роль:</strong> {isAdmin ? 'Администратор' : 'Пользователь'}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};