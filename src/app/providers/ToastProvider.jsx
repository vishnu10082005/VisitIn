import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const ToastContext = createContext(null);

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertCircle,
  error: XCircle,
};

const toastStyles = {
  success: 'bg-sage-50 text-sage-900 border-sage-300',
  info: 'bg-lavender-50 text-lavender-900 border-lavender-300',
  warning: 'bg-gold-50 text-gold-950 border-gold-300',
  error: 'bg-coral-50 text-coral-950 border-coral-300',
};

const iconStyles = {
  success: 'text-sage-600',
  info: 'text-lavender-600',
  warning: 'text-gold-600',
  error: 'text-coral-600',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = 'info', duration = 4000 }) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast = { id, title, description, variant };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}

      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((item) => {
          const Icon = iconMap[item.variant] || Info;

          return (
            <div
              key={item.id}
              role="status"
              className={cn(
                'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-warm-lg',
                'animate-in fade-in slide-in-from-bottom-3 duration-200 transition-all',
                toastStyles[item.variant] || toastStyles.info
              )}
            >
              <Icon
                className={cn('w-5 h-5 shrink-0 mt-0.5', iconStyles[item.variant])}
                aria-hidden="true"
              />

              <div className="flex-1">
                {item.title && (
                  <p className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeToast(item.id)}
                aria-label="Dismiss notification"
                className="shrink-0 p-1 -mr-1 -mt-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
