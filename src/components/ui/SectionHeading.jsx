import React from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable SectionHeading component
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.badge]
 * @param {React.ReactNode} [props.action]
 */
export function SectionHeading({
  title,
  subtitle,
  badge,
  action,
  className,
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4 mb-4', className)}>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-ink-900 tracking-tight">
            {title}
          </h2>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
