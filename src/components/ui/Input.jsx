import React, { useId } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable accessible Input component
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.className]
 * @param {string} [props.id]
 * @param {boolean} [props.required]
 */
export function Input({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className,
  id,
  required,
  disabled,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-ink-700"
        >
          {label}
          {required && <span className="text-coral-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative rounded-lg shadow-subtle flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-ink-400">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full bg-white text-ink-900 placeholder:text-ink-400 text-sm rounded-lg border transition-all duration-150',
            'h-11 px-3.5 py-2.5',
            'focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500',
            'disabled:bg-warm-100 disabled:text-ink-400 disabled:cursor-not-allowed',
            leftIcon ? 'pl-10' : 'pl-3.5',
            rightIcon ? 'pr-10' : 'pr-3.5',
            error
              ? 'border-coral-500 bg-coral-50/20 focus:border-coral-600 focus:ring-coral-500/20'
              : 'border-warm-400/80 hover:border-warm-500',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-ink-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs font-medium text-coral-600 flex items-center gap-1">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-ink-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
