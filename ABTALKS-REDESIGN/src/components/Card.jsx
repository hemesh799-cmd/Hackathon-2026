import React from 'react';

export default function Card({
  children,
  variant = 'default', // 'default' | 'dark' | 'highlight'
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-[18px] p-[20px] transition-all duration-200';

  const variantStyles = {
    default: 'bg-white border border-[#E6E6E1] text-[#111111]',
    dark: 'bg-[#171717] border border-[#262626] text-white',
    highlight: 'bg-[#FF5A36]/5 border border-[#FF5A36]/25 text-[#111111]',
  };

  const clickableStyles = onClick ? 'cursor-pointer active:scale-[0.995]' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${clickableStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
