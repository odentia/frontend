import { useCallback, useMemo, useState } from "react";
import { Container } from "../shared/container";
import { useApi } from "@config-runtime"
import { useNavigate } from "react-router-dom";


interface ErrorType {
    name: string | undefined;
    password: string | undefined;
}

export const Login = () => {

    const nav = useNavigate()

    const handleRedirect = () => {
        nav("/auth/signup")
    }

    const api = useApi()

    const loginMutation = api.useApiMutation<{name: string, password: string}>("auth/login", "post")

    const handleClick = () => {

        const newErrors: ErrorType = {name: undefined, password: undefined};
        
        if (name.length === 0) newErrors.name = "Поле не может быть пустым";
        if (password.length < 6) newErrors.password = "Пароль должен быть больше 6 символов";
        
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);

        loginMutation.mutate(
            { name, password },
            {
                onSuccess: (data) => {
                    console.log("[login] success:", data);
                    setLoading(false);
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
                    setLoading(false);
            },
            },
        );
    }

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorType>({name: undefined, password: undefined});
    const [loading, setLoading] = useState(false);

      const inputs = useMemo(
            () => [
            {
                value: name,
                setValue: setName,
                error: errors.name,
                placeholder: "Логин",
            },
            {
                value: password,
                setValue: setPassword,
                error: errors.password,
                placeholder: "Пароль",
                isPassword: true,
            },
            ],
            [name, password, errors.name, errors.password]
        );

    const handleLogin = useCallback(() => {
    console.log("Hello World!");
  }, []);

    return (
        <Container
            inputs={inputs}
            title="Войти в аккаунт"
            subtitle="С возвращением!"
            buttonText="Войти"
            buttonClick={handleClick}
            loading={loading}
            footerText="Нет аккаунта?"
            footerLink="  Зарегистрироваться"
            linkClick={handleRedirect}
        >
        </Container>
    )
}