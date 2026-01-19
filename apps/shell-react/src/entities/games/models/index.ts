export interface GamePrev {
  background_image: string;
  name: string;
  id: string;
}

export interface Platform {
  platforms: string[];
  total: number;
}

export interface Age {
  age_ratings: string[];
  total: number;
}
export interface Genres {
  genres: string[];
  total: number;
}

export type GamesQueryParams = {
  search?: string;
  platform?: string[];
  genre?: string[];
  age_rating?: string[];

  year_from?: number;
  year_to?: number;

  rating_from?: number;
  rating_to?: number;

  page?: number;
  page_size?: number;
};