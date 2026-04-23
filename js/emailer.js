/* ============================================================
   OrgDesignScan — Email Notifications via EmailJS
   Requires EmailJS SDK loaded before this file.
   ============================================================ */

function initEmailJS() {
  const key = window.ODS_CONFIG?.emailjs?.publicKey;
  if (typeof emailjs === 'undefined' || !key || key.startsWith('YOUR_')) return;
  emailjs.init({ publicKey: key });
}

/* ── Contact form submission ─────────────────────────────────
   Triggered when visitor fills in the landing page modal.     */
function sendContactEmail(firstname, lastname, email, company, subject) {
  if (!_emailjsReady()) return;
  subject = subject || 'orgscan - coldcontact form submission';
  const cfg = window.ODS_CONFIG.emailjs;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111827;">
      <div style="background:#4338CA;padding:20px 28px;border-radius:8px 8px 0 0;">
        <h2 style="color:white;margin:0;font-size:18px;">OrgDesignScan — New Contact</h2>
      </div>
      <div style="padding:24px 28px;background:#F8FAFF;border:1px solid #E0E7FF;border-top:0;border-radius:0 0 8px 8px;">
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;width:110px;font-size:14px;">Name</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">${firstname} ${lastname}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;font-size:14px;">Email</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">
              <a href="mailto:${email}" style="color:#4338CA;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;font-size:14px;">Company</td>
            <td style="padding:10px 12px;font-size:14px;">${company || '—'}</td>
          </tr>
        </table>
      </div>
    </div>`;

  emailjs.send(cfg.serviceId, cfg.templateId, {
    to_email:     'roland@orgtopologies.com',
    subject:      subject,
    message_html: html,
    from_name:    `${firstname} ${lastname}`,
    reply_to:     email,
  }).catch(() => {});
}

/* ── Survey submission ───────────────────────────────────────
   Triggered after survey is scored. Sends full result +
   submitted answers to roland@orgtopologies.com.             */
function sendSurveyEmail(tmpl, firstname, lastname, email, company, answers, insights) {
  if (!_emailjsReady()) return;
  const cfg = window.ODS_CONFIG.emailjs;

  // Build answers rows — uses QUESTIONS array from questions.js
  const answersRows = (typeof QUESTIONS !== 'undefined' ? QUESTIONS : []).map(q => {
    const ans = answers[q.id] || '—';
    return `<tr>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;vertical-align:top;width:48%;">${q.text}</td>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;vertical-align:top;">${ans}</td>
    </tr>`;
  }).join('');

  // Patterns table
  const patternsRows = tmpl.patterns.map(p => {
    const riskColor = p.severity === 'High' ? '#DC2626' : p.severity === 'Medium' ? '#D97706' : '#16A34A';
    return `<tr>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;vertical-align:top;width:36%;">
        <strong>${p.name}</strong>
      </td>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;text-align:center;white-space:nowrap;color:${riskColor};font-weight:bold;">
        ${p.severity}
      </td>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;vertical-align:top;">
        ${p.detail}
      </td>
    </tr>`;
  }).join('');

  // Recommendations list
  const recsHtml = tmpl.recommendations.map((r, i) =>
    `<li style="margin-bottom:8px;font-size:13px;line-height:1.5;">${r}</li>`
  ).join('');

  const scoreColor = tmpl.score >= 7 ? '#16A34A' : tmpl.score >= 4 ? '#D97706' : '#DC2626';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:700px;color:#111827;">

      <!-- Header -->
      <div style="background:#4338CA;padding:24px 28px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">OrgDesignScan — Survey Submission</h1>
      </div>

      <div style="padding:28px;background:#F8FAFF;border:1px solid #E0E7FF;border-top:0;">

        <!-- Contact -->
        <h2 style="color:#4338CA;font-size:15px;margin-top:0;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Contact Details</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:28px;">
          <tr>
            <td style="padding:9px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;font-size:14px;width:110px;">Name</td>
            <td style="padding:9px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">${firstname} ${lastname}</td>
          </tr>
          <tr>
            <td style="padding:9px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;font-size:14px;">Email</td>
            <td style="padding:9px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">
              <a href="mailto:${email}" style="color:#4338CA;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:9px 12px;font-weight:bold;font-size:14px;">Company</td>
            <td style="padding:9px 12px;font-size:14px;">${company || '—'}</td>
          </tr>
        </table>

        <!-- Diagnosis -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Diagnosis Result</h2>
        <div style="background:white;border-radius:8px;padding:20px;margin-bottom:28px;border:1px solid #E0E7FF;">
          <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
            <tr>
              <td style="width:130px;padding-right:20px;vertical-align:middle;">
                <div style="text-align:center;padding:16px;background:#F8FAFF;border-radius:8px;">
                  <div style="font-size:36px;font-weight:bold;color:${scoreColor};line-height:1;">${tmpl.score}/10</div>
                  <div style="font-size:11px;text-transform:uppercase;color:#6B7280;letter-spacing:.08em;margin-top:4px;">${tmpl.scoreLabel}</div>
                </div>
              </td>
              <td style="vertical-align:top;">
                <h3 style="margin:0 0 4px;color:#4338CA;font-size:17px;">${tmpl.topology}</h3>
                <p style="margin:0 0 8px;font-style:italic;color:#6B7280;font-size:13px;">${tmpl.tagline}</p>
                <p style="margin:0 0 4px;font-size:13px;"><strong>Optimizes for:</strong> ${tmpl.optimizesFor}</p>
                <p style="margin:0 0 4px;font-size:13px;"><strong>Best for:</strong> ${tmpl.bestFor}</p>
                <p style="margin:0;font-size:13px;"><strong>Trade-off:</strong> ${tmpl.tradeOff}</p>
              </td>
            </tr>
          </table>
          <p style="font-size:14px;margin:0;line-height:1.65;color:#374151;">${tmpl.summary}</p>
        </div>

        <!-- Patterns -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Patterns Detected</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:28px;">
          <thead>
            <tr style="background:#EEF2FF;">
              <th style="padding:9px 11px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Pattern</th>
              <th style="padding:9px 11px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:80px;">Risk</th>
              <th style="padding:9px 11px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Detail</th>
            </tr>
          </thead>
          <tbody>${patternsRows}</tbody>
        </table>

        <!-- Recommendations -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Recommendations</h2>
        <ol style="padding-left:18px;margin:0 0 28px;">${recsHtml}</ol>

        <!-- Answers -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Submitted Answers</h2>
        <table style="border-collapse:collapse;width:100%;">
          <thead>
            <tr style="background:#EEF2FF;">
              <th style="padding:9px 11px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Question</th>
              <th style="padding:9px 11px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Answer</th>
            </tr>
          </thead>
          <tbody>${answersRows}</tbody>
        </table>

        ${ insights && insights.consistencyNote ? `<p><strong>Consistency note:</strong> ${insights.consistencyNote.title}</p>` : '' }
        ${ insights && insights.delayRisk ? `<p><strong>Delay risk:</strong> ${insights.delayRisk.title}</p>` : '' }
        ${ insights && insights.futureGap ? `<p><strong>Future gap:</strong> ${insights.futureGap.title}</p>` : '' }

      </div>

      <!-- Footer -->
      <div style="padding:14px 28px;background:#EEF2FF;border-radius:0 0 8px 8px;font-size:12px;color:#6B7280;text-align:center;">
        OrgDesignScan &nbsp;·&nbsp; orgdesignscan.com &nbsp;·&nbsp; Powered by Org Topologies™
      </div>

    </div>`;

  emailjs.send(cfg.serviceId, cfg.templateId, {
    to_email:     'roland@orgtopologies.com',
    subject:      'orgscan - survey submission',
    message_html: html,
    from_name:    `${firstname} ${lastname}`,
    reply_to:     email,
  }).catch(() => {});
}

