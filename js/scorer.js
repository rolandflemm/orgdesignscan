/* ============================================================
   OrgDesignScan — Topology Scorer
   Maps survey answers to Resource / Delivery / Adaptive
   ============================================================ */

// Each answer contributes weighted points to each topology.
// Highest total wins.

const SCORE_MAP = {

  market_condition: {
    'Stable and predictable — demand and competition change slowly':
      { Resource: 3, Delivery: 0, Adaptive: 0 },
    'Shifting — things change, but we can anticipate it':
      { Resource: 0, Delivery: 3, Adaptive: 1 },
    'Unpredictable — we often can\'t see what\'s coming next':
      { Resource: 0, Delivery: 0, Adaptive: 3 },
  },

  teams_involved: {
    '1–2 teams':
      { Resource: 0, Delivery: 1, Adaptive: 2 },
    '3–5 teams':
      { Resource: 1, Delivery: 2, Adaptive: 0 },
    'More than 5 teams':
      { Resource: 3, Delivery: 1, Adaptive: 0 },
    'We don\'t have clear teams — it depends on who\'s available':
      { Resource: 3, Delivery: 0, Adaptive: 0 },
  },

  coordinators: {
    'Yes, and we couldn\'t function without them':
      { Resource: 3, Delivery: 1, Adaptive: 0 },
    'Yes, but it feels like unnecessary overhead':
      { Resource: 1, Delivery: 2, Adaptive: 0 },
    'Sometimes, for larger initiatives':
      { Resource: 0, Delivery: 2, Adaptive: 1 },
    'No':
      { Resource: 0, Delivery: 0, Adaptive: 3 },
  },

  main_delay: {
    'Waiting for another team or approval':
      { Resource: 3, Delivery: 1, Adaptive: 0 },
    'Unclear or shifting priorities':
      { Resource: 1, Delivery: 2, Adaptive: 0 },
    'Technical complexity':
      { Resource: 0, Delivery: 1, Adaptive: 1 },
    'Lack of the right skills in the team':
      { Resource: 2, Delivery: 1, Adaptive: 0 },
    'Too many meetings or coordination overhead':
      { Resource: 2, Delivery: 2, Adaptive: 0 },
  },

  key_person_dependency: {
    'Yes — several critical bottlenecks exist':
      { Resource: 3, Delivery: 1, Adaptive: 0 },
    'Yes — a few, but we\'re managing it':
      { Resource: 2, Delivery: 1, Adaptive: 0 },
    'Somewhat — we\'re building redundancy':
      { Resource: 0, Delivery: 2, Adaptive: 1 },
    'No — knowledge is well distributed':
      { Resource: 0, Delivery: 1, Adaptive: 3 },
  },

  current_optimization: {
    'Predictable, on-time delivery':
      { Resource: 2, Delivery: 2, Adaptive: 0 },
    'Cost and resource efficiency':
      { Resource: 3, Delivery: 0, Adaptive: 0 },
    'Speed of innovation and experimentation':
      { Resource: 0, Delivery: 0, Adaptive: 3 },
    'Customer satisfaction and outcomes':
      { Resource: 0, Delivery: 2, Adaptive: 2 },
    'Operational stability and reliability':
      { Resource: 3, Delivery: 1, Adaptive: 0 },
  },

  desired_future: {
    'Faster delivery with fewer dependencies':
      { Resource: 1, Delivery: 2, Adaptive: 1 },
    'More innovation and experimentation':
      { Resource: 0, Delivery: 0, Adaptive: 3 },
    'Less coordination overhead and fewer bottlenecks':
      { Resource: 2, Delivery: 1, Adaptive: 0 },
    'Teams that are more autonomous and accountable':
      { Resource: 0, Delivery: 1, Adaptive: 3 },
    'Better use of specialist knowledge across the org':
      { Resource: 1, Delivery: 2, Adaptive: 1 },
  },

};

/**
 * Score survey answers and return the matched topology.
 * @param {Object} answers - { questionId: answerText }
 * @returns {{ topology: string, scores: Object, confidence: string }}
 */
function scoreAnswers(answers) {
  const scores = { Resource: 0, Delivery: 0, Adaptive: 0 };

  for (const [qId, scoreTable] of Object.entries(SCORE_MAP)) {
    const answer = answers[qId];
    if (!answer) continue;

    // Match exact answer or check if answer starts with a known option
    // (handles "Other: ..." free-text answers gracefully)
    const match = Object.keys(scoreTable).find(opt =>
      answer === opt || answer.toLowerCase().startsWith(opt.toLowerCase().slice(0, 20))
    );
    if (match) {
      const pts = scoreTable[match];
      scores.Resource  += pts.Resource;
      scores.Delivery  += pts.Delivery;
      scores.Adaptive  += pts.Adaptive;
    }
  }

  // Determine winner
  const topology = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];

  // Confidence: gap between 1st and 2nd place
  const sorted = Object.values(scores).sort((a, b) => b - a);
  const gap = sorted[0] - sorted[1];
  const confidence = gap >= 4 ? 'high' : gap >= 2 ? 'medium' : 'low';

  return { topology, scores, confidence };
}
