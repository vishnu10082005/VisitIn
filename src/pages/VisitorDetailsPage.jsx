import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { SearchField } from '../components/ui/SearchField.jsx';
import { Button } from '../components/ui/Button.jsx';
import { StatusBadge } from '../components/ui/StatusBadge.jsx';
import { Avatar } from '../components/ui/Avatar.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { Drawer } from '../components/ui/Drawer.jsx';
import { visitorService } from '../services/visitorService.js';
import { formatTime, formatDateTime } from '../utils/formatters.js';
import { useToast } from '../hooks/useToast.js';
import { Users, Filter, LogOut, Printer } from 'lucide-react';

const FILTER_TABS = [
  { id: 'all', label: 'All Visitors' },
  { id: 'checked_in', label: 'On-Site Now' },
  { id: 'expected', label: 'Expected' },
  { id: 'pending_approval', label: 'Pending Approval' },
  { id: 'checked_out', label: 'Checked Out' },
];

export function VisitorDetailsPage() {
  const { toast } = useToast();
  const [visitors, setVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const fetchVisitors = async () => {
    setIsLoading(true);
    try {
      const data = await visitorService.getVisitors({
        query: searchQuery,
        status: activeFilter === 'all' ? undefined : activeFilter,
      });
      setVisitors(data);
    } catch {
      toast({
        title: 'Error loading visitors',
        description: 'Unable to query visitor records.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [searchQuery, activeFilter]);

  const handleCheckout = async (visitor) => {
    try {
      await visitorService.checkOutVisitor(visitor.id);
      toast({
        title: 'Visitor checked out',
        description: `${visitor.fullName} has been marked checked out.`,
        variant: 'info',
      });
      fetchVisitors();
      if (selectedVisitor?.id === visitor.id) {
        setSelectedVisitor((prev) => ({ ...prev, status: 'checked_out' }));
      }
    } catch {
      toast({
        title: 'Check-out failed',
        description: 'Could not update visitor status.',
        variant: 'error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visitor Directory"
        subtitle="Complete log of guest arrivals, active passes, and security clearances."
      />

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:max-w-md">
          <SearchField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search by name, company, host, or badge..."
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-ink-900 text-white shadow-warm-sm'
                  : 'bg-white text-ink-600 hover:bg-warm-100 border border-warm-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visitor Records Table */}
      {isLoading ? (
        <LoadingState variant="skeleton" skeletonRows={5} />
      ) : visitors.length === 0 ? (
        <EmptyState
          icon={<Users className="w-6 h-6" />}
          title="No visitors found"
          description="Try adjusting your search criteria or filter tabs."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setActiveFilter('all');
          }}
        />
      ) : (
        <div className="bg-white rounded-xl border border-warm-300 shadow-warm-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm-100/70 border-b border-warm-300 text-xs uppercase tracking-wider text-ink-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Visitor</th>
                  <th className="py-3 px-4">Badge</th>
                  <th className="py-3 px-4">Host Employee</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Arrival / Expected</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-200">
                {visitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    onClick={() => setSelectedVisitor(visitor)}
                    className="hover:bg-warm-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={visitor.fullName} src={visitor.photoUrl} size="sm" />
                        <div>
                          <p className="font-semibold text-ink-900">{visitor.fullName}</p>
                          <p className="text-xs text-ink-500">{visitor.company || visitor.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-ink-700">
                      {visitor.badgeNumber}
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
                          onClick={() => handleCheckout(visitor)}
                        >
                          Check Out
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedVisitor(visitor)}
                        >
                          Inspect
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drawer */}
      <Drawer
        isOpen={Boolean(selectedVisitor)}
        onClose={() => setSelectedVisitor(null)}
        title="Visitor Record"
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
                  Access Badge Number
                </span>
                <p className="text-ink-900 font-mono font-bold text-sm mt-0.5">
                  {selectedVisitor.badgeNumber}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-warm-300 bg-white">
                <span className="font-semibold text-ink-500 uppercase block text-[10px]">
                  Arrival Timestamp
                </span>
                <p className="text-ink-900 font-medium text-sm mt-0.5">
                  {formatDateTime(selectedVisitor.checkInTime || selectedVisitor.expectedTime)}
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
            </div>

            <div className="pt-4 border-t border-warm-300 flex flex-col gap-2">
              {(selectedVisitor.status === 'checked_in' || selectedVisitor.status === 'in_meeting') && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleCheckout(selectedVisitor)}
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
                    title: 'Reprinting Visitor Pass',
                    description: `Sending badge #${selectedVisitor.badgeNumber} to front desk printer.`,
                    variant: 'info',
                  });
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Reprint Physical Badge
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
