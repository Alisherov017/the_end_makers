import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./register.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavbarLogin from "../../../widgets/navbar/NavbarLogin";
import Button from "../../../ui/Button/Button";
import { UserType, logo } from "../../../types";
import { useAppDispatch } from "../../../helpers/Hooks";
import { getUsers, registerUser } from "../../../store/actions/user.actions";
import { useAppSelector } from "../../helpers/hooks";

const RegisterPage = () => {
  const [user, setUser] = useState<UserType>({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user.password.length <= 5) {
      alert("Пароль должен быть больше 6 символов");
      return;
    }

    if (!user.email || !user.password || !user.password_confirm) {
      alert("Заполните все поля");
      return;
    }

    if (user.password !== user.password_confirm) {
      alert("Пароли не совпадают");
      return;
    }
    console.log("успешная регистрация");

    dispatch(registerUser(user));
    setUser({
      name: "",
      phone: "",
      email: "",
      password: "",
      password_confirm: "",
    });
    navigate("/");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <>
      <NavbarLogin />

      <div className={styles.registor}>
        <form onSubmit={handleSubmit}>
          <div>
            <img src={logo} alt="logoVK" />
          </div>
          <h1>Введите номер</h1>
          <span>
            Ваш номер телефона будет использоваться для входа в аккаунт
          </span>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            name="password_confirm"
            onChange={handleChange}
            type="password"
            placeholder="Password confirm"
          />
          <Button bg="#0077ff" color="#fff">
            Регистрация
          </Button>
          <p>
            Нажимая «Продолжить», вы принимаете пользовательское соглашение и
            политику конфиденциальности
          </p>
        </form>
        <Link to={"/"} className={styles.button_back}>
          <ArrowBackIcon />
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
