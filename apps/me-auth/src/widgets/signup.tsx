import { useRef, useState } from "react";
import { Container } from "../shared/container";
import { useApi } from "@config-runtime";

interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUp = () => {
  const api = useApi();

  const registerMutation = api.useApiMutation<
    { name: string; email: string; password: string },
    any
  >("auth/register", "post");

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const [errors, setErrors] = useState<ErrorType>({});

  const handleClick = () => {
    const newErrors: ErrorType = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRef.current.trim()) newErrors.name = "Поле не может быть пустым";

    if (!emailRef.current.trim()) newErrors.email = "Введите почту";
    else if (!emailRegex.test(emailRef.current))
      newErrors.email = "Некорректный формат почты";

    if (!passwordRef.current.trim() || passwordRef.current.length < 6)
      newErrors.password = "Пароль должен быть больше 6 символов";

    if (passwordRef.current !== confirmPasswordRef.current)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    registerMutation.mutate(
      {
        name: nameRef.current,
        email: emailRef.current,
        password: passwordRef.current,
      },
      {
        onSuccess: (data) => {
          console.log("[signup] success:", data);
        },
        onError: (err: any) => {
          console.log("[signup] error:", err);
          const message =
            err.response?.data?.detail ??
            err.response?.data?.message ??
            "Неизвестная ошибка";
          setErrors({
            password: message,
          });
        },
      },
    );
  };

  const inputs = [
    {
      setValue: (str: string) => {
        nameRef.current = str;
        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
      },
      error: errors.name,
      placeholder: "Логин",
    },
    {
      setValue: (str: string) => {
        emailRef.current = str;
        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
      },
      error: errors.email,
      placeholder: "Почта",
    },
    {
      setValue: (str: string) => {
        passwordRef.current = str;
        if (errors.password)
          setErrors((prev) => ({ ...prev, password: undefined }));
      },
      error: errors.password,
      placeholder: "Пароль",
      isPassword: true,
    },
    {
      setValue: (str: string) => {
        confirmPasswordRef.current = str;
        if (errors.confirmPassword)
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
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
