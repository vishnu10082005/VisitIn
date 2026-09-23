import React from 'react';
import { cn } from '../../utils/cn.js';

const variantClasses = {
  default: 'bg-warm-300 text-ink-800 border-warm-400/60',
  coral: 'bg-coral-50 text-coral-800 border-coral-200',
  sage: 'bg-sage-50 text-sage-800 border-sage-200',
  gold: 'bg-gold-50 text-gold-900 border-gold-200',
  lavender: 'bg-lavender-50 text-lavender-800 border-lavender-200',
  ink: 'bg-ink-900 text-white border-ink-950',
  outline: 'bg-white text-ink-700 border-warm-400',
};

const sizeClasses = {
  sm: 'text-[11px] px-2 py-0.5 rounded',
  md: 'text-xs px-2.5 py-1 rounded-md',
};

/**
 * Reusable Badge component
 * @param {Object} props
 * @param {'default'|'coral'|'sage'|'gold'|'lavender'|'ink'|'outline'} [props.variant='default']
 * @param {'sm'|'md'} [props.size='md']
 * @param {boolean} [props.dot=false]
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}) {
  const dotColorClass = {
    default: 'bg-ink-400',
    coral: 'bg-coral-500',
    sage: 'bg-sage-500',
    gold: 'bg-gold-500',
    lavender: 'bg-lavender-500',
    ink: 'bg-white',
    outline: 'bg-ink-500',
  }[variant] || 'bg-ink-400';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border leading-none tracking-wide select-none',
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColorClass)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
