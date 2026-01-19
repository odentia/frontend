import React from 'react';
import styles from './CategoryButton.module.scss';

const PuzzleSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8C7EFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19.44 9.03l-1.75-1.75a1.85 1.85 0 0 1 0-2.62l1.62-1.62a1 1 0 0 0 .29-.94 9.25 9.25 0 0 0-7-7 1 1 0 0 0-.71.29L9.82 3.41a1.85 1.85 0 0 1-2.62 0L5.45 5.16a1.85 1.85 0 0 1 0 2.62l-1.62 1.62a1 1 0 0 0-.29.71 9.25 9.25 0 0 0 7 7 1 1 0 0 0 .94-.29l1.62-1.62a1.85 1.85 0 0 1 2.62 0l1.75 1.75a1.85 1.85 0 0 1 0 2.62l1.62 1.62a1 1 0 0 0 .71.29 9.25 9.25 0 0 0 7-7 1 1 0 0 0-.29-.94l-1.62-1.62a1.85 1.85 0 0 1 0-2.62z" />
  </svg>
);

interface CategoryButtonProps {
  text: string;
  icon: string;
  onClick?: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {icon === 'puzzle' && <div className={styles.icon}><PuzzleSvg /></div>}
      <span className={styles.text}>{text}</span>
    </button>
  );
};