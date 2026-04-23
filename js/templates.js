/* ============================================================
   OrgDesignScan — Result Templates
   One object per topology. Rendered by survey.js.
   ============================================================ */

const TEMPLATES = {

  // ─────────────────────────────────────────────────────────
  Resource: {
    topology:       'Resource Topology',
    tagline:        'Performance through resource efficiency and deep specialization',
    score:          3,
    scoreLabel:     'Limited Readiness',
    optimizesFor:   'Utilization & Predictability',
    bestFor:        'Stable, process-driven environments',
    tradeOff:       'Rigidity when strategy shifts',

    summary: `Your organization is built around deep specialization. People and teams own a narrow slice of the work and do it well — but getting anything meaningful done requires assembling many of those slices, which means coordination, planning, and handoffs. This structure worked when the world was predictable. For AI adoption, it's a significant obstacle: AI needs to be embedded where value flows end-to-end, and in your organization, that flow is fragmented by design.`,

    patterns: [
      {
        name:     'Work fragmented by specialization',
        severity: 'High',
        detail:   'AI tools get adopted per function, creating islands of automation that don\'t connect. No cumulative value across the organization.',
      },
      {
        name:     'Coordination dependency',
        severity: 'High',
        detail:   'Every cross-team initiative requires project managers and coordinators. AI adds complexity to an already overloaded coordination layer.',
      },
      {
        name:     'Knowledge concentration',
        severity: 'High',
        detail:   'Critical knowledge lives in a few experts. AI can\'t replace what it can\'t access — and if those people leave, the knowledge disappears with them.',
      },
      {
        name:     'Slow response to change',
        severity: 'Medium',
        detail:   'Shifting priorities triggers replanning cycles. AI projects that need iteration will stall in approval loops.',
      },
    ],

    aiCeiling: `In a Resource Topology, AI typically gets deployed as productivity tools per function: workflow automation for planners, task-specific agents for executors, virtual assistants for specialists. Each function gets a little faster. But the structural problem doesn't go away — you end up with faster specialists who still can't ship value end-to-end without a coordinator in the middle. <strong>Faster pins. Same pin factory.</strong>`,

    strengths: [
      'Deep domain expertise that AI can amplify — once structural barriers are removed',
      'Clear accountability within functional areas',
      'Established processes that provide a stable starting point for redesign',
    ],

    recommendations: [
      'Before adopting any AI tool, identify one value stream where a single team could own the full customer journey end-to-end. Start your AI pilot there — not in a functional silo.',
      'Make your coordination overhead visible: map every handoff and approval required to deliver one customer outcome. That map is your AI readiness gap.',
      'Begin shifting one or two specialist roles toward broader mandates — not to eliminate expertise, but to reduce the number of handoffs a piece of work must cross before it reaches the customer.',
    ],

    onsiteValue: `A 1-day OrgDesignScan will map your full value flow and show exactly where structural fragmentation is blocking AI from creating cumulative value — and give you a concrete redesign to start acting on the following week.`,
  },

  // ─────────────────────────────────────────────────────────
  Delivery: {
    topology:       'Delivery Topology',
    tagline:        'Performance through fast, predictable flow',
    score:          4,
    scoreLabel:     'Developing Readiness',
    optimizesFor:   'Speed & Flow within boundaries',
    bestFor:        'Known work that fits team structure',
    tradeOff:       'Cross-cutting work still needs coordination',

    summary: `Your organization has made real progress. Teams are cross-functional, own defined domains, and can deliver at pace within their lane. That's a meaningful foundation. The challenge is that your AI ambitions — like your business strategy — are almost certainly larger than any single team's lane. When work becomes cross-cutting, your structure reverts to task forces and manual coordination. AI will accelerate delivery within the lanes. But it won't create the systemic business value your leadership is expecting.`,

    patterns: [
      {
        name:     'Teams pinned to their lane',
        severity: 'High',
        detail:   'AI adoption per team creates fast local results. But when outcomes require multiple teams to move together, local speed doesn\'t become global speed.',
      },
      {
        name:     'Strategic shifts trigger structural friction',
        severity: 'High',
        detail:   'Changing the roadmap means reshuffling teams or spawning task forces. AI initiatives with broad business impact will face the same friction.',
      },
      {
        name:     'Outcome ownership stops at team boundaries',
        severity: 'Medium',
        detail:   'Teams optimize for their backlog, not for the customer outcome that spans all of them. AI surfaces this gap quickly and painfully.',
      },
      {
        name:     'Coordination overhead at scale',
        severity: 'Medium',
        detail:   'Works fine for stable roadmaps. As AI creates new cross-cutting opportunities, the coordination load will grow significantly.',
      },
    ],

    aiCeiling: `In a Delivery Topology, AI investments tend to improve flow <em>within</em> existing team boundaries — real-time data integration, smarter prioritization, recommendation engines, better feedback loops. These are valuable. But they're bounded by team scope. The moment a business outcome requires coordinated change across multiple teams, AI-enabled local speed doesn't translate into global results. <strong>You get faster lanes — but the destination still requires everyone to arrive together.</strong>`,

    strengths: [
      'Cross-functional teams that can act without functional handoffs within their scope',
      'Established delivery rhythm and predictability that AI can build on',
      'Teams already accustomed to owning outcomes — the mandate just needs to expand',
    ],

    recommendations: [
      'Identify a shared business outcome — not a feature, but a metric multiple teams contribute to — and run your first AI pilot at that level. This forces the cross-team ownership that defines real AI success.',
      'Introduce regular cross-team sessions where teams share what they\'re learning about the customer, not just what they\'re delivering. This is the first step toward a shared mandate.',
      'Challenge the assumption that team boundaries are fixed. In a world where AI handles the routine, people need to own broader outcomes — not narrower ones.',
    ],

    onsiteValue: `A 1-day OrgDesignScan will show you exactly which team boundaries are limiting your AI potential and how to expand mandates in a way that doesn't create chaos — giving your teams a clear path from fast local delivery to real business impact.`,
  },

  // ─────────────────────────────────────────────────────────
  Adaptive: {
    topology:       'Adaptive Topology',
    tagline:        'Performance through flexibility, innovation, and resilience',
    score:          7,
    scoreLabel:     'Strong Readiness',
    optimizesFor:   'Adaptability & Learning',
    bestFor:        'Volatile, innovation-driven contexts',
    tradeOff:       'Challenges existing control structures, career ladders, and management habits',

    summary: `Your organization has the structural conditions that most companies spend years trying to create. Teams operate with broad mandates, knowledge is shared, and you can absorb strategic shifts without triggering a reorganization. You are significantly better positioned for AI than most. The opportunity now is not to fix structural problems — it's to choose deliberately where AI creates the most compounding value, and to build the learning infrastructure that lets your teams absorb and scale it across the whole system.`,

    patterns: [
      {
        name:     'Learning investment required',
        severity: 'Medium',
        detail:   'Adaptive orgs run on multi-learning. AI amplifies this — but only if the organization actively invests in helping people learn with AI, not just use it as a task tool.',
      },
      {
        name:     'Risk of uncoordinated AI adoption',
        severity: 'Low',
        detail:   'Without a shared AI strategy, teams will adopt different tools in different ways. Your structure can coordinate without overhead — but only if there is a shared direction to coordinate around.',
      },
      {
        name:     'Control structure tension',
        severity: 'Low',
        detail:   'Adaptive Topology challenges existing management habits and career ladders. As AI shifts authority closer to where the work happens, leaders need to actively support that transition rather than resist it.',
      },
    ],

    aiCeiling: `In an Adaptive Topology, AI can function as a true strategic partner: adaptive learning tools, real-time customer journey analytics, AI-assisted prioritization across shared backlogs, and end-to-end process optimization. Most powerfully, AI acts as a subject-matter expert that accelerates multi-learning — helping teams expand into new domains faster and reducing cognitive load when entering unfamiliar territory. Because your teams already move fluidly across boundaries, <strong>the impact of AI compounds across the whole system rather than staying isolated in a single function.</strong>`,

    strengths: [
      'Broad team mandates allow AI deployment across the full value chain, not just isolated functions',
      'Shared ownership means AI insights reach decision-makers without losing fidelity through handoffs',
      'Your structure can absorb AI-driven strategic shifts without reorganization',
      'Low coordination overhead means AI pilots can scale fast',
    ],

    recommendations: [
      'Define your AI north star at the outcome level — what customer or business result should AI measurably improve within 6 months? Anchor every AI initiative to that, not to tool adoption metrics.',
      'Treat AI as a multi-learning accelerator: use it to help teams expand into new domains faster, not just to automate existing tasks. This is where your topology creates a structural advantage over competitors.',
      'Establish a lightweight "AI learning loop" — a shared practice where teams regularly exchange what they\'re learning from AI, what\'s working, and what the organization should adjust. This is how your advantage compounds.',
      'Actively support leaders through the control structure shift — Adaptive Topology with AI moves decision authority closer to the work. That\'s powerful, but only if leadership embraces it rather than quietly reinstating the old hierarchy.',
    ],

    onsiteValue: `A 1-day OrgDesignScan will help you translate your structural advantage into a concrete AI roadmap — identifying the highest-leverage opportunities, sequencing them, and defining the learning infrastructure that will make the gains compound rather than stall.`,
  },

};

