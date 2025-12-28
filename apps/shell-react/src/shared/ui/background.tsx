import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number; // scale
};

export const Background = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef({
    shadow: "rgba(255, 0, 200, 1)",
    circle: "rgba(218, 207, 216, 0.88)",
  });

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;

    // ---- user prefs
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // ---- dpr
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ---- sprite (cached glow)
    const sprite = document.createElement("canvas");
    const SPRITE_SIZE = 64;
    sprite.width = SPRITE_SIZE;
    sprite.height = SPRITE_SIZE;
    const sctx = sprite.getContext("2d")!;

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
      // “запекаем” свечение в маленький канвас
      sctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;
      const r = SPRITE_SIZE * 0.28;

      // мягкое свечение через градиент — без shadowBlur на основном канвасе
      const grad = sctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, glowRef.current.circle);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      sctx.fillStyle = grad;
      sctx.beginPath();
      sctx.arc(cx, cy, r, 0, Math.PI * 2);
      sctx.fill();

      // лёгкий “ореол” (дешевле, чем shadowBlur в основном canvas)
      sctx.globalCompositeOperation = "lighter";
      sctx.fillStyle = glowRef.current.shadow;
      sctx.globalAlpha = 0.12;
      sctx.beginPath();
      sctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      sctx.fill();
      sctx.globalAlpha = 1;
      sctx.globalCompositeOperation = "source-over";
    };

    readColorsFromCss();
    rebuildSprite();

    const onThemeGlowChange = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.color && detail?.type) {
        if (detail.type === "shadow") glowRef.current.shadow = detail.color;
        else glowRef.current.circle = detail.color;
        rebuildSprite();
      } else {
        // если событие без detail — просто перечитать CSS
        readColorsFromCss();
        rebuildSprite();
      }
    };

    window.addEventListener("theme:glow-change", onThemeGlowChange);

    // ---- resize
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // рисуем в CSS-пикселях
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ---- dots
    const dots: Dot[] = [];
    const COUNT = 18; // подними/опусти, но не сходи с ума 🙂

    const spawn = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        s: 0.7 + Math.random() * 0.7,
      });
    };

    for (let i = 0; i < COUNT; i++) spawn();

    // ---- scroll throttling (reduce fps while scrolling)
    let scrolling = false;
    let scrollTimer: number | undefined;

    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
      }, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- pause when tab hidden
    let pausedByVisibility = false;
    const onVis = () => {
      pausedByVisibility = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    // ---- animation loop
    let last = 0;

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);

      if (reduceMotion) return;
      if (pausedByVisibility) return;

      const targetFps = scrolling ? 10 : 30;
      const interval = 1000 / targetFps;
      if (ts - last < interval) return;
      last = ts;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // очищаем только viewport
      ctx.clearRect(0, 0, w, h);

      // красивый “суммирующий” режим — и довольно дешёвый
      ctx.globalCompositeOperation = "lighter";

      const half = SPRITE_SIZE / 2;

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];

        p.x += p.vx;
        p.y += p.vy;

        // wrap-around
        if (p.x < -half) p.x = w + half;
        if (p.x > w + half) p.x = -half;
        if (p.y < -half) p.y = h + half;
        if (p.y > h + half) p.y = -half;

        const size = SPRITE_SIZE * p.s;

        ctx.globalAlpha = 0.85;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("theme:glow-change", onThemeGlowChange);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
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
      }}
    />
  );
};
