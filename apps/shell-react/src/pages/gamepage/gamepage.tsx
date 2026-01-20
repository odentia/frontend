import { Header } from '../../widgets/Header/ui/Header';
import { GameBody } from '../../widgets/GameBody/ui/GameBody';
import styles from './gamepage.module.scss';

export const GamePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <GameBody />
    </div>
  );
};