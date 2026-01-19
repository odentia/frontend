import { Loading } from "@ui";
import { useAge, useGamesPrev, useGenres, usePlatforms } from "../../entities/games/api";
import { GameCard } from "../../entities/games/ui/gameCard";
import { Pagination } from "../../features/pagination/ui/pagination";
import { GameFilters } from "../../widgets/gameFilters";
import styles from "./games.module.scss";
import { useGamesQueryParams } from "../../shared/lib/searchParams";

export const GamesPage = () => {
  
  const params = useGamesQueryParams();

  const games = useGamesPrev(params);

  const platforms = usePlatforms();
  const genres = useGenres();
  const age = useAge();

  return (
    <div className={styles.container}>
      <div className={styles.containerFilters}>
        <GameFilters platforms={platforms.data?.platforms || []} category={genres.data?.genres || []} age={age.data?.age_ratings || []}/>
      </div>
      <div className={styles.containerBody}>
        <div className={styles.containerBodyItems}>
          {games.data && (games.data.map((el) => (
            <GameCard
              key={el.id}
              id={el.id}
              background_image={el.background_image}
              name={el.name}
            />
          )))}
        </div>
        <Pagination pages={12} />
      </div>
    </div>
  );
};
