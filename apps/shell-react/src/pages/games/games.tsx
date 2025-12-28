import { GameCard } from "../../entities/games/ui/gameCard";
import { Pagination } from "../../features/pagination/ui/pagination";
import { GameFilters } from "../../widgets/gameFilters";
import styles from "./games.module.scss";


export const GamesPage = () => {

    const games = [{image: "asdasd", title: "FIFA MASTERCUP 2018", id: 1}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 2}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 3}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 4}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 5}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 6} ,{image: "asdasd", title: "FIFA MASTERCUP 2018", id: 7}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 8}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 9}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 10}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 11}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 12}, {image: "asdasd", title: "FIFA MASTERCUP 2018", id: 13} ,{image: "asdasd", title: "FIFA MASTERCUP 2018", id: 14}]

    return(
        <div className={styles.container}>
            <div className={styles.containerFilters}>
                <GameFilters/>
            </div>
            <div className={styles.containerBody}>
                <div className={styles.containerBodyItems}>
                    {games.map((el) =>
                        <GameCard key={el.id} id={el.id} image={el.image} title={el.title}/>
                    )}
                </div>
                <Pagination pages={12}/>
            </div>
        </div>
    )
}