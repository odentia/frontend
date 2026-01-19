import React from 'react';
import { CategoryButton } from '../../../shared/ui/CategoryButton';
import styles from './Body.module.scss';

export const Body = () => {
  const recommendations = [
    { id: 1, src: '/assets/images/rec1.jpg', alt: 'Рекомендация 1' },
    { id: 2, src: '/assets/images/rec2.jpg', alt: 'Рекомендация 2' },
    { id: 3, src: '/assets/images/fc26.jpg', alt: 'FC 26 (центральная)' },
    { id: 4, src: '/assets/images/rec4.jpg', alt: 'Рекомендация 4' },
    { id: 5, src: '/assets/images/rec5.jpg', alt: 'Рекомендация 5' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sloganWrapper}>
        <h1 className={styles.slogan}>Очень крутой слоган</h1>
      </div>

      <div className={styles.searchContainer}>
        <label htmlFor="search-input" className={styles.searchLabel}>
          поиск
        </label>
        <input
          id="search-input"
          type="text"
          className={styles.searchInput}
          placeholder="Введите запрос"
        />
      </div>

      <div className={styles.categoriesContainer}>
        <CategoryButton icon="puzzle" text="Головоломки" />
        <CategoryButton icon="puzzle" text="Категория 2" />
        <CategoryButton icon="puzzle" text="Категория 3" />
        <CategoryButton icon="puzzle" text="Категория 4" />
        <CategoryButton icon="puzzle" text="Категория 5" />
        <CategoryButton icon="puzzle" text="Категория 6" />
      </div>

      <div className={styles.popularPostsSection}>
        <h2 className={styles.sectionTitle}>самые популярные публикации</h2>

        <div className={styles.postsAndGameContainer}>
          <div className={styles.postsContainer}>
            <PostCard />
            <PostCard />
          </div>

          <div className={styles.gameImageContainer}>
            <img
              src="/assets/images/sekiroBack.jpg"
              alt="Sekiro background (blurred)"
              className={styles.gameBgImage}
            />
            <img
              src="/assets/images/sekiroFront.jpg"
              alt="Sekiro foreground"
              className={styles.gameOverlayImage}
            />
            <button className={`${styles.navButton} ${styles.left}`}>
              <ChevronLeftSvg />
            </button>
            <button className={`${styles.navButton} ${styles.right}`}>
              <ChevronRightSvg />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.recommendationsSection}>
        <h2 className={styles.recommendationsTitle}>Специально для вас</h2>

        <div className={styles.recommendationsGrid}>
          {recommendations.map((rec, index) => (
            <img
              key={rec.id}
              src={rec.src}
              alt={rec.alt}
              className={
                index === 2 
                  ? `${styles.recImage} ${styles.central}` 
                  : styles.recImage
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PostCard = () => (
  <div className={styles.postCard}>
    <div className={styles.postHeader}>
      <div className={styles.avatar} />
      <span className={styles.username}>User234102</span>
    </div>
    <h3 className={styles.postTitle}>Loren ipsum dolor sit amet</h3>
    <p className={styles.postText}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi nibh, faucibus nec auctor a, convallis vel nisl. Integer molestie mi sed aliquet condimentum. Aliquam aliquet libero sit amet ligula laoreet, sed luctus purus eleifend. Mauris bibendum felis finibus quam finibus, sed dignissim sem lobortis. Phasellus sit amet ligula mi. Vivamus eget leo eget quam porta ultrices id at enim. Sed vestibulum, dolor in tempor euismod, mi purus pulvinar odio, sed pellentesque augue tellus sed purus...
    </p>
    <div className={styles.postFooter}>
      <div className={styles.votesBlock}>
        <ChevronUpSvg color="#272A33" />
        <span className={styles.voteDiff}>+15</span>
        <ChevronDownSvg color="#272A33" />
      </div>
      <div className={styles.commentsBlock}>
        <CommentBubbleSvg />
        <span className={styles.commentsCount}>245</span>
      </div>
    </div>
    <div className={styles.hashtags}>
      <span className={styles.hashtag}>#гайд</span>
      <span className={styles.hashtag}>#абуз</span>
    </div>
  </div>
);

const ChevronUpSvg = ({ color = '#272A33' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5L15 10H5L10 5Z" fill={color} />
  </svg>
);

const ChevronDownSvg = ({ color = '#272A33' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15L5 10H15L10 15Z" fill={color} />
  </svg>
);

const CommentBubbleSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H8L12 22L16 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
      stroke="#272A33"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeftSvg = () => (
  <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 1.5L2 11.5L11.5 21.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightSvg = () => (
  <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5L11 11.5L1.5 21.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);