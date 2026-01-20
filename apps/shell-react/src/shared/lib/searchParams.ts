import { useCallback, useMemo, useSyncExternalStore } from "react";
import { GamesQueryParams } from "../../entities/games/models";
import { PostQueryParams } from "../../entities/post/models";

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

function getSnapshot() {
  return typeof window === "undefined" ? "" : window.location.search;
}

function getServerSnapshot() {
  return "";
}

export function useQueryParams() {
  const search = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const sp = useMemo(() => new URLSearchParams(search), [search]);

  const params = useMemo(() => {
    const res: Record<string, string> = {};
    sp.forEach((v, k) => {
      res[k] = v;
    });
    return res;
  }, [sp]);

  const allParams = useMemo(() => {
    const res: Record<string, string[]> = {};
    sp.forEach((v, k) => {
      if (!res[k]) res[k] = [];
      res[k].push(v);
    });
    return res;
  }, [sp]);

  const updateURL = useCallback((next: URLSearchParams) => {
    if (typeof window === "undefined") return;

    const qs = next.toString();
    const url = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname;

    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const setParam = useCallback(
    (key: string, value?: string) => {
      const next = new URLSearchParams(search);
      if (value !== undefined) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      updateURL(next);
    },
    [search, updateURL],
  );

  const removeParam = useCallback(
    (key: string) => {
      const next = new URLSearchParams(search);
      next.delete(key);
      updateURL(next);
    },
    [search, updateURL],
  );

  const addParamValue = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(search);
      next.append(key, value);
      updateURL(next);
    },
    [search, updateURL],
  );

  const removeParamValue = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(search);
      const values = next.getAll(key);

      next.delete(key);
      values.filter((v) => v !== value).forEach((v) => next.append(key, v));

      updateURL(next);
    },
    [search, updateURL],
  );

  const setSingleValue = useCallback(
    (key: string, value: string | undefined) => {
      const next = new URLSearchParams(search);

      next.delete(key);
      if (value) next.set(key, value);

      updateURL(next);
    },
    [search, updateURL],
  );


  const toggleParamValue = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(search);
      const values = next.getAll(key);

      next.delete(key);

      if (values.includes(value)) {
        values.filter((v) => v !== value).forEach((v) => next.append(key, v));
      } else {
        values.forEach((v) => next.append(key, v));
        next.append(key, value);
      }

      updateURL(next);
    },
    [search, updateURL],
  );

  const resetParams = useCallback(() => {
    if (typeof window === "undefined") return;

    const url = window.location.pathname;

    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return {
    search,

    resetParams,

    params,
    getParam: (key: string) => params[key] ?? null,

    allParams,
    getAll: (key: string) => sp.getAll(key),

    setParam,
    removeParam,
    addParamValue,
    removeParamValue,
    toggleParamValue,
    setSingleValue
  };
}

function cleanStr(v: string | null): string | undefined {
  const s = v?.trim();
  return s ? s : undefined;
}

function parseIntParam(v: string | null): number | undefined {
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : undefined;
}

function parseFloatParam(v: string | null): number | undefined {
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function cleanArr(arr: string[]): string[] | undefined {
  const a = arr.map((x) => x.trim()).filter(Boolean);
  return a.length ? a : undefined;
}

export function useGamesQueryParams(): GamesQueryParams {
  const qp = useQueryParams();

  return useMemo(() => {
    return {
      search: cleanStr(qp.getParam("search")),

      platform: cleanArr(qp.getAll("platform")),
      genre: cleanArr(qp.getAll("genre")),
      age_rating: cleanArr(qp.getAll("age_rating")),

      year_from: parseIntParam(qp.getParam("year_from")),
      year_to: parseIntParam(qp.getParam("year_to")),

      rating_from: parseFloatParam(qp.getParam("rating_from")),
      rating_to: parseFloatParam(qp.getParam("rating_to")),

      page: parseIntParam(qp.getParam("page")) ?? 1,
      page_size: parseIntParam(qp.getParam("page_size")) ?? 20,
    };
  }, [qp.search]);
}

export function usePostsQueryParams(): Partial<PostQueryParams> {
  const qp = useQueryParams();

  return useMemo(() => {
    return {
      search: cleanStr(qp.getParam("search")),

      tags: cleanArr(qp.getAll("tags")),

      game: cleanStr(qp.getParam("game")),

      rating_from: cleanStr(qp.getParam("rating_from")),
      rating_to: cleanStr(qp.getParam("rating_to")),

      comments_from: cleanStr(qp.getParam("comments_from")),
      comments_to: cleanStr(qp.getParam("comments_to")),
    };
  }, [qp.search]);
}
