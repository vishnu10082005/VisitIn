import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * StepIndicator primitive for multi-step flows like Visitor Check-in
 * @param {Object} props
 * @param {Array<{id: string|number, label: string, description?: string}>} props.steps
 * @param {number} props.currentStepIndex - 0-indexed current step
 * @param {Function} [props.onStepClick]
 */
export function StepIndicator({
  steps = [],
  currentStepIndex = 0,
  onStepClick,
  className,
}) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isClickable = Boolean(onStepClick && isCompleted);

          return (
            <li
              key={step.id || index}
              className={cn(
                'relative flex-1 flex flex-col items-center text-center',
                index !== steps.length - 1 &&
                  "after:content-[''] after:w-full after:h-0.5 after:top-4 after:left-1/2 after:absolute after:-translate-y-1/2",
                index !== steps.length - 1 &&
                  (isCompleted ? 'after:bg-sage-500' : 'after:bg-warm-300')
              )}
            >
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(index)}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-200',
                  isCompleted
                    ? 'bg-sage-500 text-white shadow-warm-sm'
                    : isCurrent
                    ? 'bg-coral-500 text-white ring-4 ring-coral-100 shadow-warm-sm'
                    : 'bg-warm-300 text-ink-600',
                  isClickable && 'hover:scale-105 cursor-pointer'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              <div className="mt-2 hidden sm:block">
                <span
                  className={cn(
                    'text-xs font-medium block',
                    isCurrent ? 'text-coral-600 font-semibold' : 'text-ink-600'
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[11px] text-ink-400 block mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
