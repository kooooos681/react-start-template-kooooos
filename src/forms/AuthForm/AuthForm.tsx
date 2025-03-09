import React from 'react';
import { useForm } from 'react-hook-form';
import './AuthForm.css';

interface AuthFormData {
  email: string;
  password: string;
}

export const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>();

  const onSubmit = (data: AuthFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <form className="auth-form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-field-center">
          <label className="auth-label">Email</label>
          <input
            className="auth-input-field"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email' },
            })}
          />
          {errors.email && <span className="auth-error">{errors.email.message}</span>}
        </div>
        <div className="auth-field-center">
          <label className="auth-label">Password</label>
          <input
            type="password"
            className="auth-input-field"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          {errors.password && <span className="auth-error">{errors.password.message}</span>}
        </div>
        <button type="submit" className="auth-submit-button">Login / Register</button>
      </form>
    </div>
  );
};