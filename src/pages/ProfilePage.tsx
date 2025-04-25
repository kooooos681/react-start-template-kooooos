import React, { useState, useRef } from 'react';
import { useProfile } from '../hooks/useProfile';
import '../styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { profile, loading, error, updateProfile, uploadAvatar } = useProfile();
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, email });
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadAvatar(file);
      } catch (err) {
        console.error('Error uploading avatar:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error.message}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Профиль</h1>
      <div className="profile-content">
        <div className="profile-avatar" onClick={handleAvatarClick}>
          {profile?.avatar ? (
            <img src={profile.avatar} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">No avatar</div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div className="avatar-overlay">
            <span>Изменить фото</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button button-primary">
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;