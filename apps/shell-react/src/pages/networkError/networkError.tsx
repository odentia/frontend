import { Button } from "@ui/dist";
import styles from "./netwrokError.module.scss";
import { useApi } from "@config-runtime/dist";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const NetworkError = () => {

    const api = useApi();
    const healthCheck = api.useApiQuery({key: ["health"], path: "health"});
    const navigate = useNavigate();

    useEffect(() => {
        if (healthCheck.data) navigate("/")
        else healthCheck.refetch()
    }, [healthCheck.data, navigate])

    return (
        <div className={styles.container}>
            <span className={styles.containerSpan}>{healthCheck.isPending ? "Проверка соединения" : "Увы, что-то не так с сервером"}</span>
            <span className={styles.containerSpan}>{healthCheck.error?.message}</span>
        </div>
    )
}