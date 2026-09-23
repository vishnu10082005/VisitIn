import React, { useState } from 'react';
import { getInitials } from '../../utils/formatters.js';
import { cn } from '../../utils/cn.js';

const sizeMap = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-base',
};

const statusDotColors = {
  available: 'bg-sage-500 ring-white',
  in_meeting: 'bg-lavender-500 ring-white',
  busy: 'bg-gold-500 ring-white',
  offline: 'bg-ink-400 ring-white',
};

/**
 * Reusable Avatar component
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.name]
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {'available'|'in_meeting'|'busy'|'offline'} [props.status]
 */
export function Avatar({
  src,
  name = 'Visitor',
  size = 'md',
  status,
  className,
}) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);

  return (
    <div className={cn('relative inline-flex shrink-0 select-none', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-semibold bg-warm-300 text-ink-800 border border-warm-400/80',
          sizeMap[size] || sizeMap.md
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && statusDotColors[status] && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2',
            statusDotColors[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