// ─────────────────────────────────────────────────────────────
// Contextual variant: Resource Topology — Fit for Purpose
// Applied when topology = Resource AND market is stable AND
// org optimizes for cost/efficiency/reliability/delivery.
// ─────────────────────────────────────────────────────────────
const TEMPLATE_RESOURCE_FIT = {
  topology:       'Resource Topology',
  tagline:        'Efficiency and predictability — appropriate for your market',
  score:          5,
  scoreLabel:     'Fit for Purpose',
  optimizesFor:   'Utilization & Predictability',
  bestFor:        'Stable, process-driven environments',
  tradeOff:       'Will need structural evolution if the market shifts',

  summary: `Your organization is built around deep specialization in a stable, predictable market — and that alignment is a genuine strength. Not every organization needs to be Adaptive. In your context, the coordination overhead and narrow mandates are the deliberate price of the reliability and cost control your market rewards. The real opportunity is not to restructure — it is to use AI to sharpen what already works: reduce the cost of specialist work, automate the routine within functions, and if headcount optimization is a strategic goal, do it with data and structure rather than through blunt cuts.`,

  patterns: [
    {
      name:     'Functional specialization — a deliberate trade-off',
      severity: 'Medium',
      detail:   'In a stable market, specialization is a rational design choice. AI tools deployed per function can create real local value. The goal is not full structural integration — it is making sure those tools connect at the handoff points that matter most.',
    },
    {
      name:     'Coordination overhead',
      severity: 'Medium',
      detail:   'Coordination cost is the price of your reliability model. AI can significantly reduce it — automated handoffs, intelligent project tracking, and predictive capacity planning can cut coordinator workload without requiring a reorganisation.',
    },
    {
      name:     'Knowledge concentration',
      severity: 'Medium',
      detail:   'Even in a fit-for-purpose structure, key-person dependency is a fragility. As you automate, use AI to document and codify expert knowledge before roles change — this reduces long-term specialist risk and lowers onboarding cost.',
    },
    {
      name:     'Limited adaptability if market shifts',
      severity: 'Low',
      detail:   'In a stable market, slower response to change is an acceptable trade-off. If your market conditions change materially, this will need revisiting — but it is not a current priority.',
    },
  ],

  aiCeiling: `In a Resource Topology operating in a stable market, AI has clear and practical value: automating repetitive tasks within specialist roles, reducing coordination friction, and enabling intelligent capacity and workforce planning. If reducing people costs is part of your strategy, AI can help you model where to reduce, which roles can be partially or fully automated, and how to sequence changes without disrupting the reliability that makes your organisation work. <strong>Your structure is appropriate for your context. The question is where AI creates the most leverage within it — and how to sequence that deliberately.</strong>`,

  strengths: [
    'Deep domain expertise that AI can amplify directly within existing roles',
    'Stable, well-understood processes that are easier to automate than volatile ones',
    'Clear accountability within functions makes measuring AI ROI straightforward',
    'Predictable demand patterns make capacity modelling and workforce planning tractable',
  ],

  recommendations: [
    'Identify the 2–3 specialist functions with the highest volume of repetitive work. These are your best candidates for AI-assisted automation — reducing cost per output without disrupting critical expertise.',
    'If workforce cost reduction is a strategic goal, use AI to build a capacity model first: map workload, role utilisation, and demand patterns before making structural decisions. AI-driven workforce planning turns this from guesswork into a structured, defensible process.',
    'Use AI to reduce coordination overhead within your existing structure — automated status reporting, dependency tracking, and intelligent scheduling can cut the coordination tax without requiring reorganisation.',
    'Protect your knowledge concentration risk even as you automate: use AI to document and codify expert knowledge before roles change. This reduces fragility and lowers the cost of future transitions.',
  ],

  onsiteValue: `A 1-day OrgDesignScan will identify exactly where AI creates the most leverage in your current structure — mapping the specialist functions where automation has the highest ROI, building the case for strategic workforce optimisation, and sequencing the changes so reliability is never at risk.`,
};

