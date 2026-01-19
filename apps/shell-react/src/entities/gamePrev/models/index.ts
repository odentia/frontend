export interface GamePrevProps {
    games: Game[];
    onValueChange: (title: string) => void;
}

interface Game {
    title: string;
    image: string;
    id: string;
}