import { useNavigate } from "react-router";
import { GamePrev } from "../models";
import styles from "./gameCard.module.scss";


export const GameCard = ({image, title, id}: GamePrev) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/games/${id}`)
    }

    return(
        <div className={styles.container} onClick={handleClick}>
            <img src={image} alt="image" className={styles.containerImage}/>
            <span className={styles.containerTitle}>{title}</span>
        </div>
    )

}