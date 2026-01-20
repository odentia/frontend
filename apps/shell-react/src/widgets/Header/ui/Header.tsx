import React from 'react';
import { Button } from '../../../shared/ui/Button';
import styles from './Header.module.scss';

export const Header = () => {
  const handlePublicationsClick = () => console.log('Publications clicked');
  const handleRecommendationsClick = () => console.log('Recommendations clicked');
  const handleFriendsClick = () => console.log('Friends clicked');
  const handleLoginClick = () => console.log('Login clicked');

  return (
    <div className={styles.page}>
      <div className={styles['buttons-container']}>
        <div className={styles['buttons-group']}>
          <Button onClick={handlePublicationsClick}>Публикации</Button>
          <Button onClick={handleRecommendationsClick}>Рекомендации</Button>
          <Button onClick={handleFriendsClick}>Друзья</Button>
        </div>
        <Button
          onClick={handleLoginClick}
          className={styles['login-button']}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};