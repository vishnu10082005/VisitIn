import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { HeartHandshake, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn.js';

/**
 * Layout specifically tailored for the Visitor Check-in experience
 */
export function VisitorLayout({ children, currentStep, steps, title, subtitle }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 fade-in">
      {/* Reassurance Banner */}
      <div className="w-full max-w-2xl mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-100 border border-warm-300/80 text-xs font-medium text-ink-700 shadow-subtle mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-coral-500" />
          <span>You&apos;re in the right place. We&apos;ll make this easy.</span>
        </div>

        {title && (
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-sm sm:text-base text-ink-600 mt-1.5 max-w-lg mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Kiosk Card Area */}
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-warm-400/90 shadow-warm-lg overflow-hidden">
        {children || <Outlet />}
      </div>

      {/* Assistance Microcopy */}
      <div className="mt-6 text-center text-xs text-ink-500 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-sage-600" />
        <span>Need a hand? Our front desk team is right beside you.</span>
      </div>
    </div>
  );
}
