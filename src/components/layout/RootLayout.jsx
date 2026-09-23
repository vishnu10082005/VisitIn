import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Monitor, Shield, Sparkles } from 'lucide-react';
import { BrandLogo } from '../shared/BrandLogo.jsx';
import { StatusPill } from '../shared/StatusPill.jsx';
import { cn } from '../../utils/cn.js';

export function RootLayout() {
  const location = useLocation();
  const isReception = location.pathname.startsWith('/reception');

  return (
    <div className="min-h-screen flex flex-col bg-warm-200 text-ink">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="focus-visible:outline-coral-500 rounded-lg">
              <BrandLogo showTagline size="md" />
            </NavLink>

            {/* Mode Switcher: Kiosk vs Reception */}
            <nav className="hidden md:flex items-center bg-warm-100 p-1 rounded-xl border border-warm-300 text-xs font-semibold">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                    isActive
                      ? 'bg-white text-ink-900 shadow-warm-sm border border-warm-300'
                      : 'text-ink-600 hover:text-ink-900'
                  )
                }
              >
                <Monitor className="w-3.5 h-3.5 text-coral-500" />
                Visitor Kiosk
              </NavLink>

              <NavLink
                to="/reception"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                    isActive
                      ? 'bg-white text-ink-900 shadow-warm-sm border border-warm-300'
                      : 'text-ink-600 hover:text-ink-900'
                  )
                }
              >
                <Shield className="w-3.5 h-3.5 text-sage-600" />
                Reception Desk
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <StatusPill active label="Lobby Kiosk Online" className="hidden sm:inline-flex" />

            <NavLink
              to="/reception"
              className="text-xs font-semibold text-ink-600 hover:text-coral-600 transition-colors md:hidden"
            >
              Reception Desk &rarr;
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main View Outlet */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Global Reception Footer */}
      <footer className="border-t border-warm-300 bg-white/60 py-4 text-center text-xs text-ink-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>VisitIn — Modern Workplace Hospitality</span>
          </p>
          <p className="text-ink-400">
            Secure check-in • Photo ID capture • Digital badge pass
          </p>
        </div>
      </footer>
    </div>
  );
}