/* ── Onsite scan request ─────────────────────────────────────
   Triggered from about.html contact form. Includes phone.     */
function sendOnsiteEmail(firstname, lastname, email, phone, company) {
  if (!_emailjsReady()) return;
  const cfg = window.ODS_CONFIG.emailjs;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111827;">
      <div style="background:#4338CA;padding:20px 28px;border-radius:8px 8px 0 0;">
        <h2 style="color:white;margin:0;font-size:18px;">On-site AI-readiness Scan Request</h2>
      </div>
      <div style="padding:24px 28px;background:#F8FAFF;border:1px solid #E0E7FF;border-top:0;border-radius:0 0 8px 8px;">
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;width:110px;font-size:14px;">Name</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">${firstname} ${lastname}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;font-size:14px;">Email</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">
              <a href="mailto:${email}" style="color:#4338CA;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-weight:bold;font-size:14px;">Phone</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E0E7FF;font-size:14px;">${phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;font-size:14px;">Company</td>
            <td style="padding:10px 12px;font-size:14px;">${company || '—'}</td>
          </tr>
        </table>
      </div>
    </div>`;

  emailjs.send(cfg.serviceId, cfg.templateId, {
    to_email:     'roland@orgtopologies.com',
    subject:      'orgscan - request for on-site AI-readiness Scan',
    message_html: html,
    from_name:    `${firstname} ${lastname}`,
    reply_to:     email,
  }).catch(() => {});
}

/* ── Report email to user ────────────────────────────────────
   Triggered when user clicks "Send me the PDF".
   Returns a Promise so the button can show success/failure.   */
function sendReportToUser(tmpl, firstname, lastname, email, company, insights) {
  if (!_emailjsReady()) return Promise.reject('EmailJS not ready');
  const cfg = window.ODS_CONFIG.emailjs;

  const date = new Date().toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const _e = s => String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const scoreColor = tmpl.score >= 7 ? '#16A34A' : tmpl.score >= 4 ? '#D97706' : '#DC2626';

  const patternsRows = tmpl.patterns.map(p => {
    const c = p.severity === 'High' ? '#DC2626' : p.severity === 'Medium' ? '#D97706' : '#16A34A';
    return `<tr>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;vertical-align:top;width:36%;"><strong>${_e(p.name)}</strong></td>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;text-align:center;color:${c};font-weight:bold;white-space:nowrap;">${_e(p.severity)}</td>
      <td style="padding:8px 11px;border-bottom:1px solid #E0E7FF;font-size:13px;vertical-align:top;">${_e(p.detail)}</td>
    </tr>`;
  }).join('');

  const strengthsItems = tmpl.strengths.map(s =>
    `<li style="margin-bottom:6px;font-size:13px;">${_e(s)}</li>`
  ).join('');

  const recsItems = tmpl.recommendations.map((r, i) =>
    `<li style="margin-bottom:8px;font-size:13px;line-height:1.5;">${_e(r)}</li>`
  ).join('');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:700px;color:#111827;">

      <div style="background:#4338CA;padding:24px 28px;border-radius:8px 8px 0 0;">
        <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:4px;">OrgDesignScan · AI Readiness Report</div>
        <h1 style="color:white;margin:0;font-size:22px;">${_e(tmpl.topology)}</h1>
        <div style="color:rgba(255,255,255,0.8);font-style:italic;font-size:14px;margin-top:4px;">${_e(tmpl.tagline)}</div>
      </div>

      <div style="padding:28px;background:#F8FAFF;border:1px solid #E0E7FF;border-top:0;">

        <!-- Score + profile -->
        <table style="border-collapse:collapse;width:100%;margin-bottom:28px;">
          <tr>
            <td style="width:130px;padding-right:20px;vertical-align:middle;">
              <div style="text-align:center;padding:16px;background:white;border-radius:8px;border:1px solid #E0E7FF;">
                <div style="font-size:38px;font-weight:bold;color:${scoreColor};line-height:1;">${tmpl.score}/10</div>
                <div style="font-size:11px;text-transform:uppercase;color:#6B7280;letter-spacing:.08em;margin-top:4px;">${_e(tmpl.scoreLabel)}</div>
              </div>
            </td>
            <td style="vertical-align:top;font-size:13px;">
              <div style="margin-bottom:5px;"><strong>Optimizes for:</strong> ${_e(tmpl.optimizesFor)}</div>
              <div style="margin-bottom:5px;"><strong>Best for:</strong> ${_e(tmpl.bestFor)}</div>
              <div style="margin-bottom:12px;"><strong>Trade-off:</strong> ${_e(tmpl.tradeOff)}</div>
              <div style="font-size:13px;line-height:1.65;color:#374151;">${_e(tmpl.summary)}</div>
            </td>
          </tr>
        </table>

        <!-- Patterns -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Patterns Detected</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:28px;">
          <thead>
            <tr style="background:#EEF2FF;">
              <th style="padding:9px 11px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Pattern</th>
              <th style="padding:9px 11px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:70px;">Risk</th>
              <th style="padding:9px 11px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Detail</th>
            </tr>
          </thead>
          <tbody>${patternsRows}</tbody>
        </table>

        <!-- Strengths -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Strengths</h2>
        <ul style="padding-left:18px;margin:0 0 28px;">${strengthsItems}</ul>

        <!-- Recommendations -->
        <h2 style="color:#4338CA;font-size:15px;border-bottom:2px solid #E0E7FF;padding-bottom:8px;">Recommendations</h2>
        <ol style="padding-left:18px;margin:0 0 28px;">${recsItems}</ol>

        <!-- CTA -->
        <div style="background:#4338CA;border-radius:8px;padding:24px 28px;">
          <h2 style="color:white;font-size:16px;margin:0 0 10px;">Your next step: a free call</h2>
          <p style="color:rgba(255,255,255,0.9);font-size:13px;margin:0 0 10px;line-height:1.7;">
            This QuickScan gives you a directional diagnosis — but every organization is different, and the scan will
            have raised questions worth exploring. Book a free call to discuss your results with
            <strong style="color:white;">Roland Flemm</strong>, an organizational design expert and
            co-author of the best-selling book
            <a href="https://10xorg.com" style="color:#93C5FD;font-style:italic;">10X ORG</a>.
          </p>
          <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0 0 20px;line-height:1.6;">
            No pitch. No obligation. Just a conversation about what the results mean for your organization
            and where to go next.
          </p>
          <a href="https://calendly.com/roland-flemm/30min?back=1"
            style="display:inline-block;background:white;color:#4338CA;font-weight:700;font-size:14px;
                   padding:12px 24px;border-radius:6px;text-decoration:none;">
            Book a free appointment →
          </a>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:16px 0 0;">
            Powered by <a href="https://www.orgtopologies.com" style="color:rgba(255,255,255,0.5);">Org Topologies™</a>
          </p>
        </div>

      </div>

      ${ insights && insights.consistencyNote ? `
      <div style="margin:20px 28px; background:#FEF3C7; border:1px solid #F59E0B; border-radius:8px; padding:16px 20px;">
        <div style="font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#92400E; margin-bottom:6px;">⚠ Goal–Structure Tension</div>
        <strong style="font-size:14px; color:#78350F;">${insights.consistencyNote.title}</strong>
        <p style="margin:8px 0 0; font-size:13px; line-height:1.6; color:#92400E;">${insights.consistencyNote.detail}</p>
      </div>` : '' }

      ${ insights && insights.delayRisk ? `
      <div style="margin:20px 28px; border-left:3px solid #F59E0B; padding:16px 20px; background:#FFFBEB; border-radius:0 8px 8px 0;">
        <div style="font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#92400E; margin-bottom:8px;">Where AI will specifically hit a wall</div>
        <strong style="font-size:14px; color:#78350F;">${insights.delayRisk.title}</strong>
        <p style="margin:8px 0 0; font-size:13px; line-height:1.6; color:#374151;">${insights.delayRisk.detail}</p>
      </div>` : '' }

      ${ insights && insights.futureGap ? `
      <div style="margin:20px 28px; border-left:3px solid #4338CA; padding:16px 20px; background:#EEF2FF; border-radius:0 8px 8px 0;">
        <div style="font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#312E81; margin-bottom:8px;">Your goal — what AI will and won't give you</div>
        <strong style="font-size:14px; color:#312E81;">${insights.futureGap.title}</strong>
        <p style="margin:8px 0 0; font-size:13px; line-height:1.6; color:#374151;">${insights.futureGap.detail}</p>
      </div>` : '' }

      <div style="padding:12px 28px 0;font-size:11px;color:#9CA3AF;text-align:center;line-height:1.6;">
        This report was generated automatically based on survey responses. No rights can be derived from its contents without prior consultation with one of our experts.
      </div>

      <div style="padding:14px 28px;background:#EEF2FF;border-radius:0 0 8px 8px;font-size:12px;color:#6B7280;text-align:center;">
        Generated by OrgDesignScan &nbsp;·&nbsp; orgdesignscan.com &nbsp;·&nbsp; ${date}
      </div>

    </div>`;

  return emailjs.send(cfg.serviceId, cfg.templateId, {
    to_email:     email,
    subject:      `Your OrgDesignScan Report — ${tmpl.topology}`,
    message_html: html,
    from_name:    'OrgDesignScan',
    reply_to:     'roland@orgtopologies.com',
  });
}

/* ── Internal helper ────────────────────────────────────────── */
function _emailjsReady() {
  if (typeof emailjs === 'undefined') return false;
  const cfg = window.ODS_CONFIG?.emailjs;
  if (!cfg?.serviceId || !cfg?.templateId || cfg.serviceId.startsWith('YOUR_')) return false;
  return true;
}
