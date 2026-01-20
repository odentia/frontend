export interface RatingProps {
  isPositive: boolean;
  rating: number;
  isLikedMe: boolean;
  isDislikedMe: boolean;
  id: number;
  type: "game" | "post";
}
