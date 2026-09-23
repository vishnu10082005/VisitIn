import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * Slide-over Drawer primitive
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.width='max-w-md']
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = 'max-w-md',
  className,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
      aria-describedby={description ? 'drawer-description' : undefined}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/30 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={cn(
            'w-screen bg-white shadow-warm-xl border-l border-warm-300 flex flex-col',
            'transition-transform duration-300 ease-out transform translate-x-0',
            width,
            className
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-warm-300">
            <div>
              {title && (
                <h2
                  id="drawer-title"
                  className="text-lg font-semibold text-ink-900 tracking-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p id="drawer-description" className="text-sm text-ink-500 mt-1">
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-warm-200 transition-colors focus-visible:outline-coral-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
