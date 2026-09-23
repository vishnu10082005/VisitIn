import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Shield, Bell, User, Building, Clock } from 'lucide-react';
import { VisitorLayout } from '../components/layout/VisitorLayout.jsx';
import { StepIndicator } from '../components/ui/StepIndicator.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { Avatar } from '../components/ui/Avatar.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { useToast } from '../hooks/useToast.js';
import { visitorService } from '../services/visitorService.js';
import { notificationService } from '../services/notificationService.js';
import { MOCK_EMPLOYEES } from '../data/mockEmployees.js';
import { VISIT_PURPOSES } from '../data/mockPurposes.js';

const CHECK_IN_STEPS = [
  { id: 'info', label: 'Your Details' },
  { id: 'host', label: 'Your Host' },
  { id: 'purpose', label: 'Visit Purpose' },
  { id: 'review', label: 'Review' },
];

export function CheckInReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Retrieve state or fallback to sensible mock defaults
  const state = location.state || {
    fullName: 'Elena Vance',
    email: 'elena.vance@partnerfirm.com',
    company: 'Vance Advisory',
    hostId: 'emp-101',
    purposeId: 'client_meeting',
  };

  const host = MOCK_EMPLOYEES.find((e) => e.id === state.hostId) || MOCK_EMPLOYEES[0];
  const purpose = VISIT_PURPOSES.find((p) => p.id === state.purposeId) || VISIT_PURPOSES[0];

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const newVisitor = await visitorService.createVisitor({
        fullName: state.fullName,
        email: state.email,
        company: state.company,
        hostId: host.id,
        hostName: host.name,
        hostDepartment: host.department,
        purposeId: purpose.id,
        purposeLabel: purpose.label,
      });

      await notificationService.notifyHost({
        hostId: host.id,
        hostName: host.name,
        visitorName: state.fullName,
      });

      toast({
        title: 'Check-in Confirmed',
        description: `${host.name} has been notified of your arrival.`,
        variant: 'success',
      });

      navigate('/check-in/success', {
        state: { visitor: newVisitor, host },
      });
    } catch {
      toast({
        title: 'Check-in Error',
        description: 'Unable to complete check-in. Please inform our reception desk.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VisitorLayout
      title="Almost Done"
      subtitle="Please verify your visit details before we print your pass."
    >
      <div className="p-6 bg-warm-100/60 border-b border-warm-300">
        <StepIndicator steps={CHECK_IN_STEPS} currentStepIndex={3} />
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Visitor Summary Box */}
        <div className="p-5 rounded-xl bg-warm-50 border border-warm-300 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-warm-300">
            <div className="flex items-center gap-3">
              <Avatar name={state.fullName} size="lg" />
              <div>
                <h3 className="text-base font-bold text-ink-900">{state.fullName}</h3>
                <p className="text-xs text-ink-500">{state.email}</p>
              </div>
            </div>
            {state.company && (
              <Badge variant="outline" size="sm">
                {state.company}
              </Badge>
            )}
          </div>

          {/* Host & Purpose details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-semibold text-ink-500 uppercase tracking-wider block mb-1">
                Your Host
              </span>
              <div className="flex items-center gap-2">
                <Avatar name={host.name} src={host.avatarUrl} size="sm" />
                <div>
                  <p className="font-semibold text-ink-900">{host.name}</p>
                  <p className="text-ink-500 text-[11px]">{host.department}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="font-semibold text-ink-500 uppercase tracking-wider block mb-1">
                Visit Purpose
              </span>
              <p className="font-semibold text-ink-900">{purpose.label}</p>
              <p className="text-ink-500 text-[11px]">{purpose.description}</p>
            </div>
          </div>
        </div>

        {/* Microcopy Reassurance */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sage-50 border border-sage-200 text-sage-900 text-xs">
          <Bell className="w-5 h-5 text-sage-600 shrink-0" />
          <span>
            Once confirmed, we&apos;ll immediately notify <strong>{host.name}</strong> on Slack and Email that you are here in the reception lobby.
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-warm-300">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/check-in')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Change Details
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            isLoading={isSubmitting}
            rightIcon={<Check className="w-5 h-5" />}
          >
            Confirm & Welcome In
          </Button>
        </div>
      </div>
    </VisitorLayout>
  );
}
