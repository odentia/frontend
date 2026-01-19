import styles from "./categoryButton.module.scss";

interface ButtonProps {
    image: string;
    title: string;
    onClick: () => void;
}

export const CategoryButton = ({image, title, onClick}: ButtonProps) => {

    return(
        <button className={styles.container} onClick={onClick}>
            <img src={image} className={styles.containerImage}/>
            <span className={styles.containerText}>{title}</span>
        </button>
    )
}