import React from 'react';
import { ToastProvider } from './ToastProvider.jsx';

/**
 * Top-level application providers wrapper
 */
export function AppProviders({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
