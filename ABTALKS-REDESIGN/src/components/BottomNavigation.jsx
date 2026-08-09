import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, User, Calendar } from 'lucide-react';

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Journey', path: '/dashboard', icon: Compass },
    { label: 'Day 12', path: '/day/12', icon: Calendar },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#E6E6E1] h-[68px] flex items-center justify-around px-4 max-w-[390px] mx-auto pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              isActive ? 'text-[#FF5A36]' : 'text-[#6B6B6B] hover:text-[#111111]'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            <span className={`text-[11px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
