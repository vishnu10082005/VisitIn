import React, { useId } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable Textarea component
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {number} [props.maxLength]
 * @param {string} [props.value]
 */
export function Textarea({
  label,
  helperText,
  error,
  maxLength,
  value,
  className,
  id,
  required,
  disabled,
  rows = 3,
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex justify-between items-baseline">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-ink-700"
          >
            {label}
            {required && <span className="text-coral-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        {maxLength && (
          <span className="text-[11px] text-ink-400 font-mono">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        rows={rows}
        maxLength={maxLength}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : helperText ? helperId : undefined
        }
        className={cn(
          'w-full bg-white text-ink-900 placeholder:text-ink-400 text-sm rounded-lg border transition-all duration-150 p-3 shadow-subtle resize-y min-h-[80px]',
          'focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500',
          'disabled:bg-warm-100 disabled:text-ink-400 disabled:cursor-not-allowed',
          error
            ? 'border-coral-500 bg-coral-50/20 focus:border-coral-600 focus:ring-coral-500/20'
            : 'border-warm-400/80 hover:border-warm-500',
          className
        )}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-xs font-medium text-coral-600">
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
