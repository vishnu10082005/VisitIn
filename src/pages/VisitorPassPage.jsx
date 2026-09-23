import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QrCode,
  ShieldCheck,
  Share2,
  Printer,
  Wifi,
  Calendar,
  Building,
  User,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Avatar } from '../components/ui/Avatar.jsx';
import { BrandLogo } from '../components/shared/BrandLogo.jsx';
import { useToast } from '../hooks/useToast.js';

export function VisitorPassPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const passDetails = {
    visitorName: 'Elena Vance',
    company: 'Vance Advisory',
    hostName: 'Sarah Jenkins',
    department: 'Design & Experience',
    badgeNumber: 'VI-9201',
    validUntil: 'Today, 6:00 PM',
    wifiNetwork: 'VisitIn-Guest',
    wifiPasscode: 'Welcome2026',
    accessLevel: 'Floor 1-3 Guest Escorted',
  };

  const handleShare = () => {
    toast({
      title: 'Pass Link Copied',
      description: 'Digital badge pass link copied to clipboard.',
      variant: 'success',
    });
  };

  const handlePrint = () => {
    toast({
      title: 'Sending to Badge Printer',
      description: 'Lobby reception printer VI-LOBBY-01 is printing your lanyard badge.',
      variant: 'info',
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-xl mx-auto w-full fade-in">
      {/* Header Reassurance */}
      <div className="text-center mb-6 w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-100 border border-warm-300 text-xs font-semibold text-ink-700 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-coral-500" />
          <span>Digital Visitor Credential</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
          Your pass is ready. Keep it handy.
        </h1>
        <p className="text-sm text-ink-500 mt-1">
          Present this digital pass or physical badge if requested by security.
        </p>
      </div>

      {/* The Physical / Digital Pass Card */}
      <div className="w-full bg-white rounded-3xl border border-warm-400 shadow-warm-xl overflow-hidden relative">
        {/* Pass Top Lanyard Slot Graphic */}
        <div className="h-6 bg-warm-200 border-b border-warm-300 flex items-center justify-center">
          <div className="w-16 h-2 rounded-full bg-warm-400/80" />
        </div>

        {/* Pass Header */}
        <div className="p-6 bg-ink-900 text-white flex items-center justify-between">
          <BrandLogo size="sm" />
          <Badge variant="coral" size="sm">
            VISITOR
          </Badge>
        </div>

        {/* Visitor Info Banner */}
        <div className="p-6 text-center border-b border-warm-300 bg-warm-50">
          <Avatar name={passDetails.visitorName} size="xl" className="mx-auto mb-3 shadow-warm-sm" />
          <h2 className="text-xl font-bold text-ink-900">{passDetails.visitorName}</h2>
          <p className="text-sm font-medium text-ink-600">{passDetails.company}</p>
          <span className="inline-block mt-2 font-mono text-xs font-bold text-coral-600 bg-coral-50 px-2.5 py-1 rounded border border-coral-200">
            {passDetails.badgeNumber}
          </span>
        </div>

        {/* Pass Details Matrix */}
        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-warm-200">
            <div>
              <span className="text-ink-400 font-semibold uppercase block text-[10px]">
                Host Employee
              </span>
              <p className="text-ink-900 font-bold text-sm mt-0.5">{passDetails.hostName}</p>
              <p className="text-ink-500">{passDetails.department}</p>
            </div>

            <div>
              <span className="text-ink-400 font-semibold uppercase block text-[10px]">
                Valid Until
              </span>
              <p className="text-ink-900 font-bold text-sm mt-0.5">{passDetails.validUntil}</p>
              <p className="text-sage-600 font-medium flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" /> Active Pass
              </p>
            </div>
          </div>

          {/* QR Code Demo Section */}
          <div className="flex items-center gap-4 p-3.5 bg-warm-100 rounded-xl border border-warm-300">
            <div className="w-16 h-16 bg-white p-2 rounded-lg border border-warm-300 flex items-center justify-center shrink-0">
              <QrCode className="w-full h-full text-ink-900" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-ink-900">Door & Turnstile Access</p>
              <p className="text-ink-500 text-[11px] mt-0.5 leading-relaxed">
                Scan at turnstile optical readers. Wi-Fi: <strong>{passDetails.wifiNetwork}</strong> (Pass: {passDetails.wifiPasscode})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full">
        <Button
          variant="outline"
          size="md"
          onClick={() => navigate('/')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Return to Kiosk
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={handleShare}
          leftIcon={<Share2 className="w-4 h-4" />}
        >
          Send to Phone
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={handlePrint}
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Print Badge
        </Button>
      </div>
    </div>
  );
}
