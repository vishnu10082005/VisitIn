import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  QrCode,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { Dialog } from '../components/ui/Dialog.jsx';
import { Input } from '../components/ui/Input.jsx';
import { useToast } from '../hooks/useToast.js';
import { invitationService } from '../services/invitationService.js';
import { BrandLogo } from '../components/shared/BrandLogo.jsx';

export function WelcomePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const handleLookupInvite = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setLookupError('Please enter your 6-digit access code (e.g. VI-7734)');
      return;
    }

    setIsLookingUp(true);
    setLookupError('');

    try {
      const invite = await invitationService.getInvitationByCode(accessCode);
      if (invite) {
        toast({
          title: `Welcome, ${invite.visitorName}!`,
          description: `Found your invitation with ${invite.hostName}. Let's get your pass ready.`,
          variant: 'success',
        });
        setIsQrModalOpen(false);
        navigate('/visitor-pass');
      } else {
        setLookupError('We could not find an invitation with that code. Try VI-7734 or speak to reception.');
      }
    } catch {
      setLookupError('Lookup failed. Please speak with reception.');
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 max-w-4xl mx-auto w-full fade-in">
      {/* Calm Reception Kiosk Welcome Card */}
      <div className="w-full text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-100 border border-warm-300 text-xs font-semibold text-ink-700 shadow-subtle mb-4">
          <Sparkles className="w-3.5 h-3.5 text-coral-500" />
          <span>Workplace Guest Experience</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink-900 leading-tight">
          Welcome. <br className="hidden sm:block" />
          <span className="text-coral-500">You&apos;re in the right place.</span>
        </h1>

        <p className="text-base sm:text-lg text-ink-600 max-w-xl mx-auto mt-3 leading-relaxed">
          A few quick details, then you&apos;re on your way. Our team and your host will be notified immediately.
        </p>
      </div>

      {/* Main Choice Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        {/* Primary Action: Self Check-In */}
        <Card
          interactive
          onClick={() => navigate('/check-in')}
          className="group border-warm-400 bg-white p-2 hover:border-coral-400"
        >
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-coral-50 border border-coral-200 flex items-center justify-center text-coral-600 mb-4 group-hover:scale-105 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-ink-900 mb-1">
                Start Check-in
              </h2>

              <p className="text-sm text-ink-600 leading-relaxed">
                Visiting for a meeting, interview, or appointment. We&apos;ll notify your host right away.
              </p>
            </div>

            <div className="mt-6 flex items-center text-coral-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              <span>Begin check-in</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Secondary Action: Have an Invitation / QR Code */}
        <Card
          interactive
          onClick={() => setIsQrModalOpen(true)}
          className="group border-warm-400 bg-white p-2 hover:border-sage-400"
        >
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center text-sage-600 mb-4 group-hover:scale-105 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-ink-900 mb-1">
                I have an Invite / QR
              </h2>

              <p className="text-sm text-ink-600 leading-relaxed">
                Received an email or invitation link beforehand? Enter your code to check in instantly.
              </p>
            </div>

            <div className="mt-6 flex items-center text-sage-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              <span>Enter invite code</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auxiliary Actions (Check out & Reception assistance) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-ink-600">
        <button
          type="button"
          onClick={() => {
            toast({
              title: "Checking out?",
              description: "Please visit the reception desk or scan your digital pass to check out.",
              variant: "info",
            });
          }}
          className="inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors py-1 px-2 rounded"
        >
          <LogOut className="w-3.5 h-3.5 text-ink-400" />
          <span>Leaving the building? Check out here</span>
        </button>

        <span className="text-warm-400">•</span>

        <button
          type="button"
          onClick={() => navigate('/reception')}
          className="inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors py-1 px-2 rounded"
        >
          <Building2 className="w-3.5 h-3.5 text-ink-400" />
          <span>Front Desk / Staff Console</span>
        </button>
      </div>

      {/* Pre-Registered Code Dialog */}
      <Dialog
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Check in with Invitation"
        description="Enter the 6-digit access code from your invitation email."
      >
        <form onSubmit={handleLookupInvite} className="space-y-4">
          <Input
            label="Invitation Code"
            placeholder="e.g. VI-7734"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            error={lookupError}
            helperText="Demo code available: VI-7734 (Priya Sharma) or VI-9941 (Julian Thorne)"
            autoFocus
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-warm-300">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsQrModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="sage"
              size="md"
              type="submit"
              isLoading={isLookingUp}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Find Invitation
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
