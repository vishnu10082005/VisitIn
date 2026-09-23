import { MOCK_VISITORS } from '../data/mockVisitors.js';

// Local in-memory state copy for runtime mutations during session
let visitors = [...MOCK_VISITORS];

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const visitorService = {
  /**
   * Fetch all visitors with optional filtering
   * @param {Object} [filters]
   * @param {string} [filters.status]
   * @param {string} [filters.query]
   * @returns {Promise<Array>}
   */
  async getVisitors(filters = {}) {
    await delay();
    let result = [...visitors];

    if (filters.status && filters.status !== 'all') {
      result = result.filter((v) => v.status === filters.status);
    }

    if (filters.query) {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.fullName.toLowerCase().includes(q) ||
          v.company.toLowerCase().includes(q) ||
          v.hostName.toLowerCase().includes(q) ||
          v.badgeNumber.toLowerCase().includes(q)
      );
    }

    // Sort by recent activity
    return result.sort((a, b) => {
      const dateA = new Date(a.checkInTime || a.expectedTime || 0);
      const dateB = new Date(b.checkInTime || b.expectedTime || 0);
      return dateB - dateA;
    });
  },

  /**
   * Get single visitor by ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getVisitorById(id) {
    await delay(120);
    const visitor = visitors.find((v) => v.id === id);
    return visitor ? { ...visitor } : null;
  },

  /**
   * Create a new visitor check-in record
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async createVisitor(data) {
    await delay(250);
    const randomBadgeNum = Math.floor(1000 + Math.random() * 9000);
    const newVisitor = {
      id: `vis-${Date.now()}`,
      badgeNumber: `VI-${randomBadgeNum}`,
      status: 'checked_in',
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      ...data,
    };
    visitors = [newVisitor, ...visitors];
    return { ...newVisitor };
  },

  /**
   * Mark visitor as checked out
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async checkOutVisitor(id) {
    await delay(150);
    const index = visitors.findIndex((v) => v.id === id);
    if (index === -1) throw new Error(`Visitor not found: ${id}`);

    visitors[index] = {
      ...visitors[index],
      status: 'checked_out',
      checkOutTime: new Date().toISOString(),
    };
    return { ...visitors[index] };
  },

  /**
   * Get high level statistics for reception dashboard
   * @returns {Promise<Object>}
   */
  async getStats() {
    await delay(100);
    const active = visitors.filter((v) => v.status === 'checked_in' || v.status === 'in_meeting').length;
    const expected = visitors.filter((v) => v.status === 'expected').length;
    const pendingApproval = visitors.filter((v) => v.status === 'pending_approval').length;
    const checkedOutToday = visitors.filter((v) => v.status === 'checked_out').length;

    return {
      activeOnSite: active,
      expectedToday: expected,
      pendingApproval,
      checkedOutToday,
      totalToday: visitors.length,
    };
  },
};
