import { useEffect, useRef } from "react";

export const Background = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef({
    shadow: "rgba(255, 0, 200, 1)",
    circle: "rgba(218, 207, 216, 0.88)",
  });

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const getColor = () => {
      const el = document.querySelector(".theme-root");
      if (el) {
        const shadow = getComputedStyle(el)
          .getPropertyValue("--glow-color")
          .trim();
        const circle = getComputedStyle(el)
          .getPropertyValue("--circle-color")
          .trim();
        glowRef.current.shadow = shadow;
        glowRef.current.circle = circle;
      }
    };

    getColor();

    const handler = (e: Event) => {
      const { color, type } = (e as CustomEvent).detail;
      if (type === "shadow") {
        glowRef.current.shadow = color;
      } else {
        glowRef.current.circle = color;
      }
    };

    window.addEventListener("theme:glow-change", handler);

    function resize() {
      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const dots: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      hue: number;
    }[] = [];

    function spawnParticle() {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        hue: Math.random() * 360,
      });
    }

    for (let i = 0; i < 15; i++) {
      spawnParticle();
    }

    const fps = 30;
    const interval = 1000 / fps;
    let last = 0;
    let animationFrame: number;

    function draw(timestamp: number) {
      if (timestamp - last < interval) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      last = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = dots.length - 1; i >= 0; i--) {
        const p = dots[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) {
          p.x = canvas.width;
          p.y = canvas.height - p.y;
        }
        if (p.x > canvas.width) {
          p.x = 0;
          p.y = canvas.height - p.y;
        }
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = canvas.width - p.x;
        }
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = canvas.width - p.x;
        }

        ctx.save();
        ctx.shadowColor = glowRef.current.shadow;
        ctx.shadowBlur = 20;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 5,
        );
        gradient.addColorStop(0, glowRef.current.circle);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(draw);
    }

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("theme:glow-change", handler);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: -1,
        background:
          "radial-gradient(circle, var(--background-color-sub) 0%, var(--background-color-main) 100%)",
      }}
    />
  );
};
