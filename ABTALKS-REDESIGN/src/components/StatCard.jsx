import React from 'react';
import Card from './Card';

export default function StatCard({ label, value, subtext, icon, variant = 'default' }) {
  return (
    <Card variant={variant} className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="small-label text-[#6B6B6B]">{label}</span>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="mt-2 mb-1">
        <span className="text-[26px] font-extrabold tracking-tight">{value}</span>
      </div>
      {subtext && (
        <span className="text-[12px] opacity-75">{subtext}</span>
      )}
    </Card>
  );
}
