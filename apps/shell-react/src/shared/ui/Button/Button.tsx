import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  padding?: string;
  fontSize?: string;
  minWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick,
  padding = "12px 24px",
  fontSize = "14px",
  minWidth,
  className,
  style
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize,
        padding,
        minWidth,
        color: '#999',
        ...style
      }}
    >
      {children}
    </button>
  );
};