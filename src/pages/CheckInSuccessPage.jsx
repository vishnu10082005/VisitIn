import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Bell,
  ArrowRight,
  QrCode,
  Coffee,
  Wifi,
  Sparkles,
  Home,
} from 'lucide-react';
import { VisitorLayout } from '../components/layout/VisitorLayout.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';

export function CheckInSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const visitor = location.state?.visitor || {
    fullName: 'Elena Vance',
    badgeNumber: 'VI-4829',
    hostName: 'Sarah Jenkins',
  };

  return (
    <VisitorLayout>
      <div className="p-8 sm:p-12 flex flex-col items-center text-center">
        {/* Celebration Badge */}
        <div className="w-16 h-16 rounded-2xl bg-sage-50 border border-sage-200 flex items-center justify-center text-sage-600 mb-6 shadow-warm-sm animate-in zoom-in-95 duration-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <Badge variant="sage" size="md" className="mb-3">
          Pass #{visitor.badgeNumber || 'VI-4829'}
        </Badge>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-900">
          You&apos;re checked in. Welcome in.
        </h1>

        <p className="text-base text-ink-600 max-w-md mt-2 leading-relaxed">
          Your host <strong>{visitor.hostName}</strong> has been notified and will be with you shortly.
        </p>

        {/* Lobby Amenities Card */}
        <div className="w-full max-w-md p-4 rounded-xl bg-warm-100 border border-warm-300 my-6 text-left space-y-2.5">
          <p className="text-xs font-semibold text-ink-700 uppercase tracking-wider">
            While you wait in our lobby
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-ink-600">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-coral-500 shrink-0" />
              <span>Guest Wi-Fi: <strong>VisitIn-Guest</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-coral-500 shrink-0" />
              <span>Complimentary coffee bar</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/visitor-pass')}
            leftIcon={<QrCode className="w-4 h-4" />}
          >
            View Digital Pass
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate('/')}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Done
          </Button>
        </div>
      </div>
    </VisitorLayout>
  );
}
