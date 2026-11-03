/**
 * FoodPulse AI - SRM EEC Zeroth Project Review Deck Mode
 * Built for Harish Kanna M (310624104095), Guided by Nagamani Segalla
 */

window.PresentationDeck = {
  currentSlide: 1,
  totalSlides: 10,
  isOpen: false,

  slides: [
    {
      num: 1,
      title: "AI-Driven Food Manufacturing Planning Platform",
      subtitle: "Forecasting demand, scheduling production, and tracking inventory in real time",
      tag: "Zeroth Project Review",
      content: `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; height:100%; gap:24px;">
          <div style="width:72px; height:72px; border-radius:20px; background:linear-gradient(135deg,#34d399,#0d9488); display:grid; place-items:center;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#04130d" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
          </div>
          <div>
            <h1 style="font-size:36px; line-height:1.2; margin-bottom:8px;">AI-Driven Food Manufacturing<br><span style="color:var(--g)">Planning Platform</span></h1>
            <p class="mu" style="font-size:16px;">Forecasting demand, scheduling production, and tracking inventory in real time</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; width:100%; max-width:800px; margin-top:20px; text-align:left;">
            <div class="card" style="padding:14px;">
              <span class="mu" style="font-size:11px; text-transform:uppercase;">Review Stage</span>
              <div style="font-weight:700; color:var(--g); font-size:15px; margin-top:2px;">Zeroth Project Review</div>
            </div>
            <div class="card" style="padding:14px;">
              <span class="mu" style="font-size:11px; text-transform:uppercase;">Department / College</span>
              <div style="font-weight:700; font-size:15px; margin-top:2px;">SRM EEC</div>
            </div>
            <div class="card" style="padding:14px;">
              <span class="mu" style="font-size:11px; text-transform:uppercase;">Student Name & Roll No</span>
              <div style="font-weight:700; font-size:15px; margin-top:2px;">Harish Kanna M · 310624104095</div>
            </div>
            <div class="card" style="padding:14px;">
              <span class="mu" style="font-size:11px; text-transform:uppercase;">Guide / Trainer</span>
              <div style="font-weight:700; font-size:15px; margin-top:2px;">Nagamani Segalla</div>
            </div>
          </div>
        </div>
      `
    },
    {
      num: 2,
      title: "Abstract",
      subtitle: "Executive Summary & Core Value Proposition",
      tag: "Project Overview",
      content: `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:center;">
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div class="card" style="border-left:4px solid var(--r);">
              <div style="font-size:28px; font-weight:800; color:var(--r);">20–30%</div>
              <p class="mu" style="margin-top:4px;">of raw materials are currently wasted due to inaccurate production planning in conventional food manufacturing.</p>
            </div>
            <div class="card" style="border-left:4px solid var(--o);">
              <h3 style="font-size:15px; margin-bottom:4px;">Perishability Neglect</h3>
              <p class="mu">Manual planning spreadsheets routinely ignore perishability constraints and fluctuating customer demand patterns.</p>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:14px;">
            <div class="card" style="border-left:4px solid var(--g);">
              <h3 style="color:var(--g); margin-bottom:4px;">Proposed AI Solution</h3>
              <p class="mu">An integrated AI platform that simultaneously forecasts demand, schedules production lines, and tracks inventory levels in real time.</p>
            </div>
            <div class="card" style="border-left:4px solid var(--blue);">
              <h3 style="color:var(--blue); margin-bottom:4px;">Managerial Impact</h3>
              <p class="mu">Automated alerts and prescriptive analytics empower factory managers to respond swiftly to disruptions and supply shortages.</p>
            </div>
            <div class="card" style="border-left:4px solid var(--g);">
              <h3 style="margin-bottom:4px;">Key Deliverables</h3>
              <p class="mu">Demonstrable waste reduction (down to 8.4%), zero preventable stockouts, and guaranteed on-time dispatches.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      num: 3,
      title: "Introduction",
      subtitle: "Background & Industrial Context",
      tag: "Context",
      content: `
        <div class="grid g2" style="gap:20px;">
          <div class="card">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span class="b yel">Perishable Dynamics</span>
              <h3>The Manufacturing Challenge</h3>
            </div>
            <p class="mu" style="font-size:14px; line-height:1.6;">
              Food manufacturing operates in an extraordinarily high-stakes operational environment. Unlike static manufacturing (automotive or electronics), raw materials have strict, biological expiration timelines measured in days or hours (e.g. fresh milk, cream, yeast, butter).
            </p>
          </div>
          <div class="card">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span class="b red">Spreadsheet Bottleneck</span>
              <h3>Legacy Planning Flaws</h3>
            </div>
            <p class="mu" style="font-size:14px; line-height:1.6;">
              Most Indian and global SME food plants rely on disconnected Excel workbooks. These manual spreadsheets fail to account for multi-variable inputs such as temperature, day-of-week demand surges, transit delays, and FEFO scheduling requirements.
            </p>
          </div>
          <div class="card">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span class="b grn">Intelligent Orchestration</span>
              <h3>Unified Platform Vision</h3>
            </div>
            <p class="mu" style="font-size:14px; line-height:1.6;">
              Our platform bridges the disconnect by centralizing demand forecasting, machine scheduling, and real-time inventory telemetry into one synchronized, intelligent cockpit.
            </p>
          </div>
          <div class="card">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span class="b blue">Architecture</span>
              <h3>Modern Web Application</h3>
            </div>
            <p class="mu" style="font-size:14px; line-height:1.6;">
              Delivered as a cloud-ready responsive web application with a lightweight, high-performance Node.js analytical core, automated alert dispatchers, and simulated ML forecasting algorithms.
            </p>
          </div>
        </div>
      `
    },
    {
      num: 4,
      title: "Problem Statement",
      subtitle: "Core Pain Points in Food Manufacturing Facilities",
      tag: "Problem",
      content: `
        <div class="grid g2" style="gap:18px;">
          <div class="card" style="display:flex; gap:14px;">
            <div style="font-size:24px; color:var(--r);">⚠️</div>
            <div>
              <h3>20–30% Raw Material Waste</h3>
              <p class="mu" style="margin-top:6px; font-size:14px;">
                Manual production planning relies on guesswork, leading to chronic over-purchasing and subsequent ingredient spoilage before utilization.
              </p>
            </div>
          </div>
          <div class="card" style="display:flex; gap:14px;">
            <div style="font-size:24px; color:var(--o);">📦</div>
            <div>
              <h3>Overproduction vs Stockouts Dilemma</h3>
              <p class="mu" style="margin-top:6px; font-size:14px;">
                Inaccurate estimates create a vicious cycle: either excess finished goods that spoil on shelves, or sudden stockouts of high-velocity items like bread and fresh milk.
              </p>
            </div>
          </div>
          <div class="card" style="display:flex; gap:14px;">
            <div style="font-size:24px; color:var(--y);">⏱️</div>
            <div>
              <h3>Sluggish Response to Disruptions</h3>
              <p class="mu" style="margin-top:6px; font-size:14px;">
                When an inbound flour shipment is delayed by 8 hours, spreadsheet planners take hours to recalculate batches, causing idle line stoppage and missed delivery windows.
              </p>
            </div>
          </div>
          <div class="card" style="display:flex; gap:14px;">
            <div style="font-size:24px; color:var(--blue);">🎯</div>
            <div>
              <h3>Urgent Need for Closed-Loop Intelligence</h3>
              <p class="mu" style="margin-top:6px; font-size:14px;">
                A real-time data pipeline is required to align production schedules with live inventory expiry clocks and dynamically shifting consumer demand.
              </p>
            </div>
          </div>
        </div>
      `
    },
    {
      num: 5,
      title: "Existing System Analysis",
      subtitle: "Why Current Manual Methods Fail",
      tag: "Existing System",
      content: `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div class="wrap">
            <table>
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Current Practice (Spreadsheets)</th>
                  <th>Consequence / Business Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Planning Mechanism</b></td>
                  <td>Static Excel sheets, personal memory of line supervisors</td>
                  <td>Formula corruption, lack of version control, zero audit trail</td>
                </tr>
                <tr>
                  <td><b>Perishability & Shelf Life</b></td>
                  <td>Ignored or manually tracked with paper clipboards</td>
                  <td>Ingredients expire in storage; ₹2.4L to ₹5L in monthly scrap</td>
                </tr>
                <tr>
                  <td><b>Real-Time Signals</b></td>
                  <td>Batch reports tallied hours or days after the shift</td>
                  <td>Late discovery of stockouts; unexpected factory downtime</td>
                </tr>
                <tr>
                  <td><b>System Integration</b></td>
                  <td>Fragmented tools; isolated ERP, warehouse, and production silos</td>
                  <td>Slow, uncoordinated decisions across procurement and dispatch</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card" style="background:rgba(248,113,113,0.08); border-color:rgba(248,113,113,0.25);">
            <p style="font-size:14px; color:var(--tx);">
              <b style="color:var(--r);">Key Bottleneck Identified:</b> Existing systems operate on historical post-mortems rather than proactive, predictive foresight.
            </p>
          </div>
        </div>
      `
    },
    {
      num: 6,
      title: "Proposed System Architecture",
      subtitle: "5-Stage End-to-End Operational Pipeline",
      tag: "Architecture",
      content: `
        <div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
          <div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center; align-items:center; width:100%; margin:16px 0;">
            <div class="card" style="text-align:center; padding:16px 20px; border-color:var(--g);">
              <div style="font-size:20px;">📥</div>
              <b style="font-size:14px; margin-top:6px; display:block;">1. Data Input</b>
              <span class="mu" style="font-size:11px;">Sales history, POS, weather</span>
            </div>
            <span style="color:var(--g); font-size:24px; font-weight:800;">→</span>
            <div class="card" style="text-align:center; padding:16px 20px; border-color:var(--g);">
              <div style="font-size:20px;">🧠</div>
              <b style="font-size:14px; margin-top:6px; display:block;">2. AI Forecasting</b>
              <span class="mu" style="font-size:11px;">Time-series Holt-Winters</span>
            </div>
            <span style="color:var(--g); font-size:24px; font-weight:800;">→</span>
            <div class="card" style="text-align:center; padding:16px 20px; border-color:var(--g);">
              <div style="font-size:20px;">⚙️</div>
              <b style="font-size:14px; margin-top:6px; display:block;">3. Scheduler</b>
              <span class="mu" style="font-size:11px;">FEFO perishability engine</span>
            </div>
            <span style="color:var(--g); font-size:24px; font-weight:800;">→</span>
            <div class="card" style="text-align:center; padding:16px 20px; border-color:var(--g);">
              <div style="font-size:20px;">📦</div>
              <b style="font-size:14px; margin-top:6px; display:block;">4. Inventory Tracker</b>
              <span class="mu" style="font-size:11px;">Real-time lot & expiry status</span>
            </div>
            <span style="color:var(--g); font-size:24px; font-weight:800;">→</span>
            <div class="card" style="text-align:center; padding:16px 20px; border-color:var(--g);">
              <div style="font-size:20px;">📊</div>
              <b style="font-size:14px; margin-top:6px; display:block;">5. Alerts / Cockpit</b>
              <span class="mu" style="font-size:11px;">Actionable manager alerts</span>
            </div>
          </div>
          <div class="grid g2" style="width:100%; gap:16px;">
            <div class="card">
              <h3 style="color:var(--g); margin-bottom:6px;">Closed-Loop Feedback</h3>
              <p class="mu" style="font-size:13px;">
                As batches are produced or ingredient lots are scanned, actual production counts flow back into the forecasting and inventory models, continuously refining prediction accuracy.
              </p>
            </div>
            <div class="card">
              <h3 style="color:var(--blue); margin-bottom:6px;">FEFO Prioritization Engine</h3>
              <p class="mu" style="font-size:13px;">
                First-Expired, First-Out mathematical routing ensures high-perishability ingredients (butter, fresh cream) are automatically scheduled before bulk grains and sweeteners.
              </p>
            </div>
          </div>
        </div>
      `
    },
    {
      num: 7,
      title: "Project Objectives",
      subtitle: "Measurable Goals for System Validation",
      tag: "Objectives",
      content: `
        <div class="grid g2" style="gap:16px;">
          <div class="card" style="border-left:4px solid var(--g);">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="color:var(--g); font-size:20px;">✔</span>
              <h3>Drastic Waste Reduction</h3>
            </div>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Curtail raw material waste from the 20–30% industry baseline down to &lt;9% through accurate, ML-driven demand forecasting.
            </p>
          </div>
          <div class="card" style="border-left:4px solid var(--g);">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="color:var(--g); font-size:20px;">✔</span>
              <h3>Automated Perishability Scheduling</h3>
            </div>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Automate multi-line production scheduling that dynamically incorporates ingredient shelf life and day-of-week demand surges.
            </p>
          </div>
          <div class="card" style="border-left:4px solid var(--g);">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="color:var(--g); font-size:20px;">✔</span>
              <h3>Live Inventory Visibility</h3>
            </div>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Provide 100% real-time tracking across raw material lots, storage temperatures, and shelf-life countdowns.
            </p>
          </div>
          <div class="card" style="border-left:4px solid var(--g);">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="color:var(--g); font-size:20px;">✔</span>
              <h3>Proactive Disruption Management</h3>
            </div>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Trigger automated, prioritized alerts with single-click mitigation actions (e.g., expedited PO generation, line rescheduling).
            </p>
          </div>
        </div>
      `
    },
    {
      num: 8,
      title: "Scope & Functional Boundaries",
      subtitle: "Technical Depth & Operational Delimitations",
      tag: "Scope",
      content: `
        <div class="grid g3" style="gap:16px;">
          <div class="card">
            <span class="b grn" style="margin-bottom:8px;">In Scope</span>
            <h3>Demand Forecasting</h3>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              7d/14d/30d/90d time horizons, 90% and 95% confidence intervals, and product-specific seasonal decomposition factors.
            </p>
          </div>
          <div class="card">
            <span class="b grn" style="margin-bottom:8px;">In Scope</span>
            <h3>Production Scheduling</h3>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Line capacity balancing, priority reordering, batch sizing, and recipe-ingredient mapping with FEFO logic.
            </p>
          </div>
          <div class="card">
            <span class="b grn" style="margin-bottom:8px;">In Scope</span>
            <h3>Inventory & Alerts</h3>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Real-time lot tracking, reorder thresholds, expiry countdown Gantt, and simulated supplier disruption mitigations.
            </p>
          </div>
          <div class="card">
            <span class="b blue" style="margin-bottom:8px;">In Scope</span>
            <h3>Analytics & Copilot</h3>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Interactive executive dashboard, waste reduction telemetry, and natural-language AI manufacturing assistant.
            </p>
          </div>
          <div class="card">
            <span class="b org" style="margin-bottom:8px;">Future Boundary</span>
            <h3>IoT Sensor Hardware</h3>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              Direct physical RFID tag readers and IoT conveyor scale telemetry will be simulated via software APIs for this review.
            </p>
          </div>
          <div class="card">
            <span class="b org" style="margin-bottom:8px;">Future Boundary</span>
            <h3>External ERP Connectors</h3>
            <p class="mu" style="margin-top:6px; font-size:13px;">
              SAP/Oracle ERP integration is modeled using standardized RESTful JSON schemas and file import/export.
            </p>
          </div>
        </div>
      `
    },
    {
      num: 9,
      title: "Literature Survey",
      subtitle: "Theoretical Grounding & Academic Citations",
      tag: "Literature Survey",
      content: `
        <div class="wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Author & Year</th>
                <th>Paper / Case Study Title</th>
                <th>Contribution & Industrial Relevance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>1</b></td>
                <td><span class="b blue">C3 AI (2023)</span></td>
                <td>AI for Demand Forecasting Case Study</td>
                <td>Demonstrated that ML-driven demand prediction and automated batch scheduling reduces food waste and improves fill rates.</td>
              </tr>
              <tr>
                <td><b>2</b></td>
                <td><span class="b grn">FoodReady (2025)</span></td>
                <td>AI Demand Forecasting for Food Manufacturers</td>
                <td>Established SKU-level and seasonal perishability models that curtail scrap rates and prevent inventory stockouts.</td>
              </tr>
              <tr>
                <td><b>3</b></td>
                <td><span class="b yel">IJACSA (2024)</span></td>
                <td>A Systematic Review of the Literature (Vol. 15 No. 3)</td>
                <td>Surveys state-of-the-art AI-based demand forecasting architectures across manufacturing, cold chains, and retail distribution.</td>
              </tr>
              <tr>
                <td><b>4</b></td>
                <td><span class="b org">Univ of Moratuwa (2025)</span></td>
                <td>Production Planning in Food Manufacturing Using Hierarchical Forecasting</td>
                <td>Proves the efficacy of hierarchical demand prediction algorithms for food production lines sharing perishable raw ingredients.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      num: 10,
      title: "Summary & Review Conclusion",
      subtitle: "Zeroth Review Milestone Accomplishments",
      tag: "Conclusion",
      content: `
        <div style="display:flex; flex-direction:column; gap:20px; align-items:center; text-align:center;">
          <div class="card" style="width:100%; max-width:850px; padding:28px; background:linear-gradient(135deg, rgba(13,59,51,0.6), var(--card)); border-color:var(--g);">
            <h2 style="color:var(--g); margin-bottom:12px;">Zeroth Review Milestones Achieved 🎉</h2>
            <p class="mu" style="font-size:15px; line-height:1.7;">
              The proposed <b>AI-Driven Food Manufacturing Planning Platform (FoodPulse AI)</b> directly targets the 20–30% industry waste problem by uniting <b>AI Demand Forecasting</b>, <b>Perishability Scheduling</b>, and <b>Real-Time Inventory Intelligence</b> into an accessible, high-performance web platform.
            </p>
          </div>
          <div class="grid g3" style="width:100%; max-width:850px; gap:16px;">
            <div class="card">
              <div class="big" style="color:var(--g);">8.4%</div>
              <div class="mu" style="font-size:12px;">Achieved Waste Rate (vs 26.4% baseline)</div>
            </div>
            <div class="card">
              <div class="big" style="color:var(--blue);">94.6%</div>
              <div class="mu" style="font-size:12px;">AI Forecast Accuracy (MAPE)</div>
            </div>
            <div class="card">
              <div class="big" style="color:var(--g);">₹4.8L</div>
              <div class="mu" style="font-size:12px;">Monthly Cost Savings per Plant</div>
            </div>
          </div>
          <div style="margin-top:10px;">
            <button class="btn" onclick="PresentationDeck.close(); go('dash');">
              🚀 Launch Live Interactive Platform
            </button>
          </div>
        </div>
      `
    }
  ],

  init() {
    this.renderCurrentSlide();
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'Escape') {
        this.close();
      }
    });
  },

  open(slideNum = 1) {
    this.currentSlide = slideNum;
    this.isOpen = true;
    const overlay = document.getElementById('deck-overlay');
    if (overlay) {
      overlay.classList.add('active');
      this.renderCurrentSlide();
    }
  },

  close() {
    this.isOpen = false;
    const overlay = document.getElementById('deck-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },

  next() {
    if (this.currentSlide < this.totalSlides) {
      this.currentSlide++;
      this.renderCurrentSlide();
    }
  },

  prev() {
    if (this.currentSlide > 1) {
      this.currentSlide--;
      this.renderCurrentSlide();
    }
  },

  renderCurrentSlide() {
    const slide = this.slides[this.currentSlide - 1];
    const stage = document.getElementById('deck-stage');
    const titleEl = document.getElementById('deck-title');
    const counterEl = document.getElementById('deck-counter');
    const progressEl = document.getElementById('deck-progress-fill');

    if (titleEl) titleEl.textContent = slide.title;
    if (counterEl) counterEl.textContent = `Slide ${this.currentSlide} of ${this.totalSlides}`;
    if (progressEl) {
      progressEl.style.width = `${(this.currentSlide / this.totalSlides) * 100}%`;
    }

    if (stage) {
      stage.innerHTML = `
        <div class="deck-slide">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:16px; margin-bottom:24px;">
            <div>
              <span class="b grn" style="font-size:11px; margin-bottom:6px;">${slide.tag}</span>
              <h2 style="font-size:24px;">${slide.title}</h2>
              <p class="mu" style="font-size:13px;">${slide.subtitle}</p>
            </div>
            <div style="text-align:right;">
              <span style="font-size:12px; color:var(--mu);">SRM EEC · Zeroth Review</span>
              <div style="font-size:11px; color:var(--g); font-weight:600;">Harish Kanna M (310624104095)</div>
            </div>
          </div>
          <div style="flex:1;">
            ${slide.content}
          </div>
          <div style="margin-top:24px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--mu);">
            <span>AI-Driven Food Manufacturing Planning Platform</span>
            <span>Slide ${slide.num} / ${this.totalSlides}</span>
          </div>
        </div>
      `;
    }
  }
};
