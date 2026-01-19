export interface Comment {
  id: number;
  author: { id: number; name: string; avatar: string | null };
  date: string;
  text: string;
  isPositive: boolean;
  rating: number;
  parentId: string | null;
  childrenCount: number;
  isLikedMe: boolean;
  isDisLikedMe: boolean;
}

export interface CommentDto {
  items: Comment[];
  hasMore: boolean;
  nextCursor: string | null;
}

export interface MakeComemntProps {
  author?: {
    avatar: string;
    name: string;
  };
  text: string;
  clearState: () => void;
  type: CommentTarget;
}

export type CommentTarget =
  | { kind: "post"; id: string; page: number }
  | { kind: "children"; parentId: string };

export type MakeCommentVars = {
  text: string;
};
