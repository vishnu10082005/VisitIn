import React from 'react';
import {
  CheckCircle2,
  Clock,
  LogOut,
  AlertCircle,
  XCircle,
  UserCheck,
} from 'lucide-react';
import { cn } from '../../utils/cn.js';

const statusConfig = {
  checked_in: {
    label: 'Checked In',
    icon: CheckCircle2,
    badgeClasses: 'bg-sage-50 text-sage-800 border-sage-300',
    dotClasses: 'bg-sage-600',
  },
  in_meeting: {
    label: 'In Meeting',
    icon: UserCheck,
    badgeClasses: 'bg-lavender-50 text-lavender-800 border-lavender-300',
    dotClasses: 'bg-lavender-600',
  },
  expected: {
    label: 'Expected',
    icon: Clock,
    badgeClasses: 'bg-gold-50 text-gold-900 border-gold-300',
    dotClasses: 'bg-gold-600',
  },
  pending_approval: {
    label: 'Pending Approval',
    icon: AlertCircle,
    badgeClasses: 'bg-gold-50 text-gold-900 border-gold-300',
    dotClasses: 'bg-gold-600 animate-pulse',
  },
  checked_out: {
    label: 'Checked Out',
    icon: LogOut,
    badgeClasses: 'bg-warm-300/80 text-ink-700 border-warm-400',
    dotClasses: 'bg-ink-400',
  },
  rejected: {
    label: 'Declined',
    icon: XCircle,
    badgeClasses: 'bg-coral-50 text-coral-800 border-coral-300',
    dotClasses: 'bg-coral-600',
  },
  active: {
    label: 'Active Pass',
    icon: CheckCircle2,
    badgeClasses: 'bg-sage-50 text-sage-800 border-sage-300',
    dotClasses: 'bg-sage-600',
  },
  redeemed: {
    label: 'Redeemed',
    icon: CheckCircle2,
    badgeClasses: 'bg-warm-300 text-ink-700 border-warm-400',
    dotClasses: 'bg-ink-400',
  },
};

/**
 * Accessible StatusBadge component for visitor/invitation status
 * Does not rely on color alone (combines semantic icon, label, and high-contrast border)
 * @param {Object} props
 * @param {'checked_in'|'in_meeting'|'expected'|'pending_approval'|'checked_out'|'rejected'|'active'|'redeemed'} props.status
 * @param {boolean} [props.showIcon=true]
 * @param {string} [props.className]
 */
export function StatusBadge({ status = 'expected', showIcon = true, className }) {
  const config = statusConfig[status] || {
    label: status.replace(/_/g, ' '),
    icon: Clock,
    badgeClasses: 'bg-warm-200 text-ink-700 border-warm-400',
    dotClasses: 'bg-ink-400',
  };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border tracking-wide select-none',
        config.badgeClasses,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', config.dotClasses)} />
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />}
      <span>{config.label}</span>
    </span>
  );
}
