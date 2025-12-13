// CSS Modules (импорт как объект классов)
declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

// Обычные scss (если такие тоже импортируешь без модулей)
declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.svg" {
  import type { FC, SVGProps } from "react";

  const Component: FC<SVGProps<SVGSVGElement>>;
  export default Component;
}
