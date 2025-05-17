import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useProfile } from '../hooks/useProfile';
import { ProtectedRoute } from '../components/ProtectedRoute';
import '../styles/ProfilePage.css';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const {
    profile,
    loading,
    error,
    updateProfile,
    updateLoading,
    updateError,
    changePassword,
    passwordLoading,
    passwordError,
    passwordSuccess,
  } = useProfile();
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (editMode) {
      setEditName(profile?.name ?? '');
    }
  }, [profile, editMode]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile(editName);
    if (ok) setEditMode(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword(oldPassword, newPassword);
    if (!passwordError) {
      setShowPasswordModal(false);
      setOldPassword('');
      setNewPassword('');
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <ProtectedRoute requireAuth>
      <div className="profile-page">
        <div className="profile-container">
          <h1 className="profile-title">Профиль пользователя</h1>
          {profile && (
            <div className="profile-info">
              <div className="details">
                <p><strong>Имя:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Роль:</strong> {isAdmin ? 'Администратор' : 'Пользователь'}</p>
                <p><strong>Команда:</strong> {profile.commandId || '—'}</p>
                <p><strong>Дата регистрации:</strong> {profile.signUpDate ? new Date(profile.signUpDate).toLocaleDateString() : '—'}</p>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button 
                  className="button button-primary" 
                  onClick={() => setEditMode(true)}
                >
                  Редактировать профиль
                </button>
                <button 
                  className="button" 
                  onClick={() => setShowPasswordModal(true)}
                >
                  Сменить пароль
                </button>
                <button 
                  className="button button-danger" 
                  onClick={handleLogout}
                >
                  Выйти из профиля
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Модалка редактирования профиля */}
        {editMode && (
          <div className="modal-overlay">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <h2 className="modal-title">Редактировать профиль</h2>
              <div className="form-group">
                <label htmlFor="editName">Имя</label>
                <input
                  id="editName"
                  className="input"
                  value={editName ?? ''}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
              </div>
              {updateError && <div className="error">{updateError}</div>}
              <div className="modal-actions">
                <button type="submit" className="button button-success" disabled={updateLoading}>
                  Сохранить
                </button>
                <button type="button" className="button" onClick={() => setEditMode(false)}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Модалка смены пароля */}
        {showPasswordModal && (
          <div className="modal-overlay">
            <form className="modal-content" onSubmit={handlePasswordSubmit}>
              <h2 className="modal-title">Сменить пароль</h2>
              <div className="form-group">
                <label htmlFor="oldPassword">Старый пароль</label>
                <input
                  id="oldPassword"
                  className="input"
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Новый пароль</label>
                <input
                  id="newPassword"
                  className="input"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <div className="error">{passwordError}</div>}
              {passwordSuccess && <div className="success">Пароль успешно изменён</div>}
              <div className="modal-actions">
                <button type="submit" className="button button-success" disabled={passwordLoading}>
                  Сохранить
                </button>
                <button type="button" className="button" onClick={() => setShowPasswordModal(false)}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};