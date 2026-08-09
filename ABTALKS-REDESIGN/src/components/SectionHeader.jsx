import React from 'react';

export default function SectionHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-end justify-between mb-3 ${className}`}>
      <div>
        <h2 className="section-title text-[20px] font-bold text-[#111111]">{title}</h2>
        {subtitle && <p className="text-[13px] text-[#6B6B6B] mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
