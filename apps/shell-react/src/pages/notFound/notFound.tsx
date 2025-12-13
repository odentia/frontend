import { Button } from "@ui";
import styles from "./notFound.module.scss";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <span className={styles.containerText}>404, Страница не найдена</span>
      <Button
        text="На главную"
        width="150px"
        height="40px"
        borderRadius="10px"
        color="var(--attention)"
        onClick={handleClick}
      />
    </div>
  );
};
