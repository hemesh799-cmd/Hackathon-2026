import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ rightLink, onRightClick, showBack = false, title = null }) {
  return (
    <header className="sticky top-0 z-40 w-full h-[56px] bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E6E6E1] flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        {showBack ? (
          <Link to="/dashboard" className="p-1 -ml-1 text-[#111111] hover:text-[#FF5A36] transition-colors flex items-center font-bold text-sm">
            <span className="mr-1">←</span> Back
          </Link>
        ) : (
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-[19px] tracking-tight text-[#111111]">
              ABTALKS
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36] group-hover:scale-125 transition-transform" />
          </Link>
        )}
      </div>

      {title && (
        <div className="font-bold text-[14px] text-[#111111]">
          {title}
        </div>
      )}

      <div>
        {rightLink && (
          <a
            href={rightLink.href || '#'}
            onClick={onRightClick}
            className="text-[14px] font-semibold text-[#6B6B6B] hover:text-[#111111] transition-colors"
          >
            {rightLink.label}
          </a>
        )}
      </div>
    </header>
  );
}
