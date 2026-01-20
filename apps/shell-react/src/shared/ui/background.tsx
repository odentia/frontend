import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
};

export const Background = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef({
    shadow: "rgba(255, 0, 200, 1)",
    circle: "rgba(218, 207, 216, 0.88)",
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const sprite = document.createElement("canvas");
    const SPRITE_SIZE = 48;
    sprite.width = SPRITE_SIZE;
    sprite.height = SPRITE_SIZE;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;

    const MAX_DPR = 1.25;
    const RENDER_SCALE = 0.5;
    const FPS_IDLE = 15;
    const SCROLL_FREEZE_MS = 180;
    const COUNT = 10;

    let raf = 0;
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let scale = 1;

    let pausedByVisibility = false;
    let scrolling = false;
    let scrollTimer: number | undefined;

    const dots: Dot[] = [];

    const readColorsFromCss = () => {
      const el = document.querySelector(".theme-root");
      if (!el) return;
      const styles = getComputedStyle(el);
      const shadow = styles.getPropertyValue("--glow-color").trim();
      const circle = styles.getPropertyValue("--circle-color").trim();
      if (shadow) glowRef.current.shadow = shadow;
      if (circle) glowRef.current.circle = circle;
    };

    const rebuildSprite = () => {
      sctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;
      const r = SPRITE_SIZE * 0.28;

      const grad = sctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, glowRef.current.circle);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      sctx.globalCompositeOperation = "source-over";
      sctx.globalAlpha = 1;
      sctx.fillStyle = grad;
      sctx.beginPath();
      sctx.arc(cx, cy, r, 0, Math.PI * 2);
      sctx.fill();

      sctx.globalCompositeOperation = "lighter";
      sctx.fillStyle = glowRef.current.shadow;
      sctx.globalAlpha = 0.12;
      sctx.beginPath();
      sctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      sctx.fill();

      sctx.globalAlpha = 1;
      sctx.globalCompositeOperation = "source-over";
    };

    const spawn = (w: number, h: number) => {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        s: 0.7 + Math.random() * 0.7,
      });
    };

    const drawFrame = () => {
      if (reduceMotion || pausedByVisibility) return;
      if (cssW <= 0 || cssH <= 0) return;

      ctx.clearRect(0, 0, cssW, cssH);
      ctx.globalCompositeOperation = "lighter";

      const half = SPRITE_SIZE / 2;

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -half) p.x = cssW + half;
        if (p.x > cssW + half) p.x = -half;
        if (p.y < -half) p.y = cssH + half;
        if (p.y > cssH + half) p.y = -half;

        const size = SPRITE_SIZE * p.s;
        ctx.globalAlpha = 0.85;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const resize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      scale = RENDER_SCALE;

      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.max(1, Math.floor(cssW * dpr * scale));
      canvas.height = Math.max(1, Math.floor(cssH * dpr * scale));

      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);

      if (dots.length === 0) {
        for (let i = 0; i < COUNT; i++) spawn(cssW, cssH);
      }

      drawFrame();
    };

    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        drawFrame();
      }, SCROLL_FREEZE_MS);
    };

    const onVis = () => {
      pausedByVisibility = document.hidden;
      if (!pausedByVisibility) drawFrame();
    };

    const onThemeGlowChange = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.color && detail?.type) {
        if (detail.type === "shadow") glowRef.current.shadow = detail.color;
        else glowRef.current.circle = detail.color;
      } else {
        readColorsFromCss();
      }
      rebuildSprite();
      drawFrame();
    };

    readColorsFromCss();
    rebuildSprite();

    resize();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("theme:glow-change", onThemeGlowChange);

    let last = 0;
    const interval = 1000 / FPS_IDLE;

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop);

      if (reduceMotion || pausedByVisibility) return;
      if (scrolling) return;

      if (ts - last < interval) return;
      last = ts;

      drawFrame();
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("theme:glow-change", onThemeGlowChange);
      window.clearTimeout(scrollTimer);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        background:
          "radial-gradient(circle, var(--background-color-sub) 0%, var(--background-color-main) 100%)",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
};
