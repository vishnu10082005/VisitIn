import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn.js';
import { Button } from './Button.jsx';

/**
 * Standardized PageHeader component with human microcopy
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.badge]
 * @param {React.ReactNode} [props.actions]
 * @param {boolean} [props.showBack=false]
 * @param {string|Function} [props.onBack]
 */
export function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  showBack = false,
  onBack,
  className,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    } else if (typeof onBack === 'string') {
      navigate(onBack);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={cn(
        'w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-warm-300',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {showBack && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            aria-label="Go back"
            className="shrink-0 h-10 w-10 mt-0.5"
          >
            <ArrowLeft className="w-4 h-4 text-ink-700" />
          </Button>
        )}

        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>

          {subtitle && (
            <p className="text-sm sm:text-base text-ink-600 mt-1.5 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          {actions}
        </div>
      )}
    </div>
  );
}
