/* ============================================================
   OrgDesignScan — Survey Logic
   Requires (loaded before this file):
     questions.js  — QUESTIONS array
     scorer.js     — scoreAnswers()
     templates.js  — TEMPLATES object
   ============================================================ */

// ── Load custom questions from admin if saved ────────────────
(function () {
  const stored = localStorage.getItem('ods_questions');
  if (stored) {
    try {
      const custom = JSON.parse(stored);
      if (Array.isArray(custom) && custom.length) {
        QUESTIONS.length = 0;
        custom.forEach(q => QUESTIONS.push(q));
      }
    } catch (e) {}
  }
})();

// ── State ────────────────────────────────────────────────────
let currentIndex = 0;
const answers = {};

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('survey-container')) return;
  const name = sessionStorage.getItem('ods_name') || '';
  const greetingEl = document.getElementById('greeting-name');
  if (greetingEl) greetingEl.textContent = name || 'there';
  renderQuestion();
});

// ── Render question ──────────────────────────────────────────
function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  const container = document.getElementById('survey-container');
  if (!container || !q) return;
  const total = QUESTIONS.length;
  const pct = Math.round((currentIndex / total) * 100);

  const isMulti = q.type === 'multi';

  const optionsHtml = q.options.map((opt, i) => {
    const inputType = isMulti ? 'checkbox' : 'radio';
    const onChange  = isMulti
      ? `onCheckboxChange('${q.id}', this, false)`
      : `onOptionChange('${q.id}', this.value, false)`;
    return `
    <li class="option-item">
      <input type="${inputType}" name="q_${q.id}" id="opt_${q.id}_${i}" value="${escapeAttr(opt)}"
             onchange="${onChange}" />
      <label class="option-label" for="opt_${q.id}_${i}">
        <span class="option-dot"></span>
        ${escapeHtml(opt)}
      </label>
    </li>`;
  }).join('');

  const otherHtml = q.other ? (() => {
    const inputType = isMulti ? 'checkbox' : 'radio';
    const onChange  = isMulti
      ? `onCheckboxChange('${q.id}', this, true)`
      : `onOptionChange('${q.id}', '__other__', true)`;
    return `
    <li class="option-item">
      <input type="${inputType}" name="q_${q.id}" id="opt_${q.id}_other" value="__other__"
             onchange="${onChange}" />
      <label class="option-label" for="opt_${q.id}_other">
        <span class="option-dot"></span>
        Other
      </label>
      <input type="text" class="other-input" id="other_${q.id}"
             placeholder="Please describe…"
             oninput="onOtherInput('${q.id}')" />
    </li>`;
  })() : '';

  container.innerHTML = `
    <div class="question-wrap">
      <div class="progress-wrap">
        <div class="progress-meta">
          <span>${escapeHtml(q.section)}</span>
          <span>Question ${currentIndex + 1} of ${total}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
      </div>

      <div class="question-card">
        <div class="question-number">Question ${currentIndex + 1}</div>
        <div class="question-text">${escapeHtml(q.text)}</div>
        ${q.hint ? `<p class="question-hint">${escapeHtml(q.hint)}</p>` : ''}
        <ul class="options-list">
          ${optionsHtml}
          ${otherHtml}
        </ul>
      </div>

      <div class="question-nav">
        <button class="btn-back" onclick="goBack()" ${currentIndex === 0 ? 'style="visibility:hidden"' : ''}>
          ← Back
        </button>
        <button class="btn btn-primary" id="btn-next" onclick="goNext()" disabled>
          ${currentIndex === total - 1 ? 'Get my diagnosis →' : 'Next →'}
        </button>
      </div>
    </div>
  `;

  // Restore previous answer if navigating back
  if (answers[q.id] !== undefined) {
    if (isMulti && Array.isArray(answers[q.id])) {
      answers[q.id].forEach(val => {
        const idx = q.options.indexOf(val);
        if (idx !== -1) {
          const cb = document.getElementById(`opt_${q.id}_${idx}`);
          if (cb) cb.checked = true;
        } else if (q.other) {
          // "Other" free-text value
          const otherCb    = document.getElementById(`opt_${q.id}_other`);
          const otherInput = document.getElementById(`other_${q.id}`);
          if (otherCb)    otherCb.checked = true;
          if (otherInput) { otherInput.value = val; otherInput.classList.add('visible'); }
        }
      });
      document.getElementById('btn-next').disabled = answers[q.id].length === 0;
    } else {
      const val = answers[q.id];
      const isOther = !q.options.includes(val);
      if (isOther && q.other) {
        const otherRadio = document.getElementById(`opt_${q.id}_other`);
        if (otherRadio) {
          otherRadio.checked = true;
          const otherInput = document.getElementById(`other_${q.id}`);
          if (otherInput) { otherInput.value = val; otherInput.classList.add('visible'); }
        }
      } else {
        const radio = [...document.querySelectorAll(`input[name="q_${q.id}"]`)]
          .find(r => r.value === val);
        if (radio) radio.checked = true;
      }
      document.getElementById('btn-next').disabled = false;
    }
  }
}

