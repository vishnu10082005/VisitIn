import React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { Button } from './Button.jsx';

/**
 * Reusable EmptyState component
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.actionLabel]
 * @param {Function} [props.onAction]
 */
export function EmptyState({
  icon,
  title = 'No records found',
  description = 'Everything is calm and clear right now.',
  actionLabel,
  onAction,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-warm-400/80 bg-warm-100/40',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-warm-300/80 flex items-center justify-center text-ink-500 mb-4 shrink-0">
        {icon || <Inbox className="w-6 h-6" />}
      </div>

      <h4 className="text-base font-semibold text-ink-900 tracking-tight">
        {title}
      </h4>

      <p className="text-sm text-ink-500 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}

      {children}
    </div>
  );
}
