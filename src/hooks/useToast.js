import { useToastContext } from '../app/providers/ToastProvider.jsx';

/**
 * Hook to trigger VisitIn toast notifications
 * @example
 * const { toast } = useToast();
 * toast({ title: "Your host has been notified", description: "Elena will be right down.", variant: "success" });
 */
export function useToast() {
  return useToastContext();
}
