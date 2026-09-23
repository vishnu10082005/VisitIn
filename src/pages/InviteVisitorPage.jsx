import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Select } from '../components/ui/Select.jsx';
import { Textarea } from '../components/ui/Textarea.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { MOCK_EMPLOYEES } from '../data/mockEmployees.js';
import { VISIT_PURPOSES } from '../data/mockPurposes.js';
import { invitationService } from '../services/invitationService.js';
import { useToast } from '../hooks/useToast.js';
import { User, Mail, Building, Calendar, Send, ShieldCheck } from 'lucide-react';

export function InviteVisitorPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [hostId, setHostId] = useState(MOCK_EMPLOYEES[0].id);
  const [purposeId, setPurposeId] = useState(VISIT_PURPOSES[0].id);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!visitorName.trim()) newErrors.visitorName = 'Visitor name is required';
    if (!visitorEmail.trim() || !visitorEmail.includes('@'))
      newErrors.visitorEmail = 'Valid email is required to send the invitation pass';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const host = MOCK_EMPLOYEES.find((h) => h.id === hostId) || MOCK_EMPLOYEES[0];
      const purpose = VISIT_PURPOSES.find((p) => p.id === purposeId) || VISIT_PURPOSES[0];

      const newInvite = await invitationService.createInvitation({
        visitorName,
        visitorEmail,
        visitorCompany,
        hostId: host.id,
        hostName: host.name,
        hostDepartment: host.department,
        purposeLabel: purpose.label,
        notes,
      });

      toast({
        title: 'Invitation Sent',
        description: `Access code ${newInvite.accessCode} emailed to ${visitorName}.`,
        variant: 'success',
      });

      navigate('/reception/invitations');
    } catch {
      toast({
        title: 'Could not create invitation',
        description: 'Please check the details and try again.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Pre-Register a Visitor"
        subtitle="Generate an instant digital pass code and notify security in advance."
        showBack
        onBack="/reception/invitations"
      />

      <Card className="border-warm-300">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <Input
                label="Guest's Full Name"
                placeholder="e.g. Maya Lin"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                error={errors.visitorName}
                leftIcon={<User className="w-4 h-4" />}
                required
                autoFocus
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Guest Email"
                  type="email"
                  placeholder="maya@partnerfirm.com"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  error={errors.visitorEmail}
                  leftIcon={<Mail className="w-4 h-4" />}
                  helperText="Pass QR code will be delivered here"
                  required
                />

                <Input
                  label="Company / Affiliation"
                  placeholder="e.g. Studio Lin"
                  value={visitorCompany}
                  onChange={(e) => setVisitorCompany(e.target.value)}
                  leftIcon={<Building className="w-4 h-4" />}
                  helperText="Optional"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Select
                  label="Employee Host"
                  value={hostId}
                  onChange={(e) => setHostId(e.target.value)}
                  options={MOCK_EMPLOYEES.map((emp) => ({
                    value: emp.id,
                    label: `${emp.name} (${emp.department})`,
                  }))}
                />

                <Select
                  label="Visit Purpose"
                  value={purposeId}
                  onChange={(e) => setPurposeId(e.target.value)}
                  options={VISIT_PURPOSES.map((p) => ({
                    value: p.id,
                    label: p.label,
                  }))}
                />
              </div>

              <Textarea
                label="Special Instructions or Notes for Reception"
                placeholder="e.g. VIP client arrival, requires visitor parking pass in Bay 4..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={250}
                rows={3}
              />
            </div>

            <div className="p-4 rounded-xl bg-warm-100 border border-warm-300 flex items-start gap-3 text-xs text-ink-600">
              <ShieldCheck className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
              <span>
                Pre-registering sends a frictionless check-in link with a unique QR code. Your guest can scan and skip lobby lines upon arrival.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-warm-300">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/reception/invitations')}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="md"
                type="submit"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send Pre-Registration Pass
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
