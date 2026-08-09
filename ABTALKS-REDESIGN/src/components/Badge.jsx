import React from 'react';

export default function Badge({
  children,
  variant = 'orange', // 'orange' | 'dark' | 'neutral' | 'success' | 'warning'
  className = '',
}) {
  const variantStyles = {
    orange: 'bg-[#FF5A36] text-white',
    orangeSubtle: 'bg-[#FF5A36]/10 text-[#FF5A36] border border-[#FF5A36]/30',
    dark: 'bg-[#171717] text-white',
    neutral: 'bg-[#E6E6E1] text-[#111111]',
    success: 'bg-[#1F9D68]/15 text-[#1F9D68] border border-[#1F9D68]/30',
    warning: 'bg-[#F4A340]/15 text-[#D97706] border border-[#F4A340]/30',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] ${variantStyles[variant] || variantStyles.orange} ${className}`}>
      {children}
    </span>
  );
}
