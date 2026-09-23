import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional class names and resolves Tailwind CSS class conflicts.
 * @param {...any} inputs - Class names, objects, or arrays.
 * @returns {string} Merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
