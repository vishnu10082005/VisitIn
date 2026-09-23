import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable LoadingState primitive with organic spinner or skeleton bars
 * @param {Object} props
 * @param {string} [props.message='Loading details...']
 * @param {'spinner'|'skeleton'} [props.variant='spinner']
 * @param {number} [props.skeletonRows=3]
 */
export function LoadingState({
  message = 'Taking a moment to load details...',
  variant = 'spinner',
  skeletonRows = 3,
  className,
}) {
  if (variant === 'skeleton') {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={message}
        className={cn('w-full space-y-3 p-4 animate-pulse', className)}
      >
        <div className="h-5 bg-warm-300 rounded-md w-1/3" />
        {Array.from({ length: skeletonRows }).map((_, idx) => (
          <div
            key={idx}
            className="h-10 bg-warm-300/70 rounded-lg w-full"
            style={{ opacity: 1 - idx * 0.2 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-busy="true"
      className={cn(
        'w-full flex flex-col items-center justify-center p-8 sm:p-12 text-center',
        className
      )}
    >
      <div className="w-10 h-10 rounded-full bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
      <p className="text-sm font-medium text-ink-600">{message}</p>
    </div>
  );
}
