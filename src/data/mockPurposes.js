export const VISIT_PURPOSES = [
  {
    id: 'client_meeting',
    label: 'Client / Partner Meeting',
    description: 'Scheduled business discussion or presentation',
    requiresEscort: false,
    badgeColor: 'coral',
  },
  {
    id: 'job_interview',
    label: 'Candidate Interview',
    description: 'Employment interview with hiring team',
    requiresEscort: true,
    badgeColor: 'lavender',
  },
  {
    id: 'contractor',
    label: 'Contractor / Facility Work',
    description: 'On-site maintenance, IT, or facility project',
    requiresEscort: true,
    badgeColor: 'gold',
  },
  {
    id: 'vendor',
    label: 'Vendor / Supplier',
    description: 'Product demo, delivery, or account review',
    requiresEscort: false,
    badgeColor: 'ink',
  },
  {
    id: 'guest',
    label: 'Personal Guest',
    description: 'Visiting an employee for lunch or personal visit',
    requiresEscort: true,
    badgeColor: 'sage',
  },
];
