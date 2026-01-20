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

export const payloadToCss = (t: ThemePayload): ScssTheme => ({
  "--background-color": t.backgroundColor,
  "--background-color-main": t.backgroundColorMain,
  "--background-color-sub": t.backgroundColorSub,
  "--box-shadow": t.boxShadow,
  "--danger": t.danger,
  "--border": t.border,
  "--subtext": t.subtext,
  "--text": t.text,
  "--attention": t.attention,
  "--glow-color": t.glowColor,
  "--glow-opacity": t.glowOpacity,
  "--cards": t.cards,
  "--circle-color": t.circleColor,
});