// ─────────────────────────────────────────────────────────────
// Contextual variant: Delivery Topology — Fit for Purpose
// Applied when topology = Delivery AND market is stable/shifting
// AND org optimizes for delivery speed or customer outcomes.
// ─────────────────────────────────────────────────────────────
const TEMPLATE_DELIVERY_FIT = {
  topology:       'Delivery Topology',
  tagline:        'Fast, predictable flow — well-matched to your market',
  score:          6,
  scoreLabel:     'Fit for Purpose',
  optimizesFor:   'Speed & Flow within boundaries',
  bestFor:        'Known work in manageable markets',
  tradeOff:       'Cross-cutting AI opportunities still need coordination',

  summary: `Your organisation has built something valuable: cross-functional teams that can move at pace within their defined scope, in a market where that pace and predictability matter. That is not a problem to solve — it is a foundation to build on. In your context, the coordination overhead at team boundaries is a real but manageable cost, and AI can address it directly. The opportunity is to extend what your teams already do well: deliver faster, improve cross-team visibility, and gradually expand the outcomes teams are accountable for — without triggering a full reorganisation.`,

  patterns: [
    {
      name:     'Teams optimised for their lane',
      severity: 'Medium',
      detail:   'In a manageable market, lane-based delivery is appropriate. AI can accelerate within lanes and reduce the friction at boundaries — the goal is not to eliminate lanes but to make crossing them cheaper.',
    },
    {
      name:     'Strategic shifts may trigger structural friction',
      severity: 'Medium',
      detail:   'For now this is manageable. As AI creates new cross-team opportunities, plan ahead for how to handle them without full restructuring — a lightweight cross-team coordination mechanism built today prevents a crisis later.',
    },
    {
      name:     'Outcome ownership stops at team boundaries',
      severity: 'Medium',
      detail:   'A real gap, but addressable through gradual mandate expansion rather than wholesale redesign. Start by tying one shared business metric to a group of teams and building accountability around it.',
    },
    {
      name:     'Coordination overhead at scale',
      severity: 'Low',
      detail:   'Manageable in your current context. AI-assisted coordination tools — automated dependency tracking, shared dashboards, intelligent scheduling — can reduce this further without structural change.',
    },
  ],

  aiCeiling: `In a Delivery Topology with a manageable market, AI works well within team boundaries — real-time data integration, smarter prioritisation, recommendation engines, better feedback loops. The incremental next step is using AI to bridge team boundaries: shared visibility, AI-assisted dependency management, cross-team outcome tracking. <strong>Your structure is right for your context. The move now is extending AI from within teams to across them — without needing to redesign everything first.</strong>`,

  strengths: [
    'Cross-functional teams can act without functional handoffs within their scope',
    'Established delivery rhythm that AI can directly accelerate and improve',
    'Teams already oriented to outcomes — the mandate just needs to expand at the edges',
    'Manageable market conditions reduce the urgency to restructure before getting started',
  ],

  recommendations: [
    'Start your AI pilots at the team level — where scope is clear and impact is measurable. Tie each team\'s AI investment to a customer outcome metric, not just internal productivity.',
    'Use AI to improve cross-team visibility and reduce coordination friction: automated dependency tracking, shared real-time dashboards, and AI-assisted planning across related teams are practical next steps that require no restructuring.',
    'Identify one shared business outcome that 2–3 teams contribute to and run a cross-team AI pilot around it. This builds the cross-boundary capability you will need as AI opportunities grow — without disrupting current delivery.',
    'Plan ahead: as AI surfaces opportunities that cut across team lanes, you will need a mechanism to handle them. Design that lightweight coordination layer now, before it becomes a pressure.',
  ],

  onsiteValue: `A 1-day OrgDesignScan will map exactly which team boundaries are creating unnecessary friction, identify the highest-value cross-team AI opportunities, and give you a concrete path to extending your delivery capability — without reorganising what is already working.`,
};

