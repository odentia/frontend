import { useState } from "react";
import { Container } from "../shared/container";
import { useApi } from "@config-runtime";
import { useNavigate } from "react-router-dom";

interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUp = () => {
  const api = useApi();

  const navigate = useNavigate();

  const registerMutation = api.useApiMutation<
    { name: string; email: string; password: string },
    any
  >("/auth-api/api/v1/auth/register", "post");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<ErrorType>({});

  const handleClick = () => {
    const newErrors: ErrorType = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Поле не может быть пустым";

    if (!email.trim()) newErrors.email = "Введите почту";
    else if (!emailRegex.test(email))
      newErrors.email = "Некорректный формат почты";

    if (!password || password.length < 6)
      newErrors.password = "Пароль должен быть больше 6 символов";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          navigate("/");
        },
        onError: (err: any) => {
          const message =
            err.response?.data?.detail ??
            err.response?.data?.message ??
            "Неизвестная ошибка";
          setErrors({ password: message });
        },
      },
    );
  };

  const inputs = [
    {
      value: name,
      setValue: (str: string) => {
        setName(str);
        if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
      },
      error: errors.name,
      placeholder: "Логин",
    },
    {
      value: email,
      setValue: (str: string) => {
        setEmail(str);
        if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
      },
      error: errors.email,
      placeholder: "Почта",
    },
    {
      value: password,
      setValue: (str: string) => {
        setPassword(str);
        if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
      },
      error: errors.password,
      placeholder: "Пароль",
      isPassword: true,
    },
    {
      value: confirmPassword,
      setValue: (str: string) => {
        setConfirmPassword(str);
        if (errors.confirmPassword)
          setErrors((p) => ({ ...p, confirmPassword: undefined }));
      },
      error: errors.confirmPassword,
      placeholder: "Повторите пароль",
      isPassword: true,
    },
  ];

  return (
    <Container
      inputs={inputs}
      title="Зарегистрироваться"
      subtitle="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      buttonClick={handleClick}
      footerText="Уже есть аккаунт?"
      footerLink="  Войти"
      loading={registerMutation.isPending}
      link="/auth/login"
    />
  );
};
