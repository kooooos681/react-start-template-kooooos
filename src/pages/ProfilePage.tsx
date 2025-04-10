import React from "react";
import { useForm } from "react-hook-form";
import "../styles/ProfilePage.css";

const ProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Profile Updated", data);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Профиль пользователя</h1>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Имя:</label>
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <span className="error">Это поле обязательно</span>}

        <label>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Введите корректный email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email"
            }
          })}
        />
        {errors.email && <span className="error">Некорректный e-mail</span>}

        <label>Телефон:</label>
        <input
          type="tel"
          {...register("phone", {
            required: "Введите телефон",
            pattern: {
              value: /^\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
              message: "Формат: +7 999 123 45 67"
            }
          })}
        />
        {errors.phone && <span className="error">Некорректный телефон</span>}

        <label>Адрес:</label>
        <input type="text" {...register("address", { required: true })} />
        {errors.address && <span className="error">Это поле обязательно</span>}

        <label>Дата рождения:</label>
        <input type="date" {...register("birthdate", { required: true })} />
        {errors.birthdate && <span className="error">Выберите дату</span>}

        <label>Номер карты лояльности:</label>
        <input
          type="text"
          {...register("loyaltyCard", {
            required: "Введите номер карты",
            pattern: {
              value: /^\d{4}-\d{4}-\d{4}$/,
              message: "Формат: 1234-5678-9012"
            }
          })}
        />
        {errors.loyaltyCard && <span className="error">Некорректный номер карты лояльности</span>}

        <button type="submit" className="save-button">Сохранить</button>
      </form>
    </div>
  );
};

export default ProfilePage;