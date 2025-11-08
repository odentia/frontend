import { useRef, useState } from "react";
import { Container } from "../shared/container";
import { useApi } from "@config-runtime";

interface ErrorType {
  name?: string;
  password?: string;
}

export const Login = () => {
  const api = useApi();

  const loginMutation = api.useApiMutation<{ name: string; password: string }>(
    "auth/login",
    "post",
  );

  const nameRef = useRef("");
  const passwordRef = useRef("");

  const [errors, setErrors] = useState<ErrorType>({
    name: undefined,
    password: undefined,
  });

  const handleClick = () => {
    const newErrors: ErrorType = {};

    const name = nameRef.current.trim();
    const password = passwordRef.current;

    if (!name) newErrors.name = "Поле не может быть пустым";
    if (!password || password.length < 6)
      newErrors.password = "Пароль должен быть больше 6 символов";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    loginMutation.mutate(
      { name, password },
      {
        onSuccess: (data) => {
          console.log("[login] success:", data);
        },
        onError: (err: any) => {
          console.log("[login] error:", err);
          const message =
            err.response?.data?.detail ??
            err.response?.data?.message ??
            "Неизвестная ошибка";
          setErrors({
            name: undefined,
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
        passwordRef.current = str;
        if (errors.password)
          setErrors((prev) => ({ ...prev, password: undefined }));
      },
      error: errors.password,
      placeholder: "Пароль",
      isPassword: true,
    },
  ];

  return (
    <Container
      inputs={inputs}
      title="Войти в аккаунт"
      subtitle="С возвращением!"
      buttonText="Войти"
      buttonClick={handleClick}
      loading={loginMutation.isPending}
      footerText="Нет аккаунта?"
      footerLink="  Зарегистрироваться"
      link="/auth/signup"
    />
  );
};
