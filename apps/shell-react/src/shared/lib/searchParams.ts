import { useCallback, useMemo, useSyncExternalStore } from "react";

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
  };
}
