import { useApi } from "@config-runtime";
import { Age, GamePrev, Genres, Platform } from "../models";

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

function clampInt(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(v)));
}
function clampFloat(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function cleanStr(v?: string) {
  const s = v?.trim();
  return s ? s : undefined;
}

function cleanArr(v?: string[]) {
  if (!v) return undefined;
  const a = v.map((x) => x.trim()).filter(Boolean);
  return a.length ? a : undefined;
}

function normalizeParams(
  input: GamesQueryParams = {},
): Required<Pick<GamesQueryParams, "page" | "page_size">> &
  Omit<GamesQueryParams, "page" | "page_size"> {
  const page = clampInt(input.page ?? 1, 1, 1_000_000);
  const page_size = clampInt(input.page_size ?? 20, 1, 100);

  const year_from =
    input.year_from == null ? undefined : clampInt(input.year_from, 1900, 2100);
  const year_to =
    input.year_to == null ? undefined : clampInt(input.year_to, 1900, 2100);

  const rating_from =
    input.rating_from == null ? undefined : clampFloat(input.rating_from, 0, 5);
  const rating_to =
    input.rating_to == null ? undefined : clampFloat(input.rating_to, 0, 5);

  const yf = year_from,
    yt = year_to;
  const rf = rating_from,
    rt = rating_to;

  const fixedYears =
    yf != null && yt != null && yf > yt
      ? { year_from: yt, year_to: yf }
      : { year_from: yf, year_to: yt };

  const fixedRatings =
    rf != null && rt != null && rf > rt
      ? { rating_from: rt, rating_to: rf }
      : { rating_from: rf, rating_to: rt };

  return {
    search: cleanStr(input.search),
    platform: cleanArr(input.platform),
    genre: cleanArr(input.genre),
    age_rating: cleanArr(input.age_rating),

    ...fixedYears,
    ...fixedRatings,

    page,
    page_size,
  };
}

export function useGamesPrev(params?: GamesQueryParams) {
  const api = useApi();
  const normalized = normalizeParams(params);

  return api.useApiQuery<GamePrev>({
    key: ["games", "list", normalized],
    path: "/api/v1/games/",
    params: normalized,
  });
}

export function usePlatforms() {
  const api = useApi().useApiQuery<Platform>({
    key: ["platforms"],
    path: "/api/v1/genres/platforms",
  });
  return api;
}

export function useAge() {
  const api = useApi().useApiQuery<Age>({
    key: ["age"],
    path: "/api/v1/genres/age-ratings",
  });
  return api;
}

export function useGenres() {
  const api = useApi().useApiQuery<Genres>({ key: ["genre"], path: "/api/v1/genres" });
  return api;
}
