import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { Button } from '../components/ui/Button.jsx';
import { StatusBadge } from '../components/ui/StatusBadge.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { invitationService } from '../services/invitationService.js';
import { formatDateTime } from '../utils/formatters.js';
import { useToast } from '../hooks/useToast.js';
import { Mail, UserPlus, Copy, QrCode } from 'lucide-react';

export function InvitationsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvitations = async () => {
    setIsLoading(true);
    try {
      const data = await invitationService.getInvitations();
      setInvitations(data);
    } catch {
      toast({
        title: 'Error loading invitations',
        description: 'Unable to query pre-registered guests.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast({
      title: 'Access Code Copied',
      description: `${code} copied to clipboard for kiosk test.`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pre-Registered Guests & Invitations"
        subtitle="Manage scheduled guest passes sent by employees in advance."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/invite')}
            leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          >
            Create Invitation
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState variant="skeleton" skeletonRows={4} />
      ) : invitations.length === 0 ? (
        <EmptyState
          icon={<Mail className="w-6 h-6" />}
          title="No pending invitations"
          description="Pre-register your next guest to provide them with instant kiosk check-in."
          actionLabel="Invite Guest"
          onAction={() => navigate('/invite')}
        />
      ) : (
        <div className="bg-white rounded-xl border border-warm-300 shadow-warm-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm-100/70 border-b border-warm-300 text-xs uppercase tracking-wider text-ink-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Access Code</th>
                  <th className="py-3 px-4">Visitor</th>
                  <th className="py-3 px-4">Host Employee</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Scheduled Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-200">
                {invitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-warm-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-coral-600">
                      <div className="flex items-center gap-2">
                        <span>{inv.accessCode}</span>
                        <button
                          type="button"
                          onClick={() => copyCode(inv.accessCode)}
                          className="text-ink-400 hover:text-ink-700 p-1 rounded"
                          title="Copy Code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-ink-900">{inv.visitorName}</p>
                      <p className="text-xs text-ink-500">{inv.visitorCompany || inv.visitorEmail}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-medium text-ink-900">{inv.hostName}</p>
                      <p className="text-xs text-ink-500">{inv.hostDepartment}</p>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-ink-700">
                      {inv.purposeLabel}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-ink-600">
                      {formatDateTime(inv.scheduledDate)}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={inv.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(inv.accessCode)}
                      >
                        Copy Pass
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
