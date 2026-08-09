import React from 'react';

export default function ProgressBar({
  progress = 0, // 0 to 100
  height = '8px',
  color = '#FF5A36',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-[#E6E6E1] rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
