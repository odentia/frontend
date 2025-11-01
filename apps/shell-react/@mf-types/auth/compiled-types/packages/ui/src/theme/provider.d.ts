import React from "react";
type ThemeVars = Record<string, string>;
type ThemeHandle = {
  setVars: (vars: ThemeVars) => void;
  setVar: (name: string, value: string) => void;
};
export declare const useThemeHandle: () => ThemeHandle;
export declare const ThemeProvider: React.ForwardRefExoticComponent<
  {
    initial?: ThemeVars;
  } & {
    children?: React.ReactNode | undefined;
  } & React.RefAttributes<ThemeHandle>
>;
export {};
