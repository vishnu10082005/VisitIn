import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  AlertCircle,
  LogOut,
  UserPlus,
  RefreshCw,
  Search,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { StatusBadge } from '../components/ui/StatusBadge.jsx';
import { Avatar } from '../components/ui/Avatar.jsx';
import { Drawer } from '../components/ui/Drawer.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { visitorService } from '../services/visitorService.js';
import { useToast } from '../hooks/useToast.js';
import { formatTime } from '../utils/formatters.js';

export function ReceptionDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [stats, setStats] = useState(null);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsData, visitorsData] = await Promise.all([
        visitorService.getStats(),
        visitorService.getVisitors(),
      ]);
      setStats(statsData);
      setRecentVisitors(visitorsData.slice(0, 6));
    } catch {
      toast({
        title: 'Error loading dashboard',
        description: 'Could not fetch reception records.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickCheckout = async (visitor) => {
    try {
      await visitorService.checkOutVisitor(visitor.id);
      toast({
        title: `${visitor.fullName} checked out`,
        description: 'Badge marked as returned.',
        variant: 'info',
      });
      loadData();
      setSelectedVisitor(null);
    } catch {
      toast({
        title: 'Check-out failed',
        description: 'Unable to update status.',
        variant: 'error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reception Desk"
        subtitle="Manage building visitors, pre-registered guests, and host notifications in real time."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/invite')}
              leftIcon={<UserPlus className="w-3.5 h-3.5" />}
            >
              Pre-register Guest
            </Button>
          </div>
        }
      />

      {/* Metrics Row */}
      {isLoading && !stats ? (
        <LoadingState message="Updating lobby stats..." />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-warm-300">
            <CardContent className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  On-Site Now
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">
                  {stats?.activeOnSite || 0}
                </p>
                <p className="text-[11px] text-sage-600 font-medium mt-0.5">
                  Checked in / In meeting
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-300">
            <CardContent className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  Expected Today
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">
                  {stats?.expectedToday || 0}
                </p>
                <p className="text-[11px] text-gold-600 font-medium mt-0.5">
                  Pre-registered invitations
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-300">
            <CardContent className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  Pending Approval
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">
                  {stats?.pendingApproval || 0}
                </p>
                <p className="text-[11px] text-coral-600 font-medium mt-0.5">
                  Awaiting host clearance
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-300">
            <CardContent className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  Completed Visits
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">
                  {stats?.checkedOutToday || 0}
                </p>
                <p className="text-[11px] text-ink-400 font-medium mt-0.5">
                  Safely checked out
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-warm-200 text-ink-600 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live Visitors Directory Section */}
      <div>
        <SectionHeading
          title="Recent Activity & Active Guests"
          subtitle="Showing all recent check-ins and pending lobby arrivals."
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/reception/visitors')}
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              View Full Directory
            </Button>
          }
        />

        <div className="bg-white rounded-xl border border-warm-300 shadow-warm-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm-100/70 border-b border-warm-300 text-xs uppercase tracking-wider text-ink-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Visitor</th>
                  <th className="py-3 px-4">Host Employee</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-200">
                {recentVisitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="hover:bg-warm-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedVisitor(visitor)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={visitor.fullName} src={visitor.photoUrl} size="sm" />
                        <div>
                          <p className="font-semibold text-ink-900">{visitor.fullName}</p>
                          <p className="text-xs text-ink-500">{visitor.company || visitor.badgeNumber}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-medium text-ink-900">{visitor.hostName}</p>
                      <p className="text-xs text-ink-500">{visitor.hostDepartment}</p>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-ink-700">
                      {visitor.purposeLabel}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={visitor.status} />
                    </td>

                    <td className="py-3.5 px-4 text-xs text-ink-500">
                      {formatTime(visitor.checkInTime || visitor.expectedTime)}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      {visitor.status === 'checked_in' || visitor.status === 'in_meeting' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickCheckout(visitor)}
                        >
                          Check Out
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedVisitor(visitor)}
                        >
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Inspection Drawer */}
      <Drawer
        isOpen={Boolean(selectedVisitor)}
        onClose={() => setSelectedVisitor(null)}
        title="Visitor Details"
        description="Comprehensive visit profile and security details."
      >
        {selectedVisitor && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-100 border border-warm-300">
              <Avatar
                name={selectedVisitor.fullName}
                src={selectedVisitor.photoUrl}
                size="lg"
              />
              <div>
                <h3 className="text-base font-bold text-ink-900">
                  {selectedVisitor.fullName}
                </h3>
                <p className="text-xs text-ink-600">{selectedVisitor.email}</p>
                <div className="mt-2">
                  <StatusBadge status={selectedVisitor.status} />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-warm-300 bg-white">
                <span className="font-semibold text-ink-500 uppercase block text-[10px]">
                  Badge / Pass Code
                </span>
                <p className="text-ink-900 font-mono font-bold text-sm mt-0.5">
                  {selectedVisitor.badgeNumber}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-warm-300 bg-white">
                <span className="font-semibold text-ink-500 uppercase block text-[10px]">
                  Company / Organization
                </span>
                <p className="text-ink-900 font-medium text-sm mt-0.5">
                  {selectedVisitor.company || 'Not specified'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-warm-300 bg-white">
                <span className="font-semibold text-ink-500 uppercase block text-[10px]">
                  Host Employee
                </span>
                <p className="text-ink-900 font-medium text-sm mt-0.5">
                  {selectedVisitor.hostName} ({selectedVisitor.hostDepartment})
                </p>
              </div>

              <div className="p-3 rounded-lg border border-warm-300 bg-white">
                <span className="font-semibold text-ink-500 uppercase block text-[10px]">
                  Visit Purpose
                </span>
                <p className="text-ink-900 font-medium text-sm mt-0.5">
                  {selectedVisitor.purposeLabel}
                </p>
              </div>

              {selectedVisitor.notes && (
                <div className="p-3 rounded-lg border border-warm-300 bg-white">
                  <span className="font-semibold text-ink-500 uppercase block text-[10px]">
                    Internal Notes
                  </span>
                  <p className="text-ink-700 text-xs mt-0.5">
                    {selectedVisitor.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-warm-300 flex flex-col gap-2">
              {(selectedVisitor.status === 'checked_in' || selectedVisitor.status === 'in_meeting') && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleQuickCheckout(selectedVisitor)}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Check Out Visitor
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  toast({
                    title: 'Badge pass re-printed',
                    description: `Sent pass ${selectedVisitor.badgeNumber} to lobby printer.`,
                    variant: 'info',
                  });
                }}
              >
                Reprint Badge
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
