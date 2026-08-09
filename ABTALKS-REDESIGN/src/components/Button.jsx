import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'outline'
  fullWidth = true,
  size = 'default', // 'default' (50-52px) | 'sm' (44px)
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 font-semibold active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[12px] border text-[15px]';

  const sizeStyles = {
    default: 'h-[50px] px-5 py-3',
    sm: 'h-[44px] px-4 py-2 text-[14px]',
  };

  const variantStyles = {
    primary: 'bg-[#FF5A36] hover:bg-[#e04c2b] text-white border-transparent shadow-sm shadow-[#FF5A36]/20 font-bold',
    secondary: 'bg-[#E6E6E1] hover:bg-[#d8d8d3] text-[#111111] border-transparent font-semibold',
    dark: 'bg-[#171717] hover:bg-[#262626] text-white border-transparent font-bold shadow-sm',
    outline: 'bg-transparent text-[#111111] border-[#E6E6E1] hover:bg-white/80 font-semibold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.default} ${variantStyles[variant] || variantStyles.primary} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
