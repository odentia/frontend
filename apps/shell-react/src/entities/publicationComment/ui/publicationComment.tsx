import { useNavigate } from "react-router";
import { CommentProps } from "../models";
import styles from "./publicationComment.module.scss";

export const CommentCard = ({ author, date, text }: CommentProps) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${author.id}`)
  }

  return(
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <img
          className={styles.containerHeaderImage}
          src={author.avatar || undefined}
          alt={author.name}
          onClick={handleClick}
        />
        <div className={styles.containerHeaderText}>
          <span className={styles.containerHeaderTextName}>{author.name}</span>
          <span className={styles.containerHeaderTextDate}>{date}</span>
        </div>
      </div>

      <p className={styles.containerText}>{text}</p>
    </div>
)};

