import { useApi } from "@config-runtime";
import { GamePrev } from "../models";

export function useGamesPrev(query: string) {

    const api = useApi();

    return api.useApiQuery<GamePrev[]>({key: ["posts"], path: "/games/", params: { game: query, limit: 5}})

}