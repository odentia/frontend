interface Author {
  id: number;
  name: string;
  avatar: string | null;
}

export interface CommentProps {
  author: Author;
  date: string;
  text: string;
}

export interface Comment {
  id: number;
  author: { id: number; name: string; avatar: string | null };
  date: string;
  text: string;
  isPositive: boolean;
  rating: number;
  parentId: number | null;
  childrenCount: number;
  isLikedMe: boolean;
  isDisLikedMe: boolean;
  type: "post" | "game";
}

export interface CommentDto {
  items: Comment[];
  hasMore: boolean;
  nextCursor: string | null;
}