function onOptionChange(qId, value, isOther) {
  const otherInput = document.getElementById(`other_${qId}`);
  if (otherInput) {
    otherInput.classList.toggle('visible', isOther);
    if (!isOther) otherInput.value = '';
  }
  if (!isOther) {
    answers[qId] = value;
    document.getElementById('btn-next').disabled = false;
  } else {
    document.getElementById('btn-next').disabled = true;
  }
}

function onOtherInput(qId) {
  const val = document.getElementById(`other_${qId}`).value.trim();
  const q   = QUESTIONS.find(q => q.id === qId);
  if (q && q.type === 'multi') {
    // Keep all known-option answers, replace any previous free-text
    if (!Array.isArray(answers[qId])) answers[qId] = [];
    answers[qId] = answers[qId].filter(a => q.options.includes(a));
    if (val) answers[qId].push(val);
    document.getElementById('btn-next').disabled = answers[qId].length === 0;
  } else {
    answers[qId] = val;
    document.getElementById('btn-next').disabled = val.length === 0;
  }
}

function onCheckboxChange(qId, el, isOther) {
  const q          = QUESTIONS.find(q => q.id === qId);
  const knownOpts  = q ? q.options : [];
  const otherInput = document.getElementById(`other_${qId}`);

  if (isOther) {
    if (otherInput) otherInput.classList.toggle('visible', el.checked);
    if (!el.checked) {
      // Remove any free-text value that was entered
      if (Array.isArray(answers[qId])) {
        answers[qId] = answers[qId].filter(a => knownOpts.includes(a));
      }
    }
    // If just checked but no text yet, Next stays disabled
  } else {
    if (!Array.isArray(answers[qId])) answers[qId] = [];
    if (el.checked) {
      if (!answers[qId].includes(el.value)) answers[qId].push(el.value);
    } else {
      answers[qId] = answers[qId].filter(v => v !== el.value);
    }
  }

  // Enable Next when at least one answer exists (including valid other text)
  const arr        = Array.isArray(answers[qId]) ? answers[qId] : [];
  const otherReady = document.getElementById(`opt_${qId}_other`)?.checked
                     && (otherInput?.value.trim() || '') !== '';
  document.getElementById('btn-next').disabled = !(arr.length > 0 || otherReady);
}

function goNext() {
  const q   = QUESTIONS[currentIndex];
  const ans = answers[q.id];
  const hasAnswer = q.type === 'multi'
    ? Array.isArray(ans) && ans.length > 0
    : !!ans;
  if (!hasAnswer) return;
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    submitSurvey();
  }
}

function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── Submit ───────────────────────────────────────────────────
function submitSurvey() {
  const container = document.getElementById('survey-container');
  container.innerHTML = `
    <div class="loading-wrap">
      <div class="spinner"></div>
      <h3>Analyzing your organization…</h3>
      <p>Matching your answers to known organizational patterns.</p>
    </div>
  `;

  // Small delay so the spinner is visible
  setTimeout(() => {
    const { topology, scores, confidence } = scoreAnswers(answers);
    const tmpl = getContextualTemplate(topology, answers, scores);
    const insights = generateInsights(topology, answers);
    const name     = sessionStorage.getItem('ods_name')     || '';
    const lastname = sessionStorage.getItem('ods_lastname') || '';
    const email    = sessionStorage.getItem('ods_email')    || '';
    const company  = sessionStorage.getItem('ods_company')  || '';
    renderResults(tmpl, name, company, scores, confidence, insights);
    sendSurveyEmail(tmpl, name, lastname, email, company, answers, insights);
  }, 1200);
}

