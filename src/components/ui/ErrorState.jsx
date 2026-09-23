import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { Button } from './Button.jsx';

/**
 * Reusable ErrorState component
 * @param {Object} props
 * @param {string} [props.title='Something didn't go quite right']
 * @param {string} [props.description='We had trouble completing this action. Please give it another try or speak to our front desk.']
 * @param {Function} [props.onRetry]
 * @param {string} [props.retryLabel='Try Again']
 */
export function ErrorState({
  title = "Something didn't go quite right",
  description = 'We had trouble completing this action. Please give it another try or speak with our front desk.',
  onRetry,
  retryLabel = 'Try Again',
  className,
}) {
  return (
    <div
      role="alert"
      className={cn(
        'w-full flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-coral-200 bg-coral-50/30',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-coral-100 flex items-center justify-center text-coral-600 mb-4 shrink-0">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h4 className="text-base font-semibold text-ink-900 tracking-tight">
        {title}
      </h4>

      <p className="text-sm text-ink-600 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
