import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";

type ThemeVars = Record<string, string>;
type ThemeHandle = {
  setVars: (vars: ThemeVars) => void;
  setVar: (name: string, value: string) => void;
};

const ThemeCtx = createContext<ThemeHandle | null>(null);

export const useThemeHandle = () => {
  const h = useContext(ThemeCtx);
  if (!h) throw new Error("ThemeProvider missing");
  return h;
};

export const ThemeProvider = forwardRef<
  ThemeHandle,
  React.PropsWithChildren<{
    initial?: ThemeVars;
  }>
>(function ThemeProvider({ initial, children }, ref) {
  const rootRef = useRef<HTMLDivElement>(null);

  const handle = useMemo<ThemeHandle>(
    () => ({
      setVars: (vars) => {
        const el = rootRef.current;
        if (!el) return;
        for (const [k, v] of Object.entries(vars))
          el.style.setProperty(`${k}`, v);
      },
      setVar: (name, value) => {
        rootRef.current?.style.setProperty(`${name}`, value);
      },
    }),
    [],
  );

  useEffect(() => {
    for (let i = 0; i < localStorage.length + 1; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) handle.setVar(key, value);
      }
    }
  }, []);

  useImperativeHandle(ref, () => handle, [handle]);

  React.useLayoutEffect(() => {
    if (initial) handle.setVars(initial);
  }, [handle, initial]);

  return (
    <ThemeCtx.Provider value={handle}>
      <div ref={rootRef} className="theme-root">
        {children}
      </div>
    </ThemeCtx.Provider>
  );
});
