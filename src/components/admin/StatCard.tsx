'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: 'red' | 'emerald' | 'amber' | 'blue';
}

export function StatCard({
  title,
  value,
  subValue,
  icon: Icon,
  change,
  trend = 'neutral',
  accentColor = 'red',
}: StatCardProps) {
  const accentBorderMap = {
    red: 'hover:border-red-500/50',
    emerald: 'hover:border-emerald-500/50',
    amber: 'hover:border-amber-500/50',
    blue: 'hover:border-blue-500/50',
  };

  const accentBadgeMap = {
    red: 'text-red-400 bg-red-500/10 border-red-500/30',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  };

  return (
    <div
      className={`bg-[#121218] border border-zinc-800/90 p-5 transition-all duration-200 relative group ${accentBorderMap[accentColor]}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
          {title}
        </span>
        <div className={`p-2 border ${accentBadgeMap[accentColor]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-1">
        <div className="text-2xl font-mono font-black text-white tracking-tight">
          {value}
        </div>
        {subValue && (
          <p className="text-xs text-zinc-400 font-mono mt-0.5">{subValue}</p>
        )}
      </div>

      {change && (
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-xs font-mono">
          {trend === 'up' && (
            <span className="flex items-center text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
          {trend === 'down' && (
            <span className="flex items-center text-rose-400 font-semibold">
              <ArrowDownRight className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
          {trend === 'neutral' && (
            <span className="flex items-center text-zinc-400 font-semibold">
              <Minus className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
          <span className="text-zinc-500 text-[10px]">geçen haftaya kıyasla</span>
        </div>
      )}
    </div>
  );
}
