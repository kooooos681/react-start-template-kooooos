import React from 'react';
import { useForm } from 'react-hook-form';
import './WestCoastStyle.css';

interface ProfileFormData {
  username: string;
  email: string;
}

export const ProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="westcoast-vibes">
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label className="form-label">Имя пользователя </label>
          <input
            className="form-input"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <span className="form-error">{errors.username.message}</span>}
        </div>
        <div className="form-field">
          <label className="form-label">Email </label>
          <input
            className="form-input"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email' },
            })}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>
        <button type="submit" className="form-button">Save Profile</button>
      </form>
    </div>
  );
};
