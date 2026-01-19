import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useLayoutEffect,
} from "react";

export const THEME_VARS = {
  "--background-color": "gradient",
  "--background-color-main": "color",
  "--background-color-sub": "color",
  "--box-shadow": "color",
  "--danger": "color",
  "--border": "color",
  "--subtext": "color",
  "--text": "color",
  "--attention": "color",
  "--glow-color": "color",
  "--glow-opacity": "opacity",
  "--cards": "color",
  "--circle-color": "color",
} as const;

type ThemeVarName = keyof typeof THEME_VARS;
export type ThemeVars = Partial<Record<ThemeVarName, string>>;

export type ThemeHandle = {
  setVars: (vars: ThemeVars) => void;
  setVar: (name: ThemeVarName, value: string) => void;
};

const ThemeCtx = createContext<ThemeHandle | null>(null);

export const useThemeHandle = () => {
  const h = useContext(ThemeCtx);
  if (!h) throw new Error("ThemeProvider missing");
  return h;
};

const isColor = (v: string) =>
  /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v) ||
  /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i.test(v) ||
  /^hsla?\(\s*\d{1,3}\s*,\s*\d+%\s*,\s*\d+%(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i.test(v);

const isRadialGradient = (v: string) =>
  /^radial-gradient\(\s*circle\s*,\s*#[0-9a-f]{6}\s*0%\s*,\s*#[0-9a-f]{6}\s*100%\s*\)$/i.test(v);

const isOpacity = (v: string) => /^(0(\.\d+)?|1(\.0+)?)$/.test(v);

const isValidValue = (name: ThemeVarName, value: string) => {
  switch (THEME_VARS[name]) {
    case "color":
      return isColor(value);
    case "gradient":
      return isRadialGradient(value);
    case "opacity":
      return isOpacity(value);
    default:
      return false;
  }
};

const STORAGE_PREFIX = "theme.";

function readLocalVars(): ThemeVars {
  if (typeof window === "undefined") return {};
  const out: ThemeVars = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(STORAGE_PREFIX)) continue;

    const name = key.slice(STORAGE_PREFIX.length) as ThemeVarName;
    if (!(name in THEME_VARS)) continue;

    const value = localStorage.getItem(key);
    if (value && isValidValue(name, value)) out[name] = value;
  }

  return out;
}

function applyVars(el: HTMLElement, vars: ThemeVars, persistLocal: boolean) {
  for (const [k, v] of Object.entries(vars)) {
    const name = k as ThemeVarName;
    if (!v) continue;
    if (!isValidValue(name, v)) continue;

    el.style.setProperty(name, v);
    if (persistLocal && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_PREFIX + name, v);
    }
  }
}

export type ThemeLoadAdapter = {
  load: () => Promise<ThemeVars | null | undefined>;
};

export const ThemeProvider = forwardRef<
  ThemeHandle,
  React.PropsWithChildren<{
    initial?: ThemeVars;

    enabled?: boolean;

    adapter?: ThemeLoadAdapter;

    persistServerToLocal?: boolean;
  }>
>(function ThemeProvider(
  { initial, children, enabled = false, adapter, persistServerToLocal = true },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);

  const handle = useMemo<ThemeHandle>(
    () => ({
      setVars: (vars) => {
        const el = rootRef.current;
        if (!el) return;
        applyVars(el, vars, true);
      },
      setVar: (name, value) => {
        const el = rootRef.current;
        if (!el) return;
        if (!isValidValue(name, value)) return;
        el.style.setProperty(name, value);
        localStorage.setItem(STORAGE_PREFIX + name, value);
      },
    }),
    []
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const localVars = readLocalVars();
    applyVars(el, localVars, false);
  }, []);

  useLayoutEffect(() => {
    if (!initial) return;
    const el = rootRef.current;
    if (!el) return;
    applyVars(el, initial, true);
  }, [initial]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!enabled) return;
      if (!adapter?.load) return;

      const el = rootRef.current;
      if (!el) return;

      try {
        const serverVars = await adapter.load();
        if (cancelled) return;
        if (!serverVars) return;

        applyVars(el, serverVars, persistServerToLocal);
      } catch {
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [enabled, adapter, persistServerToLocal]);

  useImperativeHandle(ref, () => handle, [handle]);

  return (
    <ThemeCtx.Provider value={handle}>
      <div ref={rootRef} className="theme-root" >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
});
