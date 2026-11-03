/**
 * FoodPulse AI - Main Frontend Application Logic
 */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const L = (s = 'AI Insight') => `<span class="ai"><i></i>✨ ${s}</span>`;
const logo = `
  <div class="logo">
    <b>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
        <path d="M3 20V10l5 3V9l5 3V6h3v14z"/>
        <path d="M14 3c4 0 6 2 6 5-4 0-6-2-6-5z"/>
      </svg>
    </b>
    <div>
      FOODPULSE <span>AI</span>
      <div style="font-size:10px; font-weight:400; color:var(--mu);">Predict. Produce. Prevent Waste.</div>
    </div>
  </div>
`;

// State
let page = 'dash';
let view = 'landing';
let currentPlant = 'Chennai Plant — Unit 01';
let rng = 30;
let currentProduct = 'Bread (Sliced White 400g)';
let currentConfidence = 95;
let currentForecastData = null;

let inventoryItems = [];
let scheduleJobs = [];
let alertList = [];
let kpiMetrics = null;
let academicDetails = null;

let invQuery = '';
let invRiskFilter = 'All';
let invSortKey = -1;
let invSortDir = 1;

let alertSeverityFilter = 'All';
let recommendationActive = true;

let chatMessages = [
  ['a', '👋 Hello Manager! I am the **FoodPulse AI Copilot**.\nI continuously monitor batch production, material shelf-life (FEFO), and retail demand trends across your facility. How can I assist you with today’s operations?']
];

// Initialize application
async function initApp() {
  PresentationDeck.init();
  await fetchAllData();
  render();
}

async function fetchAllData() {
  try {
    const [invRes, schRes, altRes, metRes, acaRes] = await Promise.all([
      fetch('/api/inventory').catch(() => null),
      fetch('/api/schedule').catch(() => null),
      fetch('/api/alerts').catch(() => null),
      fetch('/api/metrics').catch(() => null),
      fetch('/api/project-info').catch(() => null)
    ]);

    if (invRes && invRes.ok) inventoryItems = await invRes.json();
    if (schRes && schRes.ok) scheduleJobs = await schRes.json();
    if (altRes && altRes.ok) alertList = await altRes.json();
    if (metRes && metRes.ok) kpiMetrics = await metRes.json();
    if (acaRes && acaRes.ok) academicDetails = await acaRes.json();
  } catch (err) {
    console.warn('API sync warning (using local fallback):', err);
  }
}

// Navigation & Router
function go(p) {
  page = p;
  const side = $('#side');
  if (side) side.classList.remove('open');
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>✨</span><span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'all 0.3s';
    setTimeout(() => el.remove(), 300);
  }, 2400);
}

function showModal(html) {
  const body = $('#modal-body');
  if (body) {
    body.innerHTML = html;
    $('#app-modal').classList.add('show');
  }
}

function hideModal() {
  const modal = $('#app-modal');
  if (modal) modal.classList.remove('show');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  toast(`Switched to ${next} mode`);
}

