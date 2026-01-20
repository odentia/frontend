import { useState } from "react";
import { Container } from "../shared/container";
import { useApi } from "@config-runtime";
import { useNavigate } from "react-router-dom";

interface ErrorType {
  name?: string;
  password?: string;
}

export const Login = () => {
  const api = useApi().useApiMutation("/auth-api/api/v1/auth/login");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<ErrorType>({
    name: undefined,
    password: undefined,
  });

  const handleClick = () => {
    const newErrors: ErrorType = {};

    const email = name.trim();

    if (!email) newErrors.name = "Поле не может быть пустым";
    if (!password || password.length < 6)
      newErrors.password = "Пароль должен быть больше 6 символов";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    api.mutate(
      { email, password },
      {
        onSuccess: (data) => navigate("/"),
        onError: (err: any) => {
          const message =
            err.response?.data?.detail ??
            err.response?.data?.message ??
            "Неизвестная ошибка";
          setErrors({ name: undefined, password: message });
        },
      },
    );
  };

  const inputs = [
    {
      value: name,
      setValue: (str: string) => {
        setName(str);
        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
      },
      error: errors.name,
      placeholder: "Почта",
    },
    {
      value: password,
      setValue: (str: string) => {
        setPassword(str);
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
      loading={api.isPending}
      footerText="Нет аккаунта?"
      footerLink="  Зарегистрироваться"
      link="/auth/signup"
    />
  );
};
