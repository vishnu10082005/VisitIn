import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable SearchField component
 * @param {Object} props
 * @param {string} [props.value]
 * @param {Function} [props.onChange]
 * @param {Function} [props.onClear]
 * @param {string} [props.placeholder='Search...']
 * @param {string} [props.className]
 */
export function SearchField({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search visitors, hosts, companies...',
  className,
  ...props
}) {
  return (
    <div className={cn('relative w-full flex items-center', className)}>
      <Search className="absolute left-3.5 w-4 h-4 text-ink-400 pointer-events-none" />

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'w-full bg-white text-ink-900 placeholder:text-ink-400 text-sm rounded-lg border border-warm-400/80 transition-all duration-150 shadow-subtle',
          'h-10 pl-10 pr-9 py-2',
          'focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 hover:border-warm-500'
        )}
        {...props}
      />

      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2.5 p-1 rounded-md text-ink-400 hover:text-ink-700 hover:bg-warm-200 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
