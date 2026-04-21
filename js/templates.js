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
    score:          5,
    scoreLabel:     'Moderate Readiness',
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
    score:          8,
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
