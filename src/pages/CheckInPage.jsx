import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Building, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { VisitorLayout } from '../components/layout/VisitorLayout.jsx';
import { StepIndicator } from '../components/ui/StepIndicator.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Select } from '../components/ui/Select.jsx';
import { Button } from '../components/ui/Button.jsx';
import { VISIT_PURPOSES } from '../data/mockPurposes.js';
import { MOCK_EMPLOYEES } from '../data/mockEmployees.js';
import { useToast } from '../hooks/useToast.js';

const CHECK_IN_STEPS = [
  { id: 'info', label: 'Your Details' },
  { id: 'host', label: 'Your Host' },
  { id: 'purpose', label: 'Visit Purpose' },
  { id: 'review', label: 'Review' },
];

export function CheckInPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState('Elena Vance');
  const [email, setEmail] = useState('elena.vance@partnerfirm.com');
  const [company, setCompany] = useState('Vance Advisory');
  const [hostId, setHostId] = useState('emp-101');
  const [purposeId, setPurposeId] = useState('client_meeting');
  const [errors, setErrors] = useState({});

  const handleContinue = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Please tell us your name';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid contact email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast({
      title: 'Details noted',
      description: 'Taking you to review and confirm your visit pass.',
      variant: 'info',
    });

    navigate('/check-in/review', {
      state: {
        fullName,
        email,
        company,
        hostId,
        purposeId,
      },
    });
  };

  return (
    <VisitorLayout
      title="Check In"
      subtitle="A few details, then you're on your way."
    >
      {/* Step Indicator Header */}
      <div className="p-6 bg-warm-100/60 border-b border-warm-300">
        <StepIndicator steps={CHECK_IN_STEPS} currentStepIndex={0} />
      </div>

      {/* Form Content */}
      <form onSubmit={handleContinue} className="p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4" />}
            required
            autoFocus
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Work Email"
              type="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              helperText="We'll send your digital pass here"
              required
            />

            <Input
              label="Company / Organization"
              placeholder="e.g. Acme Studio"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              leftIcon={<Building className="w-4 h-4" />}
              helperText="Optional"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Select
              label="Who are you visiting today?"
              value={hostId}
              onChange={(e) => setHostId(e.target.value)}
              options={MOCK_EMPLOYEES.map((emp) => ({
                value: emp.id,
                label: `${emp.name} (${emp.department})`,
              }))}
            />

            <Select
              label="Purpose of Visit"
              value={purposeId}
              onChange={(e) => setPurposeId(e.target.value)}
              options={VISIT_PURPOSES.map((p) => ({
                value: p.id,
                label: p.label,
              }))}
            />
          </div>
        </div>

        {/* Security & Privacy Notice */}
        <div className="p-3.5 rounded-lg bg-warm-100 border border-warm-300 flex items-start gap-2.5 text-xs text-ink-600">
          <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
          <span>
            Your information is stored securely in accordance with building safety protocols and deleted automatically after policy retention.
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-warm-300">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Review & Continue
          </Button>
        </div>
      </form>
    </VisitorLayout>
  );
}
