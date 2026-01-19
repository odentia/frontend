export interface ScssTheme {
  "--background-color": string;
  "--background-color-main": string;
  "--background-color-sub": string;
  "--box-shadow": string;
  "--danger": string;
  "--border": string;
  "--subtext": string;
  "--text": string;
  "--attention": string;
  "--glow-color": string;
  "--glow-opacity": string;
  "--cards": string;
  "--circle-color": string;
}

export interface ThemePayload {
  backgroundColor: string;
  backgroundColorMain: string;
  backgroundColorSub: string;
  boxShadow: string;
  danger: string;
  border: string;
  subtext: string;
  text: string;
  attention: string;
  glowColor: string;
  glowOpacity: string;
  cards: string;
  circleColor: string;
}

export const scssToPayload = (t: ScssTheme): ThemePayload => ({
  backgroundColor: t["--background-color"],
  backgroundColorMain: t["--background-color-main"],
  backgroundColorSub: t["--background-color-sub"],
  boxShadow: t["--box-shadow"],
  danger: t["--danger"],
  border: t["--border"],
  subtext: t["--subtext"],
  text: t["--text"],
  attention: t["--attention"],
  glowColor: t["--glow-color"],
  glowOpacity: t["--glow-opacity"],
  cards: t["--cards"],
  circleColor: t["--circle-color"],
});

export const DEFAULT_SCSS_THEME: ScssTheme = {
  "--background-color": "radial-gradient(circle, #2a2a31 0%, #14141a 100%)",
  "--background-color-main": "#14141a",
  "--background-color-sub": "#2a2a31",
  "--box-shadow": "rgba(108, 99, 255, 0.6)",
  "--danger": "#a61731",
  "--border": "#272a33",
  "--subtext": "#9da3b0",
  "--text": "#ffffff",
  "--attention": "#8c7eff",
  "--glow-color": "#8c7eff",
  "--glow-opacity": "1",
  "--cards": "#1c1e25",
  "--circle-color": "rgba(228, 228, 228, 0.9)",
};