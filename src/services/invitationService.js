import { MOCK_INVITATIONS } from '../data/mockInvitations.js';

let invitations = [...MOCK_INVITATIONS];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const invitationService = {
  /**
   * Get all invitations
   * @returns {Promise<Array>}
   */
  async getInvitations() {
    await delay();
    return [...invitations];
  },

  /**
   * Look up invitation by access code (e.g. "VI-7734")
   * @param {string} code
   * @returns {Promise<Object|null>}
   */
  async getInvitationByCode(code = '') {
    await delay(160);
    const cleanCode = code.toUpperCase().trim();
    const match = invitations.find(
      (inv) => inv.accessCode === cleanCode || inv.qrSeed === cleanCode
    );
    return match ? { ...match } : null;
  },

  /**
   * Create a new visitor pre-registration invite
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async createInvitation(data) {
    await delay(220);
    const randomCode = `VI-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInvitation = {
      id: `inv-${Date.now()}`,
      accessCode: randomCode,
      status: 'active',
      scheduledDate: data.scheduledDate || new Date().toISOString(),
      qrSeed: `${randomCode}-${data.visitorName ? data.visitorName.slice(0, 2).toUpperCase() : 'VIS'}`,
      ...data,
    };
    invitations = [newInvitation, ...invitations];
    return { ...newInvitation };
  },

  /**
   * Mark an invitation as redeemed upon kiosk check-in
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async redeemInvitation(id) {
    await delay(120);
    const index = invitations.findIndex((inv) => inv.id === id);
    if (index === -1) throw new Error(`Invitation not found: ${id}`);
    invitations[index] = {
      ...invitations[index],
      status: 'redeemed',
      redeemedAt: new Date().toISOString(),
    };
    return { ...invitations[index] };
  },
};
