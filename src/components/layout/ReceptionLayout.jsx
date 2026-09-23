import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Users,
  Mail,
  UserPlus,
  LayoutDashboard,
  Clock,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils/cn.js';

export function ReceptionLayout() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { to: '/reception', end: true, label: 'Overview', icon: LayoutDashboard },
    { to: '/reception/visitors', end: false, label: 'Visitors', icon: Users },
    { to: '/reception/invitations', end: false, label: 'Invitations', icon: Mail },
    { to: '/invite', end: false, label: 'Pre-register Guest', icon: UserPlus },
  ];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 fade-in">
      {/* Reception Sub-Nav & Live Clock */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 mb-6 border-b border-warm-300">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-ink-900 text-white shadow-warm-sm'
                      : 'bg-white text-ink-700 hover:bg-warm-100 border border-warm-300'
                  )
                }
              >
                <Icon className="w-4 h-4 opacity-80" />
                {link.label}
              </NavLink>
            );
          })}
        </div>

        {/* Live Lobby Clock */}
        <div className="flex items-center gap-2 text-xs font-medium text-ink-600 self-end md:self-auto bg-warm-100 px-3 py-1.5 rounded-lg border border-warm-300">
          <Clock className="w-3.5 h-3.5 text-coral-500" />
          <span>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className="text-ink-400">•</span>
          <span>
            {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Reception Page Content */}
      <Outlet />
    </div>
  );
}