// ─────────────────────────────────────────────────────────────
// Contextual variant: Adaptive Topology — Optimal Readiness
// Applied when topology = Adaptive AND market is volatile/shifting
// AND org optimizes for innovation or customer outcomes.
// ─────────────────────────────────────────────────────────────
const TEMPLATE_ADAPTIVE_FIT = {
  topology:       'Adaptive Topology',
  tagline:        'Built for volatility, acceleration, and compounding AI value',
  score:          8,
  scoreLabel:     'High Readiness',
  optimizesFor:   'Adaptability & Learning',
  bestFor:        'Volatile, innovation-driven contexts',
  tradeOff:       'Advantage only compounds if the AI learning loop is actively maintained',

  summary: `Your organisation is genuinely well-positioned — structurally aligned with a volatile, fast-moving market and oriented toward the innovation and autonomy that AI rewards most. This is not a common combination. Most organisations arrive at AI adoption with structural debt to work through first; yours does not. The opportunity now is to move fast and compound: choose your AI north star, build the learning infrastructure to scale what works, and get ahead of competitors who are still spending energy trying to restructure before they can even start.`,

  patterns: [
    {
      name:     'Learning investment required',
      severity: 'Medium',
      detail:   'Adaptive organisations compound AI value through multi-learning. Invest deliberately in this — structured learning loops, shared practice, and time to experiment — or the structural advantage will be underutilised.',
    },
    {
      name:     'Risk of uncoordinated AI adoption',
      severity: 'Low',
      detail:   'Your structure can coordinate without heavy overhead — but only if you establish a shared AI direction. Without it, teams will optimise locally and miss the systemic compounding gains your topology makes possible.',
    },
    {
      name:     'Control structure tension',
      severity: 'Low',
      detail:   'Already manageable in your context. Keep actively supporting the leadership shift as AI moves authority closer to the work — this is where Adaptive organisations either accelerate or quietly reinstall the old hierarchy.',
    },
  ],

  aiCeiling: `In an Adaptive Topology aligned with a volatile market, there is no structural ceiling — only an execution one. AI can compound across the whole system: adaptive learning tools, real-time customer analytics, AI-assisted prioritisation across shared backlogs, end-to-end process optimisation. Teams can expand into new domains faster with AI as a learning accelerator. <strong>The only limit now is the speed at which you build the AI learning loop and the clarity of your north star. Both are within your control.</strong>`,

  strengths: [
    'Broad mandates allow AI deployment across the full value chain — not just isolated functions',
    'Shared ownership means AI insights reach decision-makers without losing fidelity',
    'Your structure can absorb AI-driven strategic shifts without reorganisation',
    'Low coordination overhead means AI pilots can start fast and scale faster',
    'Structural alignment with a volatile market means your advantage compounds over time',
  ],

  recommendations: [
    'Define your AI north star at the outcome level — what specific customer or business result should AI measurably improve within 6 months? Anchor every initiative to that, not to tool adoption metrics.',
    'Move fast: your structural advantage is real, but it erodes if competitors catch up structurally while you delay. Pick your highest-leverage AI opportunity and start now — not after the next planning cycle.',
    'Build the AI learning loop as a formal practice: regular cross-team exchanges on what is working, what is not, and what the organisation should adjust. This is how your advantage compounds rather than plateaus.',
    'Use AI as a multi-learning accelerator — help teams expand into new domains faster, not just automate existing tasks. In a volatile market, this is your structural edge over slower competitors.',
    'Actively govern the AI portfolio at the outcome level: ensure investments are distributed across the value chain, not clustering in one team while others wait.',
  ],

  onsiteValue: `A 1-day OrgDesignScan will translate your structural and market advantage into a concrete AI roadmap — identifying the highest-compounding opportunities, sequencing them for maximum speed, and designing the learning infrastructure that will sustain and grow the advantage over time.`,
};

