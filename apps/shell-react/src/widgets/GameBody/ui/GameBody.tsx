import React from 'react';
import styles from './GameBody.module.scss';

export const GameBody = () => {
  return (
    <div className={styles.container}>
      {/* Отступ от хедера вниз 105px */}
      <div className={styles.headerSpacer} />

      {/* Надпись в центре */}
      <h1 className={styles.gameTitle}>Sekiro Shadows Die Twice</h1>

      {/* Первый блок информации */}
      <div className={styles.gameInfoBlock}>
        <img
          src="/assets/images/sekiroBack.jpg"
          alt="Sekiro"
          className={styles.gamePoster}
        />

        <div className={styles.infoList}>
          <p className={styles.infoItem}>Рейтинг: 4.8/5</p>
          <p className={styles.infoItem}>Metacritic: 90</p>
          <p className={styles.infoItem}>Платформы: PC PS XBox</p>
          <p className={styles.infoItem}>Дата выхода: 22.03.2019</p>
          <p className={styles.infoItem}>Жанры: Action, Souls-like</p>
          <p className={styles.infoItem}>Разработчик: FromSoftware</p>
          <p className={styles.infoItem}>Издатель: Activision</p>
          <p className={styles.infoItem}>Возрастной рейтинг: Mature 17+</p>
        </div>
      </div>

      {/* Отступ 30px вниз */}
      <div className={styles.blockSpacer} />

      {/* Блок с описанием игры */}
      <div className={styles.descriptionBlock}>
        <p className={styles.descriptionText}>
          В Японии эпохи Сэнгоку, в конце XVI века, жестокое кровопролитие оставило после себя горы трупов... Бесстрашный воин и его господин связаны неразрывным долгом. Когда господина похищают, воин отправляется в опасное путешествие, чтобы отомстить.
        </p>
      </div>

      {/* Отступ 40px вниз */}
      <div className={styles.featuresSpacer} />

      {/* Заголовки Ключевые особенности и Статистика игры */}
      <div className={styles.featuresHeader}>
        <h2 className={styles.featuresTitleLeft}>Ключевые особенности</h2>
        <h2 className={styles.featuresTitleRight}>Статистика игры</h2>
      </div>

      {/* Отступ 30px вниз */}
      <div className={styles.featuresSpacerSmall} />

      {/* Два блока рядом */}
      <div className={styles.featuresBlocks}>
        {/* Левый блок */}
        <div className={styles.featureBlock}>
          <div className={styles.featureList}>
            <p className={styles.featureItem}>Posture боевая система</p>
            <p className={styles.featureItem}>Феодальная Япония</p>
            <p className={styles.featureItem}>Механика возрождения</p>
            <p className={styles.featureItem}>Стиль шиноби</p>
          </div>
        </div>

        {/* Правый блок */}
        <div className={styles.featureBlock}>
          <div className={styles.featureList}>
            <p className={styles.featureItem}>Время прохождения: 30 часов</p>
            <p className={styles.featureItem}>Скриншоты: 45</p>
            <p className={styles.featureItem}>Достижения: 34</p>
            <p className={styles.featureItem}>Оценок: 15 820</p>
          </div>
        </div>
      </div>

      {/* Отступ 40px вниз */}
      <div className={styles.nextBlockSpacer} />

      {/* Большая картинка-карусель 16:10 */}
      <div className={styles.carouselBlock}>
        <img
          src="/assets/images/sekiroMain.jpg" // ← замени на свою главную картинку
          alt="Sekiro gameplay"
          className={styles.carouselImage}
        />

        {/* Стрелки карусели (как на главной) */}
        <button className={`${styles.carouselNav} ${styles.left}`}>
          <ChevronLeftSvg />
        </button>
        <button className={`${styles.carouselNav} ${styles.right}`}>
          <ChevronRightSvg />
        </button>
      </div>

      {/* Отступ 20px вниз */}
      <div className={styles.carouselSpacer} />

      {/* 5 маленьких картинок */}
      <div className={styles.smallImages}>
        <img src="/assets/images/rec1.jpg" alt="Screenshot 1" className={styles.smallImage} />
        <img src="/assets/images/rec2.jpg" alt="Screenshot 2" className={styles.smallImage} />
        <img src="/assets/images/fc26.jpg" alt="Screenshot 3" className={styles.smallImageCentral} />
        <img src="/assets/images/rec4.jpg" alt="Screenshot 4" className={styles.smallImage} />
        <img src="/assets/images/rec5.jpg" alt="Screenshot 5" className={styles.smallImage} />
      </div>

      {/* Отступ 40px вниз */}
      <div className={styles.systemSpacer} />

      {/* Надпись "Системные требования (PC)" */}
      <h2 className={styles.systemTitle}>Системные требования (PC)</h2>

      {/* Отступ 30px вниз */}
      <div className={styles.systemSpacerSmall} />

      {/* Два блока системных требований */}
      <div className={styles.systemBlocks}>
        {/* Левый блок — Минимальные */}
        <div className={styles.systemBlock}>
          <p className={styles.systemItem}>Минимальные:</p>
          <p className={styles.systemItem}>OS: Windows 7/8/10</p>
          <p className={styles.systemItem}>CPU: intel i3-2100</p>
          <p className={styles.systemItem}>RAM: 4GB</p>
          <p className={styles.systemItem}>GPU: GTX 760</p>
        </div>

        {/* Правый блок — Рекомендованные */}
        <div className={styles.systemBlock}>
          <p className={styles.systemItem}>Рекомендованные:</p>
          <p className={styles.systemItem}>OS: Windows 7/8/10</p>
          <p className={styles.systemItem}>CPU: intel i5-2500K</p>
          <p className={styles.systemItem}>RAM: 8GB</p>
          <p className={styles.systemItem}>GPU: GTX 970</p>
        </div>
      </div>

      {/* Отступ 100px вниз */}
      <div className={styles.similarSpacer} />

      {/* Надпись "Похожие игры" */}
      <h2 className={styles.similarTitle}>Похожие игры</h2>

      {/* Отступ 50px вниз */}
      <div className={styles.similarSpacerSmall} />

      {/* Карусель из 5 картинок */}
      <div className={styles.similarCarousel}>
        <img src="/assets/images/rec1.jpg" alt="Похожая игра 1" className={styles.similarImage} />
        <img src="/assets/images/rec2.jpg" alt="Похожая игра 2" className={styles.similarImage} />
        <img src="/assets/images/fc26.jpg" alt="Похожая игра 3" className={styles.similarImageCentral} />
        <img src="/assets/images/rec4.jpg" alt="Похожая игра 4" className={styles.similarImage} />
        <img src="/assets/images/rec5.jpg" alt="Похожая игра 5" className={styles.similarImage} />
      </div>

      {/* Отступ 60px вниз */}
      <div className={styles.postsSpacer} />

      {/* Надпись "Последние посты" */}
      <h2 className={styles.postsTitle}>Последние посты</h2>

      {/* Отступ 60px вниз */}
      <div className={styles.postsSpacerSmall} />

      {/* Блок рецензий (тот же, что на главной) */}
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
    </div>
  );
};

// Компонент карточки поста (перенесён сюда для полноты)
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

// SVG-иконки (стрелки карусели — те же, что на главной)
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