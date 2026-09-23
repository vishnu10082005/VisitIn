const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const notificationService = {
  /**
   * Simulate notifying an employee host that their visitor has checked in
   * @param {Object} payload
   * @param {string} payload.hostId
   * @param {string} payload.hostName
   * @param {string} payload.visitorName
   * @returns {Promise<Object>}
   */
  async notifyHost({ hostId, hostName, visitorName }) {
    await delay();
    return {
      success: true,
      deliveredAt: new Date().toISOString(),
      channel: 'Slack & Email',
      message: `Hi ${hostName}, your visitor ${visitorName} has arrived at the reception lobby.`,
    };
  },

  /**
   * Simulate sending a digital pass link to visitor's phone or email
   * @param {Object} payload
   * @param {string} payload.recipient
   * @param {string} payload.badgeNumber
   * @returns {Promise<Object>}
   */
  async sendPass({ recipient, badgeNumber }) {
    await delay();
    return {
      success: true,
      deliveredAt: new Date().toISOString(),
      recipient,
      badgeNumber,
      message: `Digital pass ${badgeNumber} sent to ${recipient}. Keep it handy during your stay.`,
    };
  },
};