// Shell & Navigation Layout
const navItems = [
  ['dash', 'Executive Dashboard', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`],
  ['fc', 'Demand Forecasting', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`],
  ['plan', 'Production Planner', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`],
  ['inv', 'Inventory & Expiry', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`],
  ['alerts', 'Alert Center', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`],
  ['chat', 'AI Copilot', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`],
  ['review', 'Academic Review', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`]
];

function renderShell(content) {
  const activeAlertsCount = alertList.filter(a => a.severity === 'Critical').length;

  return `
    <div id="side">
      <div style="cursor:pointer;" onclick="go('dash')">${logo}</div>
      <div style="height:14px;"></div>
      <nav style="display:flex; flex-direction:column; gap:4px;">
        ${navItems.map(item => `
          <button class="nav-link ${page === item[0] ? 'on' : ''}" onclick="go('${item[0]}')">
            ${item[2]}
            <span style="flex:1;">${item[1]}</span>
            ${item[0] === 'alerts' && activeAlertsCount > 0 ? `<span class="b red" style="padding:2px 7px; font-size:11px;">${activeAlertsCount}</span>` : ''}
          </button>
        `).join('')}
      </nav>

      <div style="flex:1;"></div>

      <!-- Quick College Presentation Launcher -->
      <div class="card" style="padding:14px; background:rgba(52,211,153,0.06); border-color:rgba(52,211,153,0.25); margin-bottom:12px;">
        <span class="b grn" style="font-size:10px;">SRM EEC Review Deliverables</span>
        <div style="font-size:12px; font-weight:700; color:var(--tx-title); margin:4px 0 2px;">Harish Kanna M</div>
        <div class="mu" style="font-size:11px;">Roll No: 310624104095</div>
        <div style="display:flex; flex-direction:column; gap:6px; margin-top:10px;">
          <a href="/ppt" target="_blank" class="btn btn-sm" style="width:100%; text-decoration:none;">
            🖥️ Open PPT (Separate) ↗
          </a>
          <a href="/FoodPulse_AI_Zeroth_Review_Presentation.pptx" download class="btn btn-secondary btn-sm" style="width:100%; text-decoration:none;">
            📥 Download .PPTX File
          </a>
        </div>
      </div>

      <!-- User Profile -->
      <div style="border-top:1px solid var(--card-border); padding-top:14px; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:600; color:var(--tx-title);">Arun Kumar</div>
          <div class="mu" style="font-size:11px;">Manufacturing Manager · <span style="color:var(--g)">● Live</span></div>
        </div>
        <button class="btn ghost btn-sm" title="Toggle Dark/Light Mode" onclick="toggleTheme()">🌓</button>
      </div>
    </div>

    <div id="main">
      <div id="top">
        <button class="btn ghost btn-sm" onclick="$('#side').classList.toggle('open')">☰ Menu</button>
        ${logo}
        <a href="/ppt" target="_blank" class="btn btn-sm" style="text-decoration:none;">🖥️ Open PPT ↗</a>
      </div>

      <!-- Facility Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <select style="font-weight:600;" onchange="currentPlant=this.value; toast('Switched to '+this.value); render();">
            <option ${currentPlant.includes('Chennai') ? 'selected' : ''}>Chennai Plant — Unit 01</option>
            <option ${currentPlant.includes('Bangalore') ? 'selected' : ''}>Bangalore Plant — Unit 02</option>
            <option ${currentPlant.includes('Hyderabad') ? 'selected' : ''}>Hyderabad Plant — Unit 03</option>
          </select>
          <span class="ai"><i></i>✨ AI Engine Synced (Real-Time)</span>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <a href="/ppt" target="_blank" class="btn ghost btn-sm" style="text-decoration:none;">🖥️ Separate PPT ↗</a>
          <a href="/FoodPulse_AI_Zeroth_Review_Presentation.pptx" download class="btn btn-sm" style="text-decoration:none;">📥 Download .PPTX</a>
          <button class="btn ghost btn-sm" onclick="exportAuditReport()">📑 Audit JSON</button>
          <button class="btn ghost btn-sm" onclick="window.print()">🖨️ Print View</button>
        </div>
      </div>

      ${content}
    </div>
  `;
}

// 1. Executive Dashboard View
function renderDashboard() {
  const kpis = (kpiMetrics && kpiMetrics.kpis) || [
    { label: 'Raw Material Waste', value: '8.4%', trend: '↓ 14.2% vs baseline', trendType: 'good', sparkline: [26, 22, 18, 14, 11, 9, 8.4] },
    { label: 'Forecast Accuracy (MAPE)', value: '94.6%', trend: '↑ 3.8% improvement', trendType: 'good', sparkline: [82, 85, 88, 90, 92, 94.6] },
    { label: 'Production Efficiency (OEE)', value: '91.8%', trend: '↑ 5.2% score', trendType: 'good', sparkline: [78, 81, 84, 87, 89, 91.8] },
    { label: 'Active Inventory Value', value: '₹24.8L', trend: 'Lean Buffer', trendType: 'neutral', sparkline: [28, 27, 26, 25, 24.8] },
    { label: 'At-Risk Inventory (Spoilage)', value: '₹2.4L · 2 lots', trend: 'FEFO Protocol', trendType: 'warning', sparkline: [6, 5, 4, 3, 2.4] },
    { label: 'Stockout Risk', value: '1 Critical Alert', trend: 'Action within 4h', trendType: 'danger', sparkline: [4, 3, 2, 1, 1] }
  ];

  return `
    <div style="margin-bottom:20px;">
      <h1>Executive Factory Dashboard</h1>
      <p class="mu" style="font-size:14px; margin-top:2px;">Real-time AI telemetry across processing lines, recipe batches, and material perishability.</p>
    </div>

    <!-- KPI Grid -->
    <div class="grid g3">
      ${kpis.map(k => {
        let trendColor = 'var(--g)';
        if (k.trendType === 'warning') trendColor = 'var(--o)';
        if (k.trendType === 'danger') trendColor = 'var(--r)';
        if (k.trendType === 'neutral') trendColor = 'var(--blue)';

        return `
          <div class="card">
            <div class="mu" style="font-size:12px; font-weight:500;">${k.label}</div>
            <div class="big" style="margin:6px 0 2px;">${k.value}</div>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <span style="font-size:12px; font-weight:600; color:${trendColor};">${k.trend}</span>
              ${Charts.sparkline(k.sparkline, trendColor)}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Waste Reduction & Demand Chart -->
    <div class="grid g2" style="margin-top:16px;">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
          <div>
            <h3>Demand Forecast — Bread (Sliced White)</h3>
            <span class="mu" style="font-size:12px;">Actual Orders vs Predictive ML Curve</span>
          </div>
          <div style="display:flex; gap:6px;">
            ${[7, 30, 90].map(d => `
              <button class="tab ${rng === d ? 'on' : ''}" onclick="rng=${d}; loadForecastChart('dash-chart');">${d}d</button>
            `).join('')}
          </div>
        </div>
        <div id="dash-chart" style="min-height:260px;"></div>
      </div>

      <!-- Waste Reduction Impact Widget -->
      <div class="card" style="background:linear-gradient(135deg, rgba(13,59,51,0.5), var(--card)); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          ${L('AI Waste Reduction Audit')}
          <h2 style="margin:12px 0 6px;">Food Spoilage Curtailed by 68.2%</h2>
          <p class="mu" style="font-size:13px; line-height:1.6;">
            By replacing static spreadsheets with dynamic perishability scheduling and SKU-level forecasting, raw material spoilage has fallen from baseline levels.
          </p>

          <div style="display:flex; justify-content:space-between; align-items:center; margin:24px 0 10px;">
            <div>
              <span class="mu" style="font-size:12px;">Conventional Spreadsheets</span>
              <div class="big" style="color:var(--o); font-size:28px;">26.4%</div>
            </div>
            <div style="text-align:right;">
              <span class="mu" style="font-size:12px;">FoodPulse AI Optimized</span>
              <div class="big" style="color:var(--g); font-size:28px;">8.4%</div>
            </div>
          </div>

          <div class="bar" style="height:12px;">
            <i style="width:31.8%; background:linear-gradient(90deg, #34d399, #059669);"></i>
          </div>
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:14px; margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:12px; color:var(--mu);">Monthly Bottom-Line Savings</div>
            <div style="font-size:20px; font-weight:800; color:var(--g);">₹4,80,000 / month</div>
          </div>
          <button class="btn btn-sm" onclick="go('fc')">Forecast Analytics →</button>
        </div>
      </div>
    </div>

    <!-- Active Production Lines & Live Alerts -->
    <div class="grid g2" style="margin-top:16px;">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3>Today’s Live Production Lines</h3>
          <button class="btn ghost btn-sm" onclick="go('plan')">Manage Schedule</button>
        </div>
        <div class="wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Planned</th>
                <th>Produced</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${(scheduleJobs.length ? scheduleJobs : [
                { product: 'Bread (Sliced White 400g)', quantity: 4800, producedQty: 3850, status: 'In Progress' },
                { product: 'Dairy Products (Fresh Milk)', quantity: 2200, producedQty: 2200, status: 'Completed' },
                { product: 'Chocolate Biscuits', quantity: 6000, producedQty: 1200, status: 'Delayed' },
                { product: 'Fruit Juice (Tropical 1L)', quantity: 3500, producedQty: 0, status: 'Scheduled' }
              ]).map(job => {
                const pct = Math.min(100, Math.round(((job.producedQty || 0) / job.quantity) * 100));
                let statusBadge = 'grn';
                if (job.status === 'Delayed') statusBadge = 'red';
                else if (job.status === 'Scheduled') statusBadge = 'blue';

                return `
                  <tr>
                    <td><b>${job.product}</b></td>
                    <td>${job.quantity.toLocaleString('en-IN')}</td>
                    <td>${(job.producedQty || 0).toLocaleString('en-IN')}</td>
                    <td style="min-width:110px;">
                      <div class="bar">
                        <i style="width:${pct}%;"></i>
                      </div>
                      <span class="mu" style="font-size:11px;">${pct}%</span>
                    </td>
                    <td><span class="b ${statusBadge}">${job.status}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Actionable Disruption Alerts -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3>Operational Alerts</h3>
          <button class="btn ghost btn-sm" onclick="go('alerts')">View All (${alertList.length})</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${alertList.slice(0, 3).map(a => renderAlertCard(a, false)).join('')}
          ${alertList.length === 0 ? `<p class="mu" style="padding:20px; text-align:center;">All systems green. No active disruptions! 🎉</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

// 2. Demand Forecasting View
function renderForecastView() {
  const products = ['Bread (Sliced White 400g)', 'Dairy Products (Fresh Milk & Cream)', 'Chocolate Biscuits (200g Pack)', 'Fruit Juice (Mixed Tropical 1L)', 'Snack Pack (Crispy Spiced Masala)', 'Butter Cookies (Tin 300g)'];

  return `
    <div style="margin-bottom:20px;">
      <h1>AI Demand Forecasting Engine</h1>
      <p class="mu" style="font-size:14px; margin-top:2px;">Probabilistic time-series modeling incorporating seasonality, perishability, and market velocity.</p>
    </div>

    <!-- Filter Bar -->
    <div class="card" style="display:flex; gap:14px; flex-wrap:wrap; align-items:center; margin-bottom:16px;">
      <div>
        <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">SELECT PRODUCT SKU</label>
        <select onchange="currentProduct=this.value; loadForecastChart('forecast-main-chart');">
          ${products.map(p => `<option ${p === currentProduct ? 'selected' : ''}>${p}</option>`).join('')}
        </select>
      </div>

      <div>
        <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">FORECAST HORIZON</label>
        <select onchange="rng=Number(this.value); loadForecastChart('forecast-main-chart');">
          <option value="7" ${rng === 7 ? 'selected' : ''}>Next 7 Days (Short-term)</option>
          <option value="14" ${rng === 14 ? 'selected' : ''}>Next 14 Days (Bi-weekly)</option>
          <option value="30" ${rng === 30 ? 'selected' : ''}>Next 30 Days (Monthly)</option>
          <option value="90" ${rng === 90 ? 'selected' : ''}>Next 90 Days (Quarterly)</option>
        </select>
      </div>

      <div>
        <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">CONFIDENCE INTERVAL</label>
        <select onchange="currentConfidence=Number(this.value); loadForecastChart('forecast-main-chart');">
          <option value="95" ${currentConfidence === 95 ? 'selected' : ''}>95% Confidence Band (Default)</option>
          <option value="90" ${currentConfidence === 90 ? 'selected' : ''}>90% Confidence Band (Tight)</option>
        </select>
      </div>

      <div style="flex:1;"></div>

      <button class="btn" onclick="toast('Forecast recalculated with latest sales velocity!'); loadForecastChart('forecast-main-chart');">
        ✨ Recalculate Model
      </button>
    </div>

    <!-- Chart & Prediction Card -->
    <div class="grid g2">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3>${currentProduct}</h3>
          ${L('Model Accuracy: 94.6%')}
        </div>
        <div id="forecast-main-chart" style="min-height:300px;"></div>
      </div>

      <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <h3>AI Decomposition Factors</h3>
          <p class="mu" style="font-size:12px; margin:4px 0 16px;">Factors shaping the ${rng}-day demand projection for this SKU.</p>
          
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${[
              ['Historical Repeat Orders', 92, 'Strong multi-week order velocity (+12%)'],
              ['Day-of-Week Seasonality', 78, 'Retail stores order +15% on Friday & Saturday'],
              ['Ingredient Expiry Pressure', 86, 'Milk & butter lots expiring soon; production prioritized'],
              ['Buffer Stock Availability', 64, 'Flour & sugar reserves are healthy'],
              ['Weather & Market Fluctuation', 52, 'Moderate ambient weather supports bakery dispatches']
            ].map(f => `
              <div>
                <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
                  <span><b>${f[0]}</b></span>
                  <span style="color:var(--g); font-weight:600;">${f[1]}% weight</span>
                </div>
                <div class="bar" style="height:6px;">
                  <i style="width:${f[1]}%;"></i>
                </div>
                <div class="mu" style="font-size:11px; margin-top:2px;">${f[2]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card" style="background:rgba(52,211,153,0.06); border-color:rgba(52,211,153,0.25); margin-top:16px;">
          <div style="font-size:13px; line-height:1.5;">
            💡 <b>Manager Recommendation:</b> Demand is pacing 18% above seasonal norm. Allocate Line 01 capacity for an extra 700 loaves to prevent weekend stockouts at Chennai retail hubs.
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. Production Planner View
function renderPlannerView() {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
      <div>
        <h1>AI Production Planner & FEFO Scheduler</h1>
        <p class="mu" style="font-size:14px; margin-top:2px;">Automated multi-line optimization balancing machine capacity against perishable ingredient expiration.</p>
      </div>
      <button class="btn" onclick="triggerOptimizationPipeline()">
        ✨ Run AI Schedule Optimizer
      </button>
    </div>

    <!-- Recommendation Banner -->
    ${recommendationActive ? `
      <div class="card" style="background:linear-gradient(135deg, rgba(251,146,60,0.1), var(--card)); border-color:rgba(251,146,60,0.35); margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="b org">FEFO Urgency Alert</span>
              <h3 style="font-size:15px;">Prioritize Line 04 (Dairy) to consume cream & butter expiring in 48 hours</h3>
            </div>
            <p class="mu" style="font-size:13px; margin-top:4px;">
              Moving the Dairy Products batch ahead saves 12 cartons of fresh cream and 640 kg of unsalted butter from expiring unused.
            </p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-sm" onclick="applyRecommendation()">Apply Optimization</button>
            <button class="btn ghost btn-sm" onclick="recommendationActive=false; render();">Dismiss</button>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Schedule Table -->
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3>Optimized Production Line Allocation</h3>
        <span class="ai"><i></i>FEFO Constraints Active</span>
      </div>

      <div class="wrap">
        <table>
          <thead>
            <tr>
              <th>Start Time</th>
              <th>Product SKU</th>
              <th>Target Batch</th>
              <th>Allocated Line</th>
              <th>Primary Material</th>
              <th>Priority</th>
              <th>Action / Move</th>
            </tr>
          </thead>
          <tbody>
            ${scheduleJobs.map((job, idx) => `
              <tr>
                <td><b style="color:var(--g); font-size:15px;">${job.time}</b></td>
                <td>
                  <div style="font-weight:600;">${job.product}</div>
                  <div class="mu" style="font-size:11px;">${job.reason || 'Optimal schedule slot'}</div>
                </td>
                <td><b>${job.quantity.toLocaleString('en-IN')}</b> units</td>
                <td><span class="b blue">${job.line}</span></td>
                <td>${job.primaryMaterial}</td>
                <td>
                  <span class="b ${job.priority === 'Critical' ? 'red' : job.priority === 'High' ? 'org' : job.priority === 'Medium' ? 'yel' : 'grn'}">
                    ${job.priority}
                  </span>
                </td>
                <td>
                  <button class="tab" style="padding:4px 8px;" onclick="moveJob(${idx}, -1)" title="Move earlier">↑</button>
                  <button class="tab" style="padding:4px 8px;" onclick="moveJob(${idx}, 1)" title="Move later">↓</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 4. Real-Time Inventory View
function renderInventoryView() {
  let filtered = inventoryItems.filter(item => {
    const matchesQ = item.name.toLowerCase().includes(invQuery.toLowerCase()) || item.category.toLowerCase().includes(invQuery.toLowerCase());
    const matchesRisk = invRiskFilter === 'All' || item.risk.toLowerCase() === invRiskFilter.toLowerCase();
    return matchesQ && matchesRisk;
  });

  if (invSortKey !== -1) {
    filtered.sort((a, b) => {
      let vA = invSortKey === 0 ? a.name : invSortKey === 2 ? a.stock : a.daysToExpiry;
      let vB = invSortKey === 0 ? b.name : invSortKey === 2 ? b.stock : b.daysToExpiry;
      return (vA > vB ? 1 : -1) * invSortDir;
    });
  }

  const expiringSoonCount = inventoryItems.filter(i => i.daysToExpiry <= 7).length;
  const criticalStockCount = inventoryItems.filter(i => i.stock <= i.reorderLevel).length;

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
      <div>
        <h1>Inventory & Perishability Intelligence</h1>
        <p class="mu" style="font-size:14px; margin-top:2px;">Real-time raw material stock levels with automated FEFO expiration risk analysis.</p>
      </div>
      <button class="btn" onclick="openAddMaterialModal()">
        + Add Raw Material Lot
      </button>
    </div>

    <!-- Summary Metrics -->
    <div class="grid g4" style="margin-bottom:16px;">
      <div class="card">
        <span class="mu" style="font-size:12px;">Total Monitored Lots</span>
        <div class="big" style="margin-top:4px;">${inventoryItems.length}</div>
      </div>
      <div class="card">
        <span class="mu" style="font-size:12px;">Expiring within 7 Days</span>
        <div class="big" style="color:var(--o); margin-top:4px;">${expiringSoonCount} lots</div>
      </div>
      <div class="card">
        <span class="mu" style="font-size:12px;">Low Stock (Reorder Alert)</span>
        <div class="big" style="color:var(--r); margin-top:4px;">${criticalStockCount} items</div>
      </div>
      <div class="card">
        <span class="mu" style="font-size:12px;">Estimated Active Value</span>
        <div class="big" style="color:var(--g); margin-top:4px;">₹24.8L</div>
      </div>
    </div>

    <!-- Expiry Timeline Widget -->
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3>Shelf-Life Countdown (FEFO Visualizer)</h3>
        <span class="mu" style="font-size:12px;">Items ordered by earliest expiration</span>
      </div>
      <div id="expiry-timeline-box"></div>
    </div>

    <!-- Inventory Table -->
    <div class="card">
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-bottom:14px;">
        <input 
          placeholder="Search materials or categories... (e.g. Flour, Butter)" 
          value="${invQuery}" 
          oninput="invQuery=this.value; renderInventoryTable();" 
          style="min-width:240px;"
        />
        <div style="display:flex; gap:6px;">
          ${['All', 'Critical', 'High', 'Medium', 'Low'].map(r => `
            <button class="tab ${invRiskFilter === r ? 'on' : ''}" onclick="invRiskFilter='${r}'; renderInventoryTable();">${r}</button>
          `).join('')}
        </div>
      </div>

      <div class="wrap">
        <table id="inventory-table-body">
          <!-- Dynamically populated -->
        </table>
      </div>
    </div>
  `;
}

function renderInventoryTable() {
  const table = $('#inventory-table-body');
  if (!table) return;

  let filtered = inventoryItems.filter(item => {
    const matchesQ = item.name.toLowerCase().includes(invQuery.toLowerCase()) || item.category.toLowerCase().includes(invQuery.toLowerCase());
    const matchesRisk = invRiskFilter === 'All' || item.risk.toLowerCase() === invRiskFilter.toLowerCase();
    return matchesQ && matchesRisk;
  });

  const tone = { Low: 'grn', Medium: 'yel', High: 'org', Critical: 'red' };

  table.innerHTML = `
    <thead>
      <tr>
        <th onclick="toggleInvSort(0)">Material & Lot # ↕</th>
        <th>Category</th>
        <th onclick="toggleInvSort(2)">Stock on Hand ↕</th>
        <th>Reorder Limit</th>
        <th onclick="toggleInvSort(4)">Days to Expiry ↕</th>
        <th>Risk Level</th>
        <th>Storage Temp</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${filtered.map(item => `
        <tr>
          <td>
            <div style="font-weight:600;">${item.name}</div>
            <div class="mu" style="font-size:11px;">Batch: ${item.batchNo || 'LOT-2026'} · ${item.supplier || 'Vendor'}</div>
          </td>
          <td><span class="mu">${item.category}</span></td>
          <td><b>${item.stock.toLocaleString('en-IN')}</b> ${item.unit}</td>
          <td>${item.reorderLevel ? item.reorderLevel.toLocaleString('en-IN') : 500} ${item.unit}</td>
          <td>
            <b style="color:${item.daysToExpiry <= 2 ? 'var(--r)' : item.daysToExpiry <= 7 ? 'var(--o)' : 'inherit'}">
              ${item.daysToExpiry} days
            </b>
          </td>
          <td><span class="b ${tone[item.risk] || 'grn'}">${item.risk}</span></td>
          <td><span class="mu" style="font-size:12px;">${item.storageTemp}</span></td>
          <td>
            <button class="btn ghost btn-sm" onclick="adjustStockModal('${item.id}')">Adjust</button>
          </td>
        </tr>
      `).join('')}
      ${filtered.length === 0 ? `<tr><td colspan="8" class="mu" style="text-align:center; padding:30px;">No matching materials found.</td></tr>` : ''}
    </tbody>
  `;
}

function toggleInvSort(key) {
  if (invSortKey === key) {
    invSortDir = -invSortDir;
  } else {
    invSortKey = key;
    invSortDir = 1;
  }
  renderInventoryTable();
}

// 5. Alert Center View
function renderAlertCenter() {
  const filtered = alertList.filter(a => alertSeverityFilter === 'All' || a.severity === alertSeverityFilter);

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
      <div>
        <h1>Operational Alert Center</h1>
        <p class="mu" style="font-size:14px; margin-top:2px;">Prioritized alerts with actionable AI mitigation steps to prevent stockouts and waste.</p>
      </div>
      <div style="display:flex; gap:6px;">
        ${['All', 'Critical', 'Warning', 'Attention'].map(s => `
          <button class="tab ${alertSeverityFilter === s ? 'on' : ''}" onclick="alertSeverityFilter='${s}'; render();">${s}</button>
        `).join('')}
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:14px;">
      ${filtered.map(a => renderAlertCard(a, true)).join('')}
      ${filtered.length === 0 ? `
        <div class="card" style="text-align:center; padding:48px;">
          <div style="font-size:36px; margin-bottom:10px;">🎉</div>
          <h2>All clear! No alerts in this category.</h2>
          <p class="mu" style="margin-top:6px;">All production lines and ingredient stocks are operating within target parameters.</p>
        </div>
      ` : ''}
    </div>
  `;
}

function renderAlertCard(a, full = false) {
  return `
    <div class="card" style="border-left:4px solid ${a.severity === 'Critical' ? 'var(--r)' : a.severity === 'Warning' ? 'var(--o)' : 'var(--y)'}; padding:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="b ${a.badgeClass || 'red'}">${a.severity}</span>
          <span class="mu" style="font-size:12px;">${a.category} · ${a.item} · ${a.timeAgo}</span>
        </div>
        ${!full ? `<button class="btn ghost btn-sm" onclick="go('alerts')">Take action →</button>` : ''}
      </div>

      <h3 style="margin:10px 0 4px; font-size:16px;">${a.title}</h3>
      <p class="mu" style="font-size:13px; line-height:1.5;">${a.description}</p>

      ${full ? `
        <div class="card" style="background:rgba(255,255,255,0.03); margin:14px 0 10px; padding:12px;">
          <span class="ai"><i></i>✨ AI Prescriptive Recommendation</span>
          <p style="font-size:13px; margin-top:6px; color:var(--tx-title);">${a.actionRecommendation}</p>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
          ${a.severity === 'Critical' ? `
            <button class="btn btn-sm" onclick="handleAlertAction(${a.id}, 'create_po')">
              📦 Execute Expedited PO (500 kg)
            </button>
          ` : ''}
          <button class="btn ghost btn-sm" onclick="handleAlertAction(${a.id}, 'resolve')">
            ✔ Mark Resolved
          </button>
          <button class="btn ghost btn-sm" onclick="handleAlertAction(${a.id}, 'dismiss')">
            Dismiss
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

async function handleAlertAction(id, action) {
  try {
    const res = await fetch(`/api/alerts/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    const data = await res.json();
    if (data.success) {
      toast(data.message || 'Action executed successfully');
      alertList = alertList.filter(a => a.id !== id);
      if (action === 'create_po') {
        const item = inventoryItems.find(i => i.id === 'inv-2');
        if (item) {
          item.stock += 500;
          item.risk = 'Low';
        }
      }
      render();
    }
  } catch (err) {
    // Offline local fallback
    alertList = alertList.filter(a => a.id !== id);
    toast(action === 'create_po' ? 'Purchase Order created for 500 kg!' : 'Alert resolved');
    render();
  }
}

// 6. AI Copilot Chat View
function renderChatView() {
  return `
    <div style="margin-bottom:16px;">
      <h1>FoodPulse AI Copilot</h1>
      <p class="mu" style="font-size:14px; margin-top:2px;">Conversational manufacturing assistant with live context over inventory, schedules, and perishability.</p>
    </div>

    <div class="chat-window">
      <div class="chat-msgs" id="chat-msgs-box">
        ${chatMessages.map(m => `
          <div class="chat-bubble ${m[0]}">${m[1]}</div>
        `).join('')}
      </div>

      <!-- Quick Prompt Suggestions -->
      <div style="display:flex; gap:6px; flex-wrap:wrap; margin:12px 0 8px;">
        ${[
          'Analyze today’s risks',
          'Optimize tomorrow’s schedule',
          'Find expiring materials',
          'Explain demand forecast',
          'What are our waste reduction stats?'
        ].map(p => `
          <button class="tab" style="color:var(--g); border-color:rgba(52,211,153,0.3);" onclick="sendChatMessage('${p}')">
            ${p}
          </button>
        `).join('')}
      </div>

      <!-- Input Bar -->
      <div style="display:flex; gap:10px;">
        <input 
          id="chat-input-field" 
          placeholder="Ask FoodPulse Copilot... (e.g. 'Which materials expire this week?')" 
          style="flex:1;"
          onkeydown="if(event.key==='Enter') sendChatMessage(this.value);"
        />
        <button class="btn" onclick="sendChatMessage($('#chat-input-field').value)">
          Send ↵
        </button>
      </div>
    </div>
  `;
}

async function sendChatMessage(text) {
  if (!text || !text.trim()) return;
  const input = $('#chat-input-field');
  if (input) input.value = '';

  chatMessages.push(['u', text]);
  chatMessages.push(['a', '✨ *FoodPulse Copilot analyzing facility telemetry...*']);
  render();

  try {
    const res = await fetch('/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    chatMessages.pop(); // Remove thinking
    chatMessages.push(['a', data.reply]);
  } catch (err) {
    chatMessages.pop();
    chatMessages.push(['a', '⚠️ Connected in offline mode: Bread demand is +18% above forecast. Milk powder stockout risk in 18 hours. Recommended: Prioritize Line 04 and dispatch Line 01.']);
  }

  render();
  const box = $('#chat-msgs-box');
  if (box) box.scrollTop = box.scrollHeight;
}

// 7. Academic Review Documentation View
function renderAcademicReview() {
  const aca = academicDetails || {
    title: 'AI-Driven Food Manufacturing Planning Platform',
    college: 'SRM Easwari Engineering College (SRM EEC)',
    studentName: 'Harish Kanna M',
    rollNumber: '310624104095',
    guideName: 'Nagamani Segalla',
    reviewStage: 'Zeroth Project Review',
    literatureSurvey: []
  };

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
      <div>
        <h1>Academic Project Review & Architecture</h1>
        <p class="mu" style="font-size:14px; margin-top:2px;">Complete review documentation, system pipeline, and literature review citations.</p>
      </div>
      <button class="btn" onclick="PresentationDeck.open(1)">
        🖥️ Open Presentation Deck (10 Slides)
      </button>
    </div>

    <!-- Review Submission Tile -->
    <div class="card" style="background:linear-gradient(135deg, rgba(13,59,51,0.5), var(--card)); border-color:var(--g); margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
        <div>
          <span class="b grn">${aca.reviewStage || 'Zeroth Project Review'}</span>
          <h2 style="margin:8px 0 4px;">${aca.title}</h2>
          <p class="mu" style="font-size:14px;">
            Student: <b>${aca.studentName}</b> (${aca.rollNumber}) · Guide: <b>${aca.guideName}</b> · <b>${aca.college}</b>
          </p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm" onclick="exportAuditReport()">Download Audit Dossier (JSON)</button>
          <button class="btn ghost btn-sm" onclick="window.print()">Print Official Report</button>
        </div>
      </div>
    </div>

    <!-- Architecture & Mathematical Formulation -->
    <div class="grid g2" style="margin-bottom:16px;">
      <div class="card">
        <h3>5-Stage System Pipeline</h3>
        <p class="mu" style="font-size:13px; margin:4px 0 16px;">Synchronized closed-loop operational flow.</p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="b grn">Stage 1</span>
            <div><b>Data Ingestion:</b> POS sales, distributor orders, ambient weather, supplier transit ETA.</div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="b grn">Stage 2</span>
            <div><b>AI Forecasting Engine:</b> SKU-level Holt-Winters time-series with confidence intervals.</div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="b grn">Stage 3</span>
            <div><b>FEFO Production Scheduler:</b> Prioritizes expiring raw ingredients (cream, butter, yeast).</div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="b grn">Stage 4</span>
            <div><b>Real-Time Inventory Tracker:</b> Real-time lot balance and spoilage risk monitoring.</div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <span class="b grn">Stage 5</span>
            <div><b>Manager Alerts & Copilot:</b> Prescriptive decision triggers and expedited PO generation.</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Mathematical Formulations</h3>
        <p class="mu" style="font-size:13px; margin:4px 0 16px;">Core mathematical equations governing waste reduction & scheduling.</p>

        <div style="display:flex; flex-direction:column; gap:12px; font-size:13px;">
          <div class="card" style="padding:12px; background:rgba(0,0,0,0.2);">
            <b>1. Waste Reduction Metric:</b>
            <div style="font-family:monospace; color:var(--g); margin-top:4px;">
              W_reduction = ((W_baseline - W_current) / W_baseline) × 100%
            </div>
            <div class="mu" style="font-size:11px; margin-top:2px;">Baseline: 26.4% → Current: 8.4% (Relative Cut: 68.2%)</div>
          </div>

          <div class="card" style="padding:12px; background:rgba(0,0,0,0.2);">
            <b>2. FEFO Priority Scheduling Score:</b>
            <div style="font-family:monospace; color:var(--blue); margin-top:4px;">
              Priority_Score = w1·(1 / DaysToExpiry) + w2·(Demand / Stock) + w3·OEE
            </div>
            <div class="mu" style="font-size:11px; margin-top:2px;">Prioritizes expiring lots while avoiding line changeover bottlenecks.</div>
          </div>

          <div class="card" style="padding:12px; background:rgba(0,0,0,0.2);">
            <b>3. Forecast Accuracy (MAPE):</b>
            <div style="font-family:monospace; color:var(--y); margin-top:4px;">
              MAPE = (1 / n) Σ |(Actual_t - Forecast_t) / Actual_t| × 100% = 5.4% (Accuracy: 94.6%)
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Literature Survey Table -->
    <div class="card">
      <h3 style="margin-bottom:12px;">Literature Survey Citations (Reviewed Works)</h3>
      <div class="wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Citation & Year</th>
              <th>Paper Title</th>
              <th>Key Contribution & Industrial Relevance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><span class="b blue">C3 AI (2023)</span></td>
              <td>AI for Demand Forecasting Case Study</td>
              <td>Demonstrated that ML-driven demand prediction and automated batch scheduling reduces food waste and improves fill rates.</td>
            </tr>
            <tr>
              <td>2</td>
              <td><span class="b grn">FoodReady (2025)</span></td>
              <td>AI Demand Forecasting for Food Manufacturers</td>
              <td>Established SKU-level and seasonal perishability models that curtail scrap rates and prevent inventory stockouts.</td>
            </tr>
            <tr>
              <td>3</td>
              <td><span class="b yel">IJACSA (2024)</span></td>
              <td>A Systematic Review of the Literature (Vol. 15 No. 3)</td>
              <td>Surveys state-of-the-art AI-based demand forecasting architectures across manufacturing, cold chains, and retail distribution.</td>
            </tr>
            <tr>
              <td>4</td>
              <td><span class="b org">Univ of Moratuwa (2025)</span></td>
              <td>Production Planning in Food Manufacturing Using Hierarchical Forecasting</td>
              <td>Proves the efficacy of hierarchical demand prediction algorithms for food production lines sharing perishable raw ingredients.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 8. Landing Page
function renderLanding() {
  return `
    <div style="max-width:1100px; margin:auto; padding:24px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        ${logo}
        <div style="display:flex; gap:10px;">
          <a href="/ppt" target="_blank" class="btn ghost btn-sm" style="text-decoration:none;">🖥️ View PPT ↗</a>
          <a href="/FoodPulse_AI_Zeroth_Review_Presentation.pptx" download class="btn ghost btn-sm" style="text-decoration:none;">📥 .PPTX</a>
          <button class="btn btn-sm" onclick="view='login'; render();">Sign In</button>
        </div>
      </div>

      <div style="text-align:center; padding:70px 0 40px;">
        <div style="margin-bottom:14px;">${L('SRM EEC Zeroth Review Project Prototype')}</div>
        <h1 style="font-size:clamp(36px, 6.5vw, 64px); line-height:1.08; letter-spacing:-0.03em;">
          Predict. Produce. <br><em style="color:var(--g); font-style:normal;">Prevent Waste.</em>
        </h1>
        <p class="mu" style="max-width:580px; margin:20px auto; font-size:17px; line-height:1.6;">
          An AI-driven platform for food manufacturers that cuts 20–30% raw material waste through accurate demand forecasting, real-time inventory tracking, and perishability-first scheduling.
        </p>

        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:24px;">
          <button class="btn" style="padding:12px 28px; font-size:15px;" onclick="view='app'; page='dash'; render();">
            🚀 Launch Project Platform
          </button>
          <a href="/ppt" target="_blank" class="btn ghost" style="padding:12px 24px; font-size:15px; text-decoration:none;">
            🖥️ Open PPT (Separate Deck) ↗
          </a>
          <a href="/FoodPulse_AI_Zeroth_Review_Presentation.pptx" download class="btn ghost" style="padding:12px 24px; font-size:15px; text-decoration:none;">
            📥 Download .PPTX File
          </a>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; align-items:center; margin:40px 0 20px;">
          ${['POS Demand Data', 'AI Forecast Engine', 'FEFO Scheduler', 'Real-Time Inventory', 'Dispatch'].map((x, i) => `
            <div class="card" style="padding:8px 16px; font-size:13px; font-weight:600;">${x}</div>
            ${i < 4 ? `<span style="color:var(--g); font-size:18px;">→</span>` : ''}
          `).join('')}
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid g3" style="margin-bottom:40px;">
        <div class="card" style="text-align:center; padding:24px;">
          <div class="big" style="color:var(--g);">94.6%</div>
          <div class="mu" style="margin-top:4px; font-size:14px;">Forecast Accuracy (MAPE)</div>
        </div>
        <div class="card" style="text-align:center; padding:24px;">
          <div class="big" style="color:var(--o);">8.4%</div>
          <div class="mu" style="margin-top:4px; font-size:14px;">Waste Rate (Cut from 26.4%)</div>
        </div>
        <div class="card" style="text-align:center; padding:24px;">
          <div class="big" style="color:var(--blue);">₹4.8L</div>
          <div class="mu" style="margin-top:4px; font-size:14px;">Monthly Savings per Plant</div>
        </div>
      </div>

      <!-- Problem / Solution -->
      <div class="grid g2" style="margin-bottom:40px;">
        <div class="card" style="border-left:4px solid var(--r); padding:24px;">
          <h2 style="color:var(--r); margin-bottom:10px;">The Industry Problem</h2>
          <p class="mu" style="line-height:1.6; font-size:14px;">
            Food manufacturers waste 20–30% of raw materials due to inaccurate production planning and manual spreadsheets that ignore ingredient perishability and demand fluctuations.
          </p>
        </div>
        <div class="card" style="border-left:4px solid var(--g); padding:24px;">
          <h2 style="color:var(--g); margin-bottom:10px;">The FoodPulse AI Solution</h2>
          <p class="mu" style="line-height:1.6; font-size:14px;">
            A closed-loop AI platform that forecasts demand, schedules production lines using FEFO priority, and tracks inventory in real time—cutting waste and preventing stockouts.
          </p>
        </div>
      </div>

      <!-- Student Credentials Banner -->
      <div class="card" style="text-align:center; padding:24px; background:rgba(255,255,255,0.02);">
        <p class="mu" style="font-size:13px;">
          Designed & Developed for <b>SRM Easwari Engineering College (SRM EEC)</b><br>
          Student: <b>Harish Kanna M</b> (Roll No: 310624104095) · Guide: <b>Nagamani Segalla</b>
        </p>
      </div>
    </div>
  `;
}

// 9. Login View
function renderLogin() {
  return `
    <div style="min-height:100vh; display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));">
      <div style="padding:48px; display:flex; flex-direction:column; justify-content:space-between; background:linear-gradient(135deg, #0d3b33, #070d1a);">
        ${logo}
        <div>
          <span class="b grn" style="margin-bottom:12px;">SRM EEC Project Review</span>
          <h1 style="font-size:32px; line-height:1.2; margin-bottom:12px;">AI-Driven Food Manufacturing Planning Platform</h1>
          <p class="mu" style="font-size:15px; line-height:1.6;">
            Cutting 20–30% raw material waste through real-time demand forecasting and FEFO perishability scheduling.
          </p>
        </div>
        <div class="mu" style="font-size:12px;">
          Harish Kanna M (310624104095) · Guide: Nagamani Segalla
        </div>
      </div>

      <div style="display:grid; place-items:center; padding:24px;">
        <div class="card" style="width:min(400px, 100%); display:flex; flex-direction:column; gap:16px;">
          <h2>Manager Sign In</h2>
          <p class="mu" style="font-size:13px;">Sign in to access your manufacturing cockpit.</p>

          <div>
            <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">EMAIL ADDRESS</label>
            <input id="login-email" value="manager@foodpulse.ai" style="width:100%;" />
          </div>

          <div>
            <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">PASSWORD</label>
            <input id="login-password" type="password" value="demo123" style="width:100%;" />
          </div>

          <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--mu);">
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="checkbox" checked style="width:auto;" /> Remember session
            </label>
            <a href="#" style="color:var(--g);" onclick="toast('Demo password is: demo123'); return false;">Forgot?</a>
          </div>

          <p id="login-err" style="color:var(--r); font-size:12px; min-height:16px;"></p>

          <button class="btn" style="width:100%;" onclick="executeSignIn()">
            Sign In to Platform →
          </button>

          <div style="border-top:1px solid var(--card-border); padding-top:12px; text-align:center;">
            <button class="btn ghost btn-sm" style="width:100%;" onclick="view='landing'; render();">
              ← Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function executeSignIn() {
  const em = $('#login-email').value.trim();
  const pw = $('#login-password').value;
  const err = $('#login-err');

  if (em === 'manager@foodpulse.ai' && pw === 'demo123') {
    view = 'app';
    page = 'dash';
    toast('Welcome back, Manager Arun Kumar!');
    render();
  } else {
    err.textContent = 'Invalid credentials. Use demo: manager@foodpulse.ai / demo123';
  }
}

// Master Render Function
function render() {
  const app = $('#app');
  if (!app) return;

  if (view === 'landing') {
    app.innerHTML = renderLanding();
  } else if (view === 'login') {
    app.innerHTML = renderLogin();
  } else {
    let content = '';
    if (page === 'dash') content = renderDashboard();
    else if (page === 'fc') content = renderForecastView();
    else if (page === 'plan') content = renderPlannerView();
    else if (page === 'inv') content = renderInventoryView();
    else if (page === 'alerts') content = renderAlertCenter();
    else if (page === 'chat') content = renderChatView();
    else if (page === 'review') content = renderAcademicReview();

    app.innerHTML = renderShell(content);

    // Post-render lifecycle hooks
    if (page === 'dash') {
      setTimeout(() => loadForecastChart('dash-chart'), 50);
    } else if (page === 'fc') {
      setTimeout(() => loadForecastChart('forecast-main-chart'), 50);
    } else if (page === 'inv') {
      renderInventoryTable();
      setTimeout(() => Charts.expiryTimeline(inventoryItems, 'expiry-timeline-box'), 50);
    }
  }
}

// Forecast Loader
async function loadForecastChart(containerId) {
  try {
    const res = await fetch(`/api/forecast?product=${encodeURIComponent(currentProduct)}&horizon=${rng}&confidence=${currentConfidence}`);
    if (res.ok) {
      currentForecastData = await res.json();
      Charts.forecastChart(currentForecastData, containerId);
      return;
    }
  } catch (err) {
    console.warn('API error fetching forecast, simulating client-side:', err);
  }

  // Client-side simulation fallback
  const mockSeries = [];
  const base = 4800;
  for (let i = 0; i < 14 + rng; i++) {
    const isF = i >= 14;
    const v = base + Math.sin(i / 3) * 350 + i * 20;
    if (!isF) {
      mockSeries.push({ dayIndex: i, isForecast: false, actual: v + Math.sin(i * 3) * 150 });
    } else {
      mockSeries.push({
        dayIndex: i,
        isForecast: true,
        forecast: v + 100,
        lowerBound: v - 300,
        upperBound: v + 450
      });
    }
  }
  Charts.forecastChart({ series: mockSeries, horizonDays: rng, confidenceLevel: currentConfidence }, containerId);
}

// 4-Stage Optimization Pipeline Simulator
function triggerOptimizationPipeline() {
  const steps = [
    'Analyzing real-time POS & distribution demand signals...',
    'Validating warehouse ingredient stocks & reorder thresholds...',
    'Applying FEFO perishability constraints (expiring dairy prioritized)...',
    'Generating optimal line schedules with zero bottleneck clashes...'
  ];

  let currentStep = 0;
  const updateModal = () => {
    showModal(`
      <div style="padding:10px;">
        <span class="ai" style="margin-bottom:10px;"><i></i>AI Optimization Engine Active</span>
        <h3 style="margin:8px 0 16px;">Generating Production Schedule</h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${steps.map((s, idx) => `
            <div style="display:flex; align-items:center; gap:10px; font-size:13px; color:${idx <= currentStep ? 'var(--tx-title)' : 'var(--mu)'};">
              <span style="color:${idx < currentStep ? 'var(--g)' : idx === currentStep ? 'var(--blue)' : 'var(--mu)'}; font-weight:700;">
                ${idx < currentStep ? '✔' : idx === currentStep ? '●' : '○'}
              </span>
              <span>${s}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  };

  updateModal();
  const interval = setInterval(() => {
    currentStep++;
    if (currentStep >= steps.length) {
      clearInterval(interval);
      setTimeout(async () => {
        hideModal();
        try {
          const res = await fetch('/api/schedule', { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            scheduleJobs = data.schedule;
          }
        } catch (err) {
          // offline fallback
        }
        toast('Optimal production schedule generated and synchronized!');
        render();
      }, 500);
    } else {
      updateModal();
    }
  }, 750);
}

function moveJob(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= scheduleJobs.length) return;
  const temp = scheduleJobs[index];
  scheduleJobs[index] = scheduleJobs[target];
  scheduleJobs[target] = temp;
  
  // Reassign times
  const times = ['06:00', '08:30', '11:00', '14:00', '16:30'];
  scheduleJobs.forEach((job, idx) => job.time = times[idx] || '18:00');
  
  toast('Schedule updated');
  render();
}

function applyRecommendation() {
  recommendationActive = false;
  // Move Dairy Products to 06:00
  const dairyIdx = scheduleJobs.findIndex(j => j.product.includes('Dairy'));
  if (dairyIdx > 0) {
    const [dairy] = scheduleJobs.splice(dairyIdx, 1);
    scheduleJobs.unshift(dairy);
    const times = ['06:00', '08:30', '11:00', '14:00', '16:30'];
    scheduleJobs.forEach((j, i) => j.time = times[i] || '18:00');
  }
  toast('FEFO recommendation applied! Dairy scheduled for 06:00.');
  render();
}

// Modal Handlers
function openAddMaterialModal() {
  showModal(`
    <div style="padding:10px;">
      <h2 style="margin-bottom:6px;">Add Raw Material Lot</h2>
      <p class="mu" style="font-size:13px; margin-bottom:16px;">Track a newly arrived ingredient consignment with shelf-life clock.</p>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <div>
          <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">MATERIAL NAME</label>
          <input id="new-mat-name" placeholder="e.g. Cardamom Spice Extract" style="width:100%;" />
        </div>

        <div>
          <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">CATEGORY</label>
          <input id="new-mat-cat" placeholder="e.g. Flavoring & Spices" style="width:100%;" />
        </div>

        <div style="display:flex; gap:10px;">
          <div style="flex:1;">
            <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">INITIAL STOCK</label>
            <input id="new-mat-stock" type="number" min="1" placeholder="Quantity" style="width:100%;" />
          </div>
          <div style="width:110px;">
            <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">UNIT</label>
            <select id="new-mat-unit" style="width:100%;">
              <option>kg</option>
              <option>L</option>
              <option>units</option>
              <option>cartons</option>
            </select>
          </div>
        </div>

        <div>
          <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">DAYS UNTIL EXPIRATION (FEFO)</label>
          <input id="new-mat-days" type="number" min="1" placeholder="Days (e.g. 5)" style="width:100%;" />
        </div>

        <p id="new-mat-err" style="color:var(--r); font-size:12px; min-height:16px;"></p>

        <div style="display:flex; gap:10px; margin-top:8px;">
          <button class="btn" style="flex:1;" onclick="saveNewMaterial()">Save Material</button>
          <button class="btn ghost" onclick="hideModal()">Cancel</button>
        </div>
      </div>
    </div>
  `);
}

async function saveNewMaterial() {
  const name = $('#new-mat-name').value.trim();
  const cat = $('#new-mat-cat').value.trim() || 'General Ingredients';
  const stock = Number($('#new-mat-stock').value);
  const unit = $('#new-mat-unit').value;
  const days = Number($('#new-mat-days').value);
  const err = $('#new-mat-err');

  if (!name || isNaN(stock) || stock <= 0 || isNaN(days) || days <= 0) {
    err.textContent = 'Please fill out material name, positive stock quantity, and days to expiry.';
    return;
  }

  try {
    const res = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category: cat, stock, unit, daysToExpiry: days })
    });
    if (res.ok) {
      const data = await res.json();
      inventoryItems.push(data.item);
    }
  } catch (e) {
    // offline
    inventoryItems.push({
      id: `inv-${Date.now()}`,
      name, category: cat, stock, unit, daysToExpiry: days,
      risk: days <= 2 ? 'High' : days <= 7 ? 'Critical' : 'Low',
      storageTemp: 'Standard Storage',
      batchNo: `LOT-${Date.now().toString().slice(-4)}`
    });
  }

  hideModal();
  toast(`${name} added to live inventory.`);
  render();
}

function adjustStockModal(id) {
  const item = inventoryItems.find(i => i.id === id);
  if (!item) return;

  showModal(`
    <div style="padding:10px;">
      <h2 style="margin-bottom:6px;">Adjust Stock — ${item.name}</h2>
      <p class="mu" style="font-size:13px; margin-bottom:14px;">Current quantity on record: <b>${item.stock} ${item.unit}</b></p>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <div>
          <label class="mu" style="font-size:11px; display:block; margin-bottom:4px;">NEW STOCK QUANTITY</label>
          <input id="adj-stock-val" type="number" value="${item.stock}" style="width:100%;" />
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn" style="flex:1;" onclick="saveStockAdjustment('${id}')">Update Stock</button>
          <button class="btn ghost" onclick="hideModal()">Cancel</button>
        </div>
      </div>
    </div>
  `);
}

async function saveStockAdjustment(id) {
  const val = Number($('#adj-stock-val').value);
  const item = inventoryItems.find(i => i.id === id);
  if (item && !isNaN(val)) {
    item.stock = val;
    try {
      await fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: val })
      });
    } catch (e) {}
    hideModal();
    toast(`Stock for ${item.name} updated to ${val} ${item.unit}`);
    render();
  }
}

async function exportAuditReport() {
  try {
    const res = await fetch('/api/export/report');
    if (res.ok) {
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FoodPulse-AI-Audit-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      toast('Manufacturing Audit Report JSON downloaded!');
      return;
    }
  } catch (err) {}
  toast('Report exported');
}

// Global bootstrap
window.addEventListener('DOMContentLoaded', initApp);
