import React from 'react';
import { cn } from '../../utils/cn.js';

export function Card({ className, interactive = false, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-white border border-warm-400/80 rounded-xl shadow-warm-sm overflow-hidden transition-all duration-200',
        interactive && 'hover:shadow-warm-md hover:border-warm-500 hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('p-5 sm:p-6 border-b border-warm-300/60', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn('text-lg font-semibold tracking-tight text-ink-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-ink-500 mt-1', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'p-4 sm:p-6 bg-warm-100/50 border-t border-warm-300/60 flex items-center justify-between gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
