import { MOCK_EMPLOYEES } from '../data/mockEmployees.js';

let employees = [...MOCK_EMPLOYEES];

const delay = (ms = 140) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeService = {
  /**
   * Get all employees
   * @returns {Promise<Array>}
   */
  async getEmployees() {
    await delay();
    return [...employees];
  },

  /**
   * Search employees by name, department, or role
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async searchEmployees(query = '') {
    await delay(120);
    const q = query.toLowerCase().trim();
    if (!q) return [...employees];

    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q)
    );
  },

  /**
   * Get employee by ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getEmployeeById(id) {
    await delay(80);
    const found = employees.find((emp) => emp.id === id);
    return found ? { ...found } : null;
  },
};
