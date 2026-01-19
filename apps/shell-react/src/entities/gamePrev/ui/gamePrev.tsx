import { useState } from "react";
import { GamePrevProps } from "../models";
import styles from "./gamePrev.module.scss";

export const GamePrev = ({ games, onValueChange }: GamePrevProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!games || games.length === 0) return null;

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1,
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === games.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleSelect = (gameTitle: string) => {
    onValueChange(gameTitle);
  };

  const currentGame = games[currentIndex];

  return (
    <div className={styles.container}>
      <button className={styles.containerArrowButton} onClick={prev}>
        {`<-`}
      </button>

      <div className={styles.containerBody}>
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`${styles.containerBodyItem} ${
              index === currentIndex
                ? styles.containerBodyItemActive
                : styles.containerBodyItemInactive
            }`}
            onClick={() => handleSelect(game.title)}
          >
            <img
              src={game.image}
              alt={game.title}
              className={styles.containerBodyItemImage}
            />
            <div className={styles.containerBodyItemTitle}>
              {game.title.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.containerArrowButton} onClick={next}>
        {`->`}
      </button>
    </div>
  );
};
