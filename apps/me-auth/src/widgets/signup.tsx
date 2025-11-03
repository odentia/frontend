import { useCallback, useMemo, useState } from "react";
import { Container } from "../shared/container";
import { useApi } from "@config-runtime";
import { useNavigate } from "react-router-dom"

interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUp = () => {
  const api = useApi();

  const nav = useNavigate()

  const handleRedirect = () => {
    nav("/auth/login")
  }

  const registerMutation = api.useApiMutation<
    { name: string; email: string; password: string },
    any
  >("auth/register", "post");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const newErrors: ErrorType = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Поле не может быть пустым";

    if (!email.trim()) newErrors.email = "Введите почту";
    else if (!emailRegex.test(email))
      newErrors.email = "Некорректный формат почты";

    if (!password.trim() || password.length < 6)
      newErrors.password = "Пароль должен быть больше 6 символов";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          console.log("[signup] success:", data);
          setLoading(false);
        },
        onError: (err: any) => {
          console.log("[signup] error:", err);
          const message =
            err.response?.data?.detail ??
            err.response?.data?.message ??
            "Неизвестная ошибка";
          setLoading(false);
          setErrors({
            password: message,
          });
        },
      }
    );
  };

  const inputs = useMemo(
    () => [
      {
        value: name,
        setValue: setName,
        error: errors.name,
        placeholder: "Логин",
      },
      {
        value: email,
        setValue: setEmail,
        error: errors.email,
        placeholder: "Почта",
      },
      {
        value: password,
        setValue: setPassword,
        error: errors.password,
        placeholder: "Пароль",
        isPassword: true,
      },
      {
        value: confirmPassword,
        setValue: setConfirmPassword,
        error: errors.confirmPassword,
        placeholder: "Повторите пароль",
        isPassword: true,
      },
    ],
    [name, email, password, confirmPassword, errors]
  );

  const handleSignUp = useCallback(() => {
    console.log("Регистрация...");
  }, []);

  return (
    <Container
      inputs={inputs}
      title="Зарегистрироваться"
      subtitle="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      buttonClick={handleClick}
      footerText="Уже есть аккаунт?"
      footerLink="  Войти"
      loading={loading}
      linkClick={handleRedirect}
    />
  );
};
