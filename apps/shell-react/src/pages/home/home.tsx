import { Header } from '../../widgets/Header/ui/Header';
import { Body } from '../../widgets/Body/ui/Body';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Body />
    </div>
  );
};
