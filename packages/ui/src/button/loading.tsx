import React, { useEffect } from "react";

export const Loading: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({ size = 40, color = "#4f46e5", strokeWidth = 4 }) => {
  useEffect(() => {
    const STYLE_ID = "loading-spinner-keyframes";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        @keyframes loading-rotate { 100% { transform: rotate(360deg); } }
        @keyframes loading-dash {
          0%   { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
          50%  { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
          100% { stroke-dasharray: 100, 200; stroke-dashoffset: -125; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <div style={{ display: "inline-block", width: size, height: size, color }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="presentation"
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "center",
          animation: "loading-rotate 2s linear infinite",
        }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ animation: "loading-dash 1.5s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
};
