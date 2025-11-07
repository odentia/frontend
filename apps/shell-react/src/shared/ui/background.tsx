import { useEffect, useRef } from "react";

export const Background = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef("rgba(255, 0, 200, 1)");

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const getColor = () => {
      const el = document.querySelector(".theme-root");
      if (el) {
        const color = getComputedStyle(el)
          .getPropertyValue("--glow-color")
          .trim();
        glowRef.current = color;
      }
    };

    getColor();

    const handler = (e: Event) => {
      const { color } = (e as CustomEvent).detail;
      glowRef.current = color;
    };

    window.addEventListener("theme:glow-change", handler);

    function resize() {
      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let animationFrame: number;

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

    for (let i = 1; i < 15; i++) {
      spawnParticle();
    }

    function draw() {
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
        ctx.shadowColor = glowRef.current;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 5,
        );
        gradient.addColorStop(0, "rgba(228, 228, 228, 0.9)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    }

    draw();

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
        position: "absolute",
        left: 0,
        pointerEvents: "none",
        top: 0,
        zIndex: -1,
        background: "var(--background-color)",
      }}
    />
  );
};
