import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * VisitIn Brand Logo
 * @param {Object} props
 * @param {boolean} [props.showTagline=false]
 * @param {'sm'|'md'|'lg'} [props.size='md']
 */
export function BrandLogo({
  showTagline = false,
  size = 'md',
  className,
}) {
  const markSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      {/* Brand Emblem */}
      <div
        className={cn(
          'rounded-xl bg-ink-900 text-warm-200 flex items-center justify-center shadow-warm-sm border border-ink-800 shrink-0 relative overflow-hidden',
          markSizes[size]
        )}
      >
        <span className="font-bold tracking-tight text-white flex items-center">
          V<span className="text-coral-500">i</span>
        </span>
        <div className="absolute top-0 right-0 w-2 h-2 bg-coral-500 rounded-bl-sm" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <span className={cn('font-bold tracking-tight text-ink-900', textSizes[size])}>
            Visit<span className="text-coral-500 font-extrabold">In</span>
          </span>
        </div>
        
        {showTagline && (
          <span className="text-[11px] font-medium text-ink-500 tracking-normal mt-0.5">
            You&apos;re in the right place.
          </span>
        )}
      </div>
    </div>
  );
}
