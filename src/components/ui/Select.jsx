import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable Select component
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {Array<{value: string, label: string}>} [props.options]
 * @param {string} [props.placeholder]
 */
export function Select({
  label,
  helperText,
  error,
  options = [],
  placeholder = 'Select an option...',
  className,
  id,
  required,
  disabled,
  children,
  ...props
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-ink-700"
        >
          {label}
          {required && <span className="text-coral-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative rounded-lg shadow-subtle">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full bg-white text-ink-900 text-sm rounded-lg border appearance-none transition-all duration-150',
            'h-11 pl-3.5 pr-10 py-2.5 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500',
            'disabled:bg-warm-100 disabled:text-ink-400 disabled:cursor-not-allowed',
            error
              ? 'border-coral-500 bg-coral-50/20 focus:border-coral-600 focus:ring-coral-500/20'
              : 'border-warm-400/80 hover:border-warm-500',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

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
