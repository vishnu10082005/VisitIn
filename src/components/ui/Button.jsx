import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const variantClasses = {
  primary:
    'bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700 shadow-warm-sm focus-visible:outline-coral-500 border border-transparent',
  secondary:
    'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 shadow-warm-sm focus-visible:outline-ink-900 border border-transparent',
  outline:
    'bg-white text-ink-900 border border-warm-400/80 hover:bg-warm-100 hover:border-warm-500 active:bg-warm-200 focus-visible:outline-coral-500 shadow-subtle',
  ghost:
    'bg-transparent text-ink-700 hover:bg-warm-300/40 hover:text-ink-900 active:bg-warm-300/70 focus-visible:outline-coral-500',
  sage:
    'bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700 shadow-warm-sm focus-visible:outline-sage-500 border border-transparent',
  gold:
    'bg-gold-500 text-white hover:bg-gold-600 active:bg-gold-700 shadow-warm-sm focus-visible:outline-gold-500 border border-transparent',
  lavender:
    'bg-lavender-500 text-white hover:bg-lavender-600 active:bg-lavender-700 shadow-warm-sm focus-visible:outline-lavender-500 border border-transparent',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-warm-sm focus-visible:outline-red-600 border border-transparent',
};

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5 h-8 gap-1.5 rounded-md font-medium',
  md: 'text-sm px-4 py-2 h-10 gap-2 rounded-lg font-medium',
  lg: 'text-base px-6 py-3 h-12 gap-2.5 rounded-xl font-semibold',
  icon: 'h-10 w-10 p-0 rounded-lg justify-center',
};

/**
 * Reusable Button component
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'sage'|'gold'|'lavender'|'destructive'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'|'icon'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.children]
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 select-none cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99]',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      
      {children}

      {!isLoading && rightIcon ? (
        <span className="shrink-0">{rightIcon}</span>
      ) : null}
    </button>
  );
}
