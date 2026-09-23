/**
 * Formatting utilities for VisitIn
 */

/**
 * Format a date string or timestamp into a friendly human readable date.
 * Example: "Today, 9:30 AM" or "Sep 23, 2026 • 10:15 AM"
 */
export function formatDateTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) {
    return `Today at ${timeStr}`;
  }
  
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return `${dateStr}, ${timeStr}`;
}

/**
 * Format time only (e.g. "09:45 AM")
 */
export function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Extract initials from full name (e.g. "Sarah Jenkins" -> "SJ")
 */
export function getInitials(name) {
  if (!name) return 'VI';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Format badge number or visitor access code (e.g. "VI-4829")
 */
export function formatBadgeCode(code) {
  if (!code) return '';
  return code.toUpperCase();
}
