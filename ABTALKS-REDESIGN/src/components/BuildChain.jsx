import React, { useState } from 'react';
import Card from './Card';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export default function BuildChain({
  completedDays = [],
  currentDay = 12,
  missedDays = [],
  totalDays = 60,
  isMissed = false,
}) {
  const [expanded, setExpanded] = useState(false);

  // Show 20 items by default, or all 60 when expanded
  const displayLimit = expanded ? totalDays : 20;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <Card className="border border-[#E6E6E1] p-[18px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="small-label text-[#FF5A36] block">DON'T BREAK THE CHAIN</span>
          <span className="font-extrabold text-[15px] text-[#111111]">
            {completedDays.length} days built. Keep the chain alive.
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[12px] font-bold text-[#FF5A36] hover:underline"
        >
          {expanded ? 'Show less' : 'View all 60'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Grid of Day Dots - 10 columns for clean 390px mobile layout */}
      <div className="grid grid-cols-10 gap-2 my-3">
        {daysArray.slice(0, displayLimit).map((day) => {
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay;
          const isMissedDay = missedDays.includes(day) || (isMissed && day === currentDay - 1);
          const isFuture = day > currentDay && !isCompleted;

          let dotStyle = 'bg-[#E6E6E1] text-[#6B6B6B]';
          let borderStyle = 'border-transparent';

          if (isCompleted) {
            dotStyle = 'bg-[#FF5A36] text-white shadow-sm shadow-[#FF5A36]/30';
          } else if (isCurrent) {
            dotStyle = 'bg-[#171717] text-white font-bold';
            borderStyle = 'border-2 border-[#FF5A36] ring-2 ring-[#FF5A36]/20 animate-pulse';
          } else if (isMissedDay) {
            dotStyle = 'bg-[#E6E6E1] text-red-500 relative line-through';
          }

          return (
            <div
              key={day}
              title={`Day ${day}`}
              className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-semibold transition-all duration-200 ${dotStyle} ${borderStyle}`}
            >
              {isCompleted ? (
                <Check size={12} strokeWidth={3} />
              ) : isMissedDay ? (
                <X size={12} strokeWidth={3} className="text-red-500" />
              ) : (
                day
              )}
            </div>
          );
        })}
      </div>

      {/* Legend / Status indicator bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E6E6E1]/60 text-[11px] text-[#6B6B6B]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#FF5A36]" />
          <span>Shipped</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#171717] border border-[#FF5A36]" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#E6E6E1]" />
          <span>Upcoming</span>
        </div>
      </div>
    </Card>
  );
}
