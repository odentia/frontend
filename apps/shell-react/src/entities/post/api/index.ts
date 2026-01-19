import { useMemo } from "react";
import { useApi } from "@config-runtime";
import { Post, PostQueryParams } from "../models";

function s(v?: string) {
  return (v ?? "").trim();
}

function buildPostsQS(p?: PostQueryParams) {
  if (!p) return "";

  const sp = new URLSearchParams();

  const search = s(p.search);
  if (search) sp.set("search", search);

  const game = s(p.game);
  if (game) sp.set("game", game);

  const ratingFrom = s(p.rating_from);
  if (ratingFrom) sp.set("rating_from", ratingFrom);

  const ratingTo = s(p.rating_to);
  if (ratingTo) sp.set("rating_to", ratingTo);

  const commentsFrom = s(p.comments_from);
  if (commentsFrom) sp.set("comments_from", commentsFrom);

  const commentsTo = s(p.comments_to);
  if (commentsTo) sp.set("comments_to", commentsTo);

  if (p.tags?.length) {
    p.tags
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((t) => sp.append("tags", t));
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export const usePost = (id?: string, listParams?: PostQueryParams) => {
  const api = useApi();

  const post = api.useApiQuery<Post>({
    key: [`post-${id}`],
    path: `/posts/${id}`,
    enabled: Boolean(id),
  });

  const samePosts = api.useApiQuery<Post[]>({
    key: [`post-${id}`, "same"],
    path: `/posts/${id}/same`,
    enabled: Boolean(id),
  });

  const listQS = useMemo(() => buildPostsQS(listParams), [listParams]);

  const posts = api.useApiQuery<Post[]>({
    key: ["posts", listParams ?? {}],
    path: `/posts/${listQS}`,
  });

  return { post, samePosts, posts };
};