// ── Render Results ───────────────────────────────────────────
function renderResults(tmpl, name, company, scores, confidence, insights) {
  // Store for PDF
  window._result = { tmpl, name, company, scores, insights };
  const ins = insights || {};

  const scoreColor = tmpl.score >= 7 ? 'var(--green)' : tmpl.score >= 4 ? '#D97706' : '#DC2626';

  const severityColor = s =>
    s === 'High'   ? '#991B1B' :
    s === 'Medium' ? '#92400E' : '#166534';
  const severityBg = s =>
    s === 'High'   ? '#FEE2E2' :
    s === 'Medium' ? '#FEF3C7' : 'var(--green-light)';

  const patternsHtml = tmpl.patterns.map(p => `
    <div style="margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid var(--border);">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px; flex-wrap:wrap;">
        <strong style="color:var(--text)">${escapeHtml(p.name)}</strong>
        <span style="display:inline-flex; align-items:center; padding:3px 10px; border-radius:50px;
          font-size:0.78rem; font-weight:700;
          background:${severityBg(p.severity)}; color:${severityColor(p.severity)}">
          ${p.severity} risk
        </span>
      </div>
      <p style="margin:0; font-size:0.9rem; line-height:1.6;">${escapeHtml(p.detail)}</p>
    </div>
  `).join('');

  const strengthsHtml = tmpl.strengths.map(s =>
    `<li style="margin-bottom:8px; font-size:0.9rem;">${escapeHtml(s)}</li>`
  ).join('');

  const recsHtml = tmpl.recommendations.map((r, i) => `
    <div style="display:flex; gap:14px; margin-bottom:16px; align-items:flex-start;">
      <div style="width:26px; height:26px; border-radius:50%; background:var(--green-light);
        color:var(--green); font-weight:700; font-size:0.8rem; display:flex; align-items:center;
        justify-content:center; flex-shrink:0; margin-top:1px;">${i + 1}</div>
      <p style="margin:0; font-size:0.9rem; line-height:1.6;">${escapeHtml(r)}</p>
    </div>
  `).join('');

  const metaLine = [name, company].filter(Boolean).join(' · ');

  document.getElementById('survey-container').innerHTML = `
    <div class="results-wrap">

      <!-- Header -->
      <div class="results-header">
        <p class="section-label">Your diagnosis</p>
        <h2>${escapeHtml(tmpl.topology)}</h2>
        <p style="font-size:0.95rem; font-style:italic; color:var(--text-muted); margin-bottom:8px;">
          ${escapeHtml(tmpl.tagline)}
        </p>
        ${metaLine ? `<p style="font-size:0.85rem; color:var(--text-muted);">${escapeHtml(metaLine)}</p>` : ''}

        <!-- Score + metadata -->
        <div style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin:32px 0 24px;">
          <div style="background:var(--surface); border-radius:var(--radius-lg); padding:24px 40px; text-align:center;">
            <div style="font-family:Georgia,serif; font-size:3.2rem; color:${scoreColor}; line-height:1;">
              ${tmpl.score}<span style="font-size:1.4rem; color:var(--text-muted)">/10</span>
            </div>
            <div style="font-size:0.78rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
              color:var(--text-muted); margin-top:4px;">${escapeHtml(tmpl.scoreLabel)}</div>
          </div>
          <div style="background:var(--surface); border-radius:var(--radius-lg); padding:20px 24px; text-align:left; min-width:220px;">
            <div style="font-size:0.72rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px;">Profile</div>
            <div style="font-size:0.85rem; margin-bottom:6px;"><strong>Optimizes for:</strong> ${escapeHtml(tmpl.optimizesFor)}</div>
            <div style="font-size:0.85rem; margin-bottom:6px;"><strong>Best for:</strong> ${escapeHtml(tmpl.bestFor)}</div>
            <div style="font-size:0.85rem;"><strong>Trade-off:</strong> ${escapeHtml(tmpl.tradeOff)}</div>
          </div>
        </div>

        <p style="max-width:620px; margin:0 auto; font-size:0.95rem; line-height:1.7;">
          ${escapeHtml(tmpl.summary)}
        </p>

      ${ ins.consistencyNote ? `
      <div style="margin:24px auto 0; max-width:620px; background:#FEF3C7; border:1px solid #F59E0B;
        border-radius:var(--radius); padding:16px 20px;">
        <div style="font-size:0.78rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
          color:#92400E; margin-bottom:6px;">⚠ Goal–Structure Tension</div>
        <strong style="font-size:0.9rem; color:#78350F;">${escapeHtml(ins.consistencyNote.title)}</strong>
        <p style="margin:8px 0 0; font-size:0.85rem; line-height:1.6; color:#92400E;">${escapeHtml(ins.consistencyNote.detail)}</p>
      </div>` : '' }
      </div>

      <!-- Patterns -->
      <div class="diagnosis-card">
        <h3>Patterns detected in your organization</h3>
        ${patternsHtml}
      </div>

      <!-- AI ceiling -->
      <div class="diagnosis-card" style="border-left:3px solid var(--teal);">
        <h3 style="margin-bottom:12px;">How AI typically gets used here — and why it hits a ceiling</h3>
        <p style="font-size:0.9rem; line-height:1.7; margin:0;">${tmpl.aiCeiling}</p>
      </div>

      ${ ins.delayRisks && ins.delayRisks.length > 0 ? `
      <div class="diagnosis-card" style="border-left:3px solid #F59E0B;">
        <h3 style="margin-bottom:16px;">Where AI will specifically hit a wall in your organization</h3>
        ${ins.delayRisks.map((r, i) => `
          <div style="margin-bottom:${i < ins.delayRisks.length - 1 ? '20px' : '0'}; padding-bottom:${i < ins.delayRisks.length - 1 ? '20px' : '0'}; border-bottom:${i < ins.delayRisks.length - 1 ? '1px solid var(--border)' : 'none'};">
            <strong style="font-size:0.9rem;">${escapeHtml(r.title)}</strong>
            <p style="font-size:0.9rem; line-height:1.7; margin:8px 0 0;">${escapeHtml(r.detail)}</p>
          </div>`).join('')}
      </div>` : '' }

      <!-- Strengths + Recommendations -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
        <div class="diagnosis-card">
          <h3>Strengths</h3>
          <ul style="padding-left:18px; margin-top:8px;">${strengthsHtml}</ul>
        </div>
        <div class="diagnosis-card">
          <h3>Top recommendations</h3>
          <div style="margin-top:8px;">${recsHtml}</div>
        </div>
      </div>

      ${ ins.futureGap ? `
      <div class="diagnosis-card" style="border-left:3px solid var(--indigo, #4338CA);">
        <h3 style="margin-bottom:8px;">${escapeHtml(ins.futureGap.title)}</h3>
        <p style="font-size:0.9rem; line-height:1.7; margin:0;">${escapeHtml(ins.futureGap.detail)}</p>
      </div>` : '' }

      <!-- CTA -->
      <div class="results-cta">
        <h3>Go deeper — talk to an expert</h3>
        <p>This free survey gives you a directional overview of your organization's AI readiness. But an overview is not enough to drive real change — it will raise questions, and it is not sufficiently detailed to base an organizational redesign on.</p>
        <p style="margin-top:12px;">Contact us to discuss your results and learn how the on-site AI-readiness scan can give you the depth and specificity you need to act.</p>
        <div class="results-cta-buttons">
          <button class="btn btn-teal" onclick="openSurveyOnsiteModal()">
            Book an appointment
          </button>
          <button class="btn btn-outline" id="btn-send-pdf"
            style="color:white; border-color:rgba(255,255,255,0.5);"
            onclick="requestReportEmail(this)">
            ↓ Send me the PDF
          </button>
        </div>
      </div>

      <!-- Disclaimer -->
      <p style="margin-top:32px; font-size:0.75rem; color:var(--text-muted); line-height:1.6; text-align:center;">
        This report was generated automatically based on your survey responses. No rights can be derived from its contents without prior consultation with one of our experts.
      </p>

    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Send report to user's email ──────────────────────────────
function requestReportEmail(btn) {
  const { tmpl, name, company, insights: ins } = window._result || {};
  if (!tmpl) return;
  const email    = sessionStorage.getItem('ods_email')    || '';
  const lastname = sessionStorage.getItem('ods_lastname') || '';
  if (!email) {
    btn.textContent = '⚠ No email on file';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Sending…';
  sendReportToUser(tmpl, name, lastname, email, company, ins)
    .then(() => {
      btn.textContent = '✓ Sent to ' + email;
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = '↓ Send me the PDF';
    });
}

function downloadReport() {
  const { tmpl, name, company } = window._result;
  if (!tmpl) return;

  const date = new Date().toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const patternsRows = tmpl.patterns.map(p =>
    `<tr>
      <td><strong>${p.name}</strong></td>
      <td style="text-align:center; white-space:nowrap;">${p.severity}</td>
      <td>${p.detail}</td>
    </tr>`
  ).join('');

  const strengthsItems = tmpl.strengths.map(s => `<li>${s}</li>`).join('');
  const recsItems = tmpl.recommendations.map((r, i) =>
    `<li><strong>${i + 1}.</strong> ${r}</li>`
  ).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OrgDesignScan Report — ${company || 'Your Organization'}</title>
<style>
  @media print {
    body { margin: 0; }
    .no-print { display: none; }
  }
  body {
    font-family: Georgia, serif;
    color: #111827;
    max-width: 760px;
    margin: 40px auto;
    padding: 0 32px;
    line-height: 1.65;
  }
  .logo { font-size: 22px; color: #4338CA; font-weight: bold; margin-bottom: 4px; }
  .logo span { color: #06B6D4; }
  .meta { color: #6B7280; font-size: 13px; margin-bottom: 32px; }
  h1 { color: #4338CA; font-size: 26px; margin: 8px 0 4px; }
  .tagline { font-style: italic; color: #6B7280; font-size: 15px; margin-bottom: 20px; }
  h2 { color: #4338CA; font-size: 17px; margin-top: 36px; border-bottom: 1px solid #C7D2FE;
       padding-bottom: 6px; }
  .score-row { display: flex; gap: 24px; margin: 24px 0; flex-wrap: wrap; }
  .score-box { background: #F8FAFF; border-radius: 10px; padding: 20px 32px; text-align: center; }
  .score-num { font-size: 44px; color: #4338CA; line-height: 1; }
  .score-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #6B7280; margin-top: 4px; }
  .profile-box { background: #F8FAFF; border-radius: 10px; padding: 16px 20px; font-size: 14px; }
  .profile-box div { margin-bottom: 5px; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  th { background: #EEF1FF; padding: 9px 11px; text-align: left; }
  td { padding: 9px 11px; border-bottom: 1px solid #EEF1FF; vertical-align: top; }
  ul { padding-left: 20px; margin: 8px 0; }
  li { margin-bottom: 7px; font-size: 14px; }
  .ai-box { border-left: 3px solid #06B6D4; padding: 16px 20px; background: #F0FDFF;
            border-radius: 0 8px 8px 0; margin-top: 12px; font-size: 14px; }
  .cta { background: #4338CA; color: white; border-radius: 10px; padding: 24px 28px; margin-top: 36px; }
  .cta h2 { color: white; border: none; margin-top: 0; }
  .cta p { color: rgba(255,255,255,.85); font-size: 14px; margin: 8px 0; }
  .cta a { color: #93C5FD; }
  .footer { margin-top: 48px; font-size: 11px; color: #9CA3AF; border-top: 1px solid #E5E7EB;
            padding-top: 14px; }
  .print-btn { margin: 24px 0; padding: 12px 24px; background: #4338CA; color: white;
               border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
</style>
</head>
<body>

<div class="no-print">
  <button class="print-btn" onclick="window.print()">🖨 Print / Save as PDF</button>
</div>

<div class="logo">OrgDesign<span>Scan</span></div>
<div class="meta">AI Readiness Report &nbsp;·&nbsp; ${name ? escapeHtml(name) + ' &nbsp;·&nbsp; ' : ''}${company ? escapeHtml(company) + ' &nbsp;·&nbsp; ' : ''}${date}</div>

<h1>${escapeHtml(tmpl.topology)}</h1>
<div class="tagline">${escapeHtml(tmpl.tagline)}</div>

<div class="score-row">
  <div class="score-box">
    <div class="score-num">${tmpl.score}/10</div>
    <div class="score-lbl">${escapeHtml(tmpl.scoreLabel)}</div>
  </div>
  <div class="profile-box">
    <div><strong>Optimizes for:</strong> ${escapeHtml(tmpl.optimizesFor)}</div>
    <div><strong>Best for:</strong> ${escapeHtml(tmpl.bestFor)}</div>
    <div><strong>Trade-off:</strong> ${escapeHtml(tmpl.tradeOff)}</div>
  </div>
</div>

<p style="font-size:14px;">${escapeHtml(tmpl.summary)}</p>

<h2>Patterns Detected</h2>
<table>
  <thead><tr><th>Pattern</th><th>Risk</th><th>What it means for AI</th></tr></thead>
  <tbody>${patternsRows}</tbody>
</table>

<h2>How AI Gets Used Here — and Why It Hits a Ceiling</h2>
<div class="ai-box">${tmpl.aiCeiling}</div>

<h2>Strengths</h2>
<ul>${strengthsItems}</ul>

<h2>Top Recommendations</h2>
<ul>${recsItems}</ul>

<div class="cta">
  <h2>Next step: 1-day On-site OrgDesignScan</h2>
  <p>${escapeHtml(tmpl.onsiteValue)}</p>
  <p><a href="https://10xorg.com">10xorg.com</a> &nbsp;·&nbsp; Powered by Org Topologies™</p>
</div>

<div class="footer">
  Generated by OrgDesignScan &nbsp;·&nbsp; orgdesignscan.com &nbsp;·&nbsp;
  Powered by Org Topologies™ methodology
</div>

</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = (company || 'Report').replace(/\s+/g, '_');
  a.download = `OrgDesignScan_${safeName}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Utilities ────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
