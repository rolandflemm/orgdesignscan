/* ============================================================
   OrgDesignScan — Question Definitions
   Edit via admin.html or directly here.
   ============================================================ */

const QUESTIONS = [
  // ── Context ──────────────────────────────────────────────
  {
    id: 'business_model',
    section: 'Context',
    text: 'What does your organization make money with?',
    type: 'single',
    options: [
      'Product sales (physical goods)',
      'Software or digital products',
      'Services or consulting',
      'Platform or marketplace',
    ],
    other: true,
  },
  {
    id: 'market_condition',
    section: 'Context',
    text: 'How would you describe your market?',
    type: 'single',
    options: [
      'Stable and predictable — demand and competition change slowly',
      'Shifting — things change, but we can anticipate it',
      'Unpredictable — we often can\'t see what\'s coming next',
    ],
    other: false,
  },
  {
    id: 'org_size',
    section: 'Context',
    text: 'How many people work in the part of the organization you want to focus on?',
    type: 'single',
    options: [
      'Fewer than 50',
      '50–200',
      '200–1,000',
      'More than 1,000',
    ],
    other: false,
  },

  // ── Value Flow ───────────────────────────────────────────
  {
    id: 'focus_area',
    section: 'Value Flow',
    text: 'Which part of your organization are you focusing on for AI adoption?',
    type: 'single',
    options: [
      'The whole company',
      'A specific business unit or division',
      'A specific department',
    ],
    other: true,
  },
  {
    id: 'teams_involved',
    section: 'Value Flow',
    text: 'How many teams are typically involved in getting value created from concept to cash?',
    type: 'single',
    options: [
      '1–2 teams',
      '3–5 teams',
      'More than 5 teams',
      'We don\'t have clear teams — it depends on who\'s available',
    ],
    other: false,
  },

  // ── Coordination ─────────────────────────────────────────
  {
    id: 'coordinators',
    section: 'Coordination & Dependencies',
    text: 'Do you have dedicated people (project managers, coordinators, program managers) to keep work moving between teams?',
    type: 'single',
    options: [
      'Yes, and we couldn\'t function without them',
      'Yes, but it feels like unnecessary overhead',
      'Sometimes, for larger initiatives',
      'No',
    ],
    other: false,
  },
  {
    id: 'main_delay',
    section: 'Coordination & Dependencies',
    text: 'What most often slows down getting work to customers?',
    type: 'single',
    options: [
      'Waiting for another team or approval',
      'Unclear or shifting priorities',
      'Technical complexity',
      'Lack of the right skills in the team',
      'Too many meetings or coordination overhead',
    ],
    other: true,
  },

  // ── Specialization ───────────────────────────────────────
  {
    id: 'key_person_dependency',
    section: 'Specialization & Knowledge',
    text: 'Does your organization depend on a small number of people with knowledge others can\'t easily replace?',
    type: 'single',
    options: [
      'Yes — several critical bottlenecks exist',
      'Yes — a few, but we\'re managing it',
      'Somewhat — we\'re building redundancy',
      'No — knowledge is well distributed',
    ],
    other: false,
  },

  // ── Goals ────────────────────────────────────────────────
  {
    id: 'current_optimization',
    section: 'Goals & Adaptability',
    text: 'What does your organization currently optimize for most?',
    type: 'single',
    options: [
      'Predictable, on-time delivery',
      'Cost and resource efficiency',
      'Speed of innovation and experimentation',
      'Customer satisfaction and outcomes',
      'Operational stability and reliability',
    ],
    other: true,
  },
  {
    id: 'desired_future',
    section: 'Goals & Adaptability',
    text: 'What would "better" look like for your organization in 12 months?',
    type: 'single',
    options: [
      'Faster delivery with fewer dependencies',
      'More innovation and experimentation',
      'Less coordination overhead and fewer bottlenecks',
      'Teams that are more autonomous and accountable',
      'Better use of specialist knowledge across the org',
    ],
    other: true,
  },
];