// ─────────────────────────────────────────────────────────────
// getContextualTemplate(topology, answers, scores)
// Returns the base template, or a context-adjusted variant only
// when the organisation is clearly fit for its environment.
//
// Conservative rules:
//  • Requires a confident topology win (gap ≥ 3 between 1st and 2nd).
//  • Resource Fit: stable market + efficiency/reliability focus only
//    (wanting "faster delivery" signals the structure is already a problem).
//  • Delivery Fit: stable market only (shifting = uncertainty, no upgrade).
//  • Adaptive Fit: unpredictable market only (shifting = manageable, no upgrade).
// ─────────────────────────────────────────────────────────────
function getContextualTemplate(topology, answers, scores) {
  const base = TEMPLATES[topology];
  if (!base) return base;

  // Require a clear topology win before upgrading
  if (scores) {
    const sorted = Object.values(scores).sort((a, b) => b - a);
    const gap = sorted[0] - sorted[1];
    if (gap < 3) return base; // Mixed signals — stay conservative
  }

  const market       = answers.market_condition     || '';
  const optimization = answers.current_optimization || '';
  const future       = answers.desired_future       || '';

  // ── Resource: fit for purpose only in truly stable, efficiency-driven orgs ──
  if (topology === 'Resource') {
    const isStableMarket = market.startsWith('Stable');
    const isEfficiencyFocused =
      optimization.startsWith('Cost') ||
      optimization.startsWith('Operational') ||
      optimization.startsWith('Predictable');
    // Note: "Faster delivery with fewer dependencies" is excluded —
    // it signals the org already sees its structure as a problem.
    const wantsConsolidation =
      future.startsWith('Less coordination') ||
      future.startsWith('Better use of specialist');

    if (isStableMarket && (isEfficiencyFocused || wantsConsolidation)) {
      return TEMPLATE_RESOURCE_FIT;
    }
  }

  // ── Delivery: fit for purpose only in a stable (not merely shifting) market ──
  if (topology === 'Delivery') {
    const isStableMarket = market.startsWith('Stable'); // Shifting = no upgrade
    const isAligned =
      optimization.startsWith('Predictable') ||
      optimization.startsWith('Customer') ||
      future.startsWith('Faster delivery') ||
      future.startsWith('Teams that are more autonomous');

    if (isStableMarket && isAligned) {
      return TEMPLATE_DELIVERY_FIT;
    }
  }

  // ── Adaptive: high readiness only in a truly unpredictable market ──
  if (topology === 'Adaptive') {
    const isUnpredictableMarket = market.startsWith('Unpredictable'); // Shifting = no upgrade
    const isAligned =
      optimization.startsWith('Speed of innovation') ||
      optimization.startsWith('Customer') ||
      future.startsWith('More innovation') ||
      future.startsWith('Teams that are more autonomous');

    if (isUnpredictableMarket && isAligned) {
      return TEMPLATE_ADAPTIVE_FIT;
    }
  }

  return base;
}
