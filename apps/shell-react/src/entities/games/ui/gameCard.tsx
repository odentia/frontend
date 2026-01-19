import { useNavigate } from "react-router";
import { GamePrev } from "../models";
import styles from "./gameCard.module.scss";

export const GameCard = ({ background_image, name, id }: GamePrev) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <img src={background_image} alt="image" className={styles.containerImage} />
      <span className={styles.containerTitle}>{name}</span>
    </div>
  );
};
