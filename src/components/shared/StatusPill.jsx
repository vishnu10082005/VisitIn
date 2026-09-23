import React from 'react';
import { cn } from '../../utils/cn.js';

export function StatusPill({ active = true, label = 'Front Desk Active', className }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-warm-100 border border-warm-300 text-ink-700 shadow-subtle',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {active && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75" />
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            active ? 'bg-sage-500' : 'bg-ink-400'
          )}
        />
      </span>
      <span>{label}</span>
    </div>
  );
}
