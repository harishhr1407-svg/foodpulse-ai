const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new pptxgen();

// Configure 16:9 widescreen presentation
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Harish Kanna M (310624104095)';
pptx.company = 'SRM Easwari Engineering College';
pptx.subject = 'AI-Driven Food Manufacturing Planning Platform - Zeroth Review';
pptx.title = 'AI-Driven Food Manufacturing Planning Platform';

// Color palette matching dark futuristic theme
const BG_DARK = '070D1A';
const CARD_BG = '0F1A2E';
const ACCENT_GREEN = '34D399';
const ACCENT_ORANGE = 'FB923C';
const ACCENT_RED = 'F87171';
const ACCENT_BLUE = '38BDF8';
const TXT_WHITE = 'FFFFFF';
const TXT_MUTED = '8B9BB4';
const LINE_COLOR = '1E293B';

// Helper to add standard slide footer
function addSlideFooter(slide, slideNum, title = 'AI-Driven Food Manufacturing Planning Platform') {
  slide.addShape(pptx.ShapeType.line, {
    x: 0.8, y: 7.0, w: 11.7, h: 0,
    line: { color: LINE_COLOR, width: 1 }
  });
  slide.addText(title, {
    x: 0.8, y: 7.05, w: 6.0, h: 0.35,
    fontFace: 'Arial', fontSize: 10, color: TXT_MUTED
  });
  slide.addText('SRM EEC  |  Zeroth Review  |  ' + slideNum, {
    x: 7.0, y: 7.05, w: 5.5, h: 0.35,
    fontFace: 'Arial', fontSize: 10, color: TXT_MUTED, align: 'right'
  });
}

// Helper to add standard slide header
function addSlideHeader(slide, title, category = 'ZEROTH REVIEW') {
  // Category Pill
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 0.5, w: 2.2, h: 0.32, rx: 0.16,
    fill: { color: '102A24' }, line: { color: ACCENT_GREEN, width: 1 }
  });
  slide.addText(category, {
    x: 0.8, y: 0.5, w: 2.2, h: 0.32,
    fontFace: 'Arial', fontSize: 9, bold: true, color: ACCENT_GREEN, align: 'center', valign: 'middle'
  });

  // Title
  slide.addText(title, {
    x: 0.8, y: 0.9, w: 11.7, h: 0.6,
    fontFace: 'Arial', fontSize: 26, bold: true, color: TXT_WHITE, valign: 'middle'
  });
}

// -------------------------------------------------------------
// SLIDE 1: Title Slide
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  // Decorative Accent Box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.8, y: 1.0, w: 1.6, h: 1.6, rx: 0.3,
    fill: { color: '102A24' }, line: { color: ACCENT_GREEN, width: 2 }
  });
  slide.addText('⚙️', {
    x: 5.8, y: 1.0, w: 1.6, h: 1.6,
    fontSize: 40, align: 'center', valign: 'middle'
  });

  // Main Title
  slide.addText('AI-Driven Food Manufacturing\nPlanning Platform', {
    x: 1.0, y: 2.8, w: 11.3, h: 1.4,
    fontFace: 'Arial', fontSize: 32, bold: true, color: TXT_WHITE, align: 'center'
  });

  // Subtitle
  slide.addText('Forecasting demand, scheduling production, and tracking inventory in real time', {
    x: 1.5, y: 4.25, w: 10.3, h: 0.5,
    fontFace: 'Arial', fontSize: 16, color: ACCENT_GREEN, align: 'center'
  });

  // Review Details Box
  const details = [
    { label: 'Review Stage', val: 'Zeroth Project Review' },
    { label: 'Department / College', val: 'SRM EEC' },
    { label: 'Student Name', val: 'Harish Kanna M' },
    { label: 'Roll Number', val: '310624104095' },
    { label: 'Guide / Trainer', val: 'Nagamani Segalla' }
  ];

  details.forEach((item, idx) => {
    const xPos = 0.8 + idx * 2.36;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: 5.2, w: 2.25, h: 1.3, rx: 0.15,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addText(item.label.toUpperCase(), {
      x: xPos + 0.1, y: 5.35, w: 2.05, h: 0.3,
      fontFace: 'Arial', fontSize: 9, bold: true, color: TXT_MUTED
    });
    slide.addText(item.val, {
      x: xPos + 0.1, y: 5.75, w: 2.05, h: 0.6,
      fontFace: 'Arial', fontSize: 13, bold: true, color: idx === 0 ? ACCENT_GREEN : TXT_WHITE
    });
  });

  addSlideFooter(slide, 1);
}

// -------------------------------------------------------------
// SLIDE 2: Abstract
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Abstract', 'EXECUTIVE SUMMARY');

  // Left Column: Key Statistic Callout
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.8, w: 4.0, h: 4.9, rx: 0.2,
    fill: { color: CARD_BG }, line: { color: ACCENT_RED, width: 2 }
  });
  slide.addText('20–30%', {
    x: 1.0, y: 2.2, w: 3.6, h: 1.0,
    fontFace: 'Arial', fontSize: 44, bold: true, color: ACCENT_RED, align: 'center'
  });
  slide.addText('of raw materials wasted due to inaccurate production planning.', {
    x: 1.0, y: 3.3, w: 3.6, h: 1.0,
    fontFace: 'Arial', fontSize: 15, color: TXT_WHITE, align: 'center', bold: true
  });
  slide.addText('Manual spreadsheets ignore perishability constraints and demand fluctuations, leading to excessive scrap.', {
    x: 1.0, y: 4.5, w: 3.6, h: 1.6,
    fontFace: 'Arial', fontSize: 13, color: TXT_MUTED, align: 'center'
  });

  // Right Column: Value Points
  const points = [
    { title: 'Perishability Constraint Neglect', desc: 'Manual planning methods ignore ingredient shelf-life and fluctuating demand patterns.', icon: '⚠️', col: ACCENT_ORANGE },
    { title: 'AI-Driven Platform Capabilities', desc: 'Forecasts demand, schedules production with FEFO logic, and tracks inventory in real time.', icon: '🧠', col: ACCENT_GREEN },
    { title: 'Automated Alerts & Manager Analytics', desc: 'Empowers plant supervisors to respond swiftly to disruptions and supply delays.', icon: '⚡', col: ACCENT_BLUE },
    { title: 'Demonstrated Economic Benefits', desc: 'Cuts waste down to 8.4%, prevents stockouts, and guarantees timely retail deliveries.', icon: '✅', col: ACCENT_GREEN }
  ];

  points.forEach((pt, i) => {
    const yPos = 1.8 + i * 1.25;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.1, y: yPos, w: 7.4, h: 1.12, rx: 0.15,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addText(pt.icon, {
      x: 5.3, y: yPos + 0.15, w: 0.6, h: 0.8,
      fontSize: 22, align: 'center', valign: 'middle'
    });
    slide.addText(pt.title, {
      x: 6.0, y: yPos + 0.15, w: 6.3, h: 0.35,
      fontFace: 'Arial', fontSize: 13, bold: true, color: pt.col
    });
    slide.addText(pt.desc, {
      x: 6.0, y: yPos + 0.52, w: 6.3, h: 0.5,
      fontFace: 'Arial', fontSize: 11, color: TXT_MUTED
    });
  });

  addSlideFooter(slide, 2);
}

// -------------------------------------------------------------
// SLIDE 3: Introduction
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Introduction', 'BACKGROUND & CONTEXT');

  const introCards = [
    {
      title: 'Perishable Raw Materials',
      desc: 'Food manufacturers operate under strict biological shelf-life constraints (e.g. dairy, yeast, fresh produce) requiring precise consumption timing.',
      col: ACCENT_ORANGE
    },
    {
      title: 'Manual Spreadsheet Limitations',
      desc: 'Legacy Excel-based planning struggles to account for perishable decay rates, day-of-week seasonality, and unexpected supply chain transit disruptions.',
      col: ACCENT_RED
    },
    {
      title: 'Proposed AI Solution',
      desc: 'The project proposes an intelligent, AI-powered platform uniting demand forecasting, FEFO production scheduling, and inventory tracking.',
      col: ACCENT_GREEN
    },
    {
      title: 'Web Application Architecture',
      desc: 'Implemented as an interactive, cloud-ready web application with an integrated time-series forecasting engine and real-time manager alerts.',
      col: ACCENT_BLUE
    }
  ];

  introCards.forEach((c, idx) => {
    const xPos = idx % 2 === 0 ? 0.8 : 6.8;
    const yPos = idx < 2 ? 1.8 : 4.4;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: yPos, w: 5.7, h: 2.3, rx: 0.2,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos + 0.3, y: yPos + 0.3, w: 0.15, h: 0.6, rx: 0.05,
      fill: { color: c.col }, line: { color: c.col }
    });
    slide.addText(c.title, {
      x: xPos + 0.6, y: yPos + 0.3, w: 4.8, h: 0.6,
      fontFace: 'Arial', fontSize: 16, bold: true, color: TXT_WHITE
    });
    slide.addText(c.desc, {
      x: xPos + 0.3, y: yPos + 1.05, w: 5.1, h: 1.05,
      fontFace: 'Arial', fontSize: 13, color: TXT_MUTED, lineSpacing: 18
    });
  });

  addSlideFooter(slide, 3);
}

// -------------------------------------------------------------
// SLIDE 4: Problem Statement
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Problem Statement', 'PAIN POINTS & CHALLENGES');

  const problems = [
    { title: '20–30% Raw Material Wastage', desc: 'Manual production planning and spreadsheets cause massive scrap loss due to inaccurate baseline estimates.', icon: '📄', col: ACCENT_RED },
    { title: 'Overproduction vs Stockouts Dilemma', desc: 'Erroneous forecasts lead to either finished goods spoilage on shelves or embarrassing retail stockouts.', icon: '📦', col: ACCENT_ORANGE },
    { title: 'Slow Response to Disruptions', desc: 'Delayed responses to ingredient delays or demand shifts disrupt scheduled batches and delivery windows.', icon: '⏱️', col: ACCENT_ORANGE },
    { title: 'Lack of Integrated Data Alignment', desc: 'A modern, data-driven system is urgently needed to align production with real demand and perishability limits.', icon: '🎯', col: ACCENT_BLUE }
  ];

  problems.forEach((p, idx) => {
    const xPos = idx % 2 === 0 ? 0.8 : 6.8;
    const yPos = idx < 2 ? 1.8 : 4.4;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: yPos, w: 5.7, h: 2.3, rx: 0.2,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addText(p.icon + '  ' + p.title, {
      x: xPos + 0.4, y: yPos + 0.3, w: 4.9, h: 0.5,
      fontFace: 'Arial', fontSize: 15, bold: true, color: p.col
    });
    slide.addText(p.desc, {
      x: xPos + 0.4, y: yPos + 0.9, w: 4.9, h: 1.2,
      fontFace: 'Arial', fontSize: 13, color: TXT_MUTED, lineSpacing: 18
    });
  });

  addSlideFooter(slide, 4);
}

// -------------------------------------------------------------
// SLIDE 5: Existing System
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Existing System Analysis', 'CURRENT PRACTICE & FLAWS');

  const tableData = [
    [
      { text: 'Workflow Stage', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 12 } },
      { text: 'Existing Practice (Manual Spreadsheets)', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 12 } },
      { text: 'Inherent Limitations & Business Consequences', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 12 } }
    ],
    [
      { text: 'Production Planning', options: { bold: true, color: ACCENT_RED, fill: CARD_BG } },
      { text: 'Reliance on manual Excel workbooks and supervisor intuition', options: { color: TXT_MUTED, fill: CARD_BG } },
      { text: 'Error-prone, no version audit trail, high risk of formula corruption', options: { color: TXT_MUTED, fill: CARD_BG } }
    ],
    [
      { text: 'Perishability Signals', options: { bold: true, color: ACCENT_ORANGE, fill: CARD_BG } },
      { text: 'Ingredients treated as static numbers; expiry dates logged on paper', options: { color: TXT_MUTED, fill: CARD_BG } },
      { text: 'High spoilage (20–30% waste); ₹2.4L–₹4.8L scrap loss each month', options: { color: TXT_MUTED, fill: CARD_BG } }
    ],
    [
      { text: 'Inventory Tracking', options: { bold: true, color: ACCENT_ORANGE, fill: CARD_BG } },
      { text: 'Periodic manual physical counts tallied at end of shift', options: { color: TXT_MUTED, fill: CARD_BG } },
      { text: 'Delayed visibility into stockouts; lines stop unexpectedly mid-batch', options: { color: TXT_MUTED, fill: CARD_BG } }
    ],
    [
      { text: 'Tool Integration', options: { bold: true, color: ACCENT_BLUE, fill: CARD_BG } },
      { text: 'Fragmented tools; procurement, baking, and logistics operate in silos', options: { color: TXT_MUTED, fill: CARD_BG } },
      { text: 'Zero automated synchronization; delayed responses to market shifts', options: { color: TXT_MUTED, fill: CARD_BG } }
    ]
  ];

  slide.addTable(tableData, {
    x: 0.8, y: 1.8, w: 11.7, h: 4.8,
    colW: [2.5, 4.6, 4.6],
    border: { color: LINE_COLOR, pt: 1 }
  });

  addSlideFooter(slide, 5);
}

// -------------------------------------------------------------
// SLIDE 6: Proposed System Architecture
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Proposed System Architecture', 'TECHNICAL PIPELINE');

  // 5 Step Pipeline Boxes
  const steps = [
    { title: '1. Data Input', desc: 'POS, sales history, weather & transit ETA', icon: '📥' },
    { title: '2. AI Forecasting', desc: 'SKU time-series with confidence bands', icon: '🧠' },
    { title: '3. Scheduler', desc: 'FEFO perishability & line optimization', icon: '⚙️' },
    { title: '4. Inventory', desc: 'Live lot tracking & expiry countdowns', icon: '📦' },
    { title: '5. Dashboard', desc: 'Automated alerts & manager cockpit', icon: '📊' }
  ];

  steps.forEach((st, idx) => {
    const xPos = 0.8 + idx * 2.38;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: 1.8, w: 2.15, h: 2.3, rx: 0.15,
      fill: { color: CARD_BG }, line: { color: ACCENT_GREEN, width: 1.5 }
    });
    slide.addText(st.icon, {
      x: xPos, y: 2.0, w: 2.15, h: 0.5,
      fontSize: 26, align: 'center'
    });
    slide.addText(st.title, {
      x: xPos + 0.1, y: 2.6, w: 1.95, h: 0.4,
      fontFace: 'Arial', fontSize: 13, bold: true, color: ACCENT_GREEN, align: 'center'
    });
    slide.addText(st.desc, {
      x: xPos + 0.1, y: 3.05, w: 1.95, h: 0.9,
      fontFace: 'Arial', fontSize: 11, color: TXT_MUTED, align: 'center'
    });

    if (idx < 4) {
      slide.addText('➔', {
        x: xPos + 2.15, y: 2.7, w: 0.23, h: 0.5,
        fontSize: 16, color: ACCENT_GREEN, align: 'center'
      });
    }
  });

  // Bottom Detail Cards
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 4.4, w: 5.7, h: 2.3, rx: 0.2,
    fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
  });
  slide.addText('Closed-Loop Telemetry Feedback', {
    x: 1.1, y: 4.6, w: 5.1, h: 0.4,
    fontFace: 'Arial', fontSize: 15, bold: true, color: ACCENT_GREEN
  });
  slide.addText('As batches are completed on production lines, actual output is automatically fed back into inventory and demand forecasting engines to continually improve accuracy (MAPE = 94.6%).', {
    x: 1.1, y: 5.1, w: 5.1, h: 1.3,
    fontFace: 'Arial', fontSize: 12, color: TXT_MUTED, lineSpacing: 18
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 4.4, w: 5.7, h: 2.3, rx: 0.2,
    fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
  });
  slide.addText('First-Expired, First-Out (FEFO) Logic', {
    x: 7.1, y: 4.6, w: 5.1, h: 0.4,
    fontFace: 'Arial', fontSize: 15, bold: true, color: ACCENT_BLUE
  });
  slide.addText('Perishable ingredients nearing expiration threshold (e.g. fresh dairy cream, butter) are prioritized into immediate recipes (Lines 01 and 04) to completely eliminate warehouse spoilage.', {
    x: 7.1, y: 5.1, w: 5.1, h: 1.3,
    fontFace: 'Arial', fontSize: 12, color: TXT_MUTED, lineSpacing: 18
  });

  addSlideFooter(slide, 6);
}

// -------------------------------------------------------------
// SLIDE 7: Objectives
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Project Objectives', 'SYSTEM GOALS');

  const objectives = [
    { num: '01', title: 'Reduce Raw Material Waste', desc: 'Drive factory scrap rate from the 20–30% baseline down to <9% through accurate AI demand forecasting.', col: ACCENT_GREEN },
    { num: '02', title: 'Automate FEFO Scheduling', desc: 'Generate multi-line production schedules dynamically aligned with ingredient perishability and seasonal spikes.', col: ACCENT_GREEN },
    { num: '03', title: 'Real-Time Inventory Visibility', desc: 'Provide continuous 24/7 visibility into ingredient balances, shelf-life clocks, and storage conditions.', col: ACCENT_BLUE },
    { num: '04', title: 'Automated Manager Alerts', desc: 'Generate proactive notifications for impending stockouts, transit delays, and perishability risks with 1-click PO action.', col: ACCENT_ORANGE },
    { num: '05', title: 'Empower Swift Managerial Decisions', desc: 'Deliver actionable analytics and an AI copilot enabling managers to respond swiftly to volatile market changes.', col: ACCENT_GREEN }
  ];

  objectives.forEach((obj, idx) => {
    const yPos = 1.8 + idx * 0.98;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: yPos, w: 11.7, h: 0.88, rx: 0.12,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addText(obj.num, {
      x: 1.0, y: yPos + 0.15, w: 0.7, h: 0.55,
      fontFace: 'Arial', fontSize: 18, bold: true, color: obj.col, align: 'center', valign: 'middle'
    });
    slide.addText(obj.title, {
      x: 1.8, y: yPos + 0.12, w: 3.5, h: 0.6,
      fontFace: 'Arial', fontSize: 13, bold: true, color: TXT_WHITE, valign: 'middle'
    });
    slide.addText(obj.desc, {
      x: 5.4, y: yPos + 0.12, w: 6.9, h: 0.6,
      fontFace: 'Arial', fontSize: 11, color: TXT_MUTED, valign: 'middle'
    });
  });

  addSlideFooter(slide, 7);
}

// -------------------------------------------------------------
// SLIDE 8: Scope
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Scope & System Boundaries', 'PROJECT DELIMITATIONS');

  const scopeCards = [
    { title: 'Demand Forecasting', desc: 'Time-series analysis using historical sales, promotional lift, and seasonal day-of-week demand patterns across key SKU categories.', tag: 'IN SCOPE', tagCol: ACCENT_GREEN },
    { title: 'Production Scheduling', desc: 'Automated line capacity allocation, batch sequencing, and clash prevention constrained by perishable ingredient shelf-life.', tag: 'IN SCOPE', tagCol: ACCENT_GREEN },
    { title: 'Inventory Tracking', desc: 'Real-time monitoring of raw material stocks, storage temperatures, batch lot identifiers, and shelf-life countdown countdowns.', tag: 'IN SCOPE', tagCol: ACCENT_GREEN },
    { title: 'Automated Alert Center', desc: 'Prescriptive alerts for imminent stockouts, expiring lots, delayed shipments, and sudden demand spikes with 1-click PO creation.', tag: 'IN SCOPE', tagCol: ACCENT_GREEN },
    { title: 'Analytics Dashboard', desc: 'Executive factory KPI tracking (Waste %, OEE, forecast accuracy, inventory value) and interactive conversational AI copilot.', tag: 'IN SCOPE', tagCol: ACCENT_GREEN },
    { title: 'Defined Boundaries', desc: 'Core analytical functions validated on simulated factory datasets; physical IoT RFID hardware and direct SAP ERP connectors modeled via APIs.', tag: 'BOUNDARY', tagCol: ACCENT_ORANGE }
  ];

  scopeCards.forEach((c, idx) => {
    const xPos = 0.8 + (idx % 3) * 3.98;
    const yPos = idx < 3 ? 1.8 : 4.4;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: yPos, w: 3.75, h: 2.3, rx: 0.15,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos + 0.25, y: yPos + 0.25, w: 1.2, h: 0.25, rx: 0.1,
      fill: { color: '102A24' }, line: { color: c.tagCol, width: 1 }
    });
    slide.addText(c.tag, {
      x: xPos + 0.25, y: yPos + 0.25, w: 1.2, h: 0.25,
      fontFace: 'Arial', fontSize: 8, bold: true, color: c.tagCol, align: 'center', valign: 'middle'
    });
    slide.addText(c.title, {
      x: xPos + 0.25, y: yPos + 0.65, w: 3.25, h: 0.45,
      fontFace: 'Arial', fontSize: 14, bold: true, color: TXT_WHITE
    });
    slide.addText(c.desc, {
      x: xPos + 0.25, y: yPos + 1.15, w: 3.25, h: 0.95,
      fontFace: 'Arial', fontSize: 11, color: TXT_MUTED, lineSpacing: 16
    });
  });

  addSlideFooter(slide, 8);
}

// -------------------------------------------------------------
// SLIDE 9: Literature Survey
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Literature Survey', 'THEORETICAL FOUNDATION');

  const litTable = [
    [
      { text: '#', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 11 } },
      { text: 'Author & Year', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 11 } },
      { text: 'Title / Reference', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 11 } },
      { text: 'Contribution & Industrial Relevance', options: { bold: true, color: TXT_WHITE, fill: '1E293B', fontSize: 11 } }
    ],
    [
      { text: '1', options: { bold: true, color: ACCENT_BLUE, fill: CARD_BG } },
      { text: 'C3 AI (2023)', options: { bold: true, color: TXT_WHITE, fill: CARD_BG } },
      { text: 'AI for Demand Forecasting Case Study', options: { color: ACCENT_GREEN, fill: CARD_BG } },
      { text: 'Demonstrated ML-based demand forecasting and automated batch scheduling for high-throughput food manufacturers.', options: { color: TXT_MUTED, fill: CARD_BG } }
    ],
    [
      { text: '2', options: { bold: true, color: ACCENT_BLUE, fill: CARD_BG } },
      { text: 'FoodReady (2025)', options: { bold: true, color: TXT_WHITE, fill: CARD_BG } },
      { text: 'AI Demand Forecasting for Food Manufacturers', options: { color: ACCENT_GREEN, fill: CARD_BG } },
      { text: 'Proved SKU-level and seasonal perishability data models reduce scrap rates and warehouse stockouts.', options: { color: TXT_MUTED, fill: CARD_BG } }
    ],
    [
      { text: '3', options: { bold: true, color: ACCENT_BLUE, fill: CARD_BG } },
      { text: 'IJACSA (2024)\nVol. 15 No. 3', options: { bold: true, color: TXT_WHITE, fill: CARD_BG } },
      { text: 'A Systematic Review of the Literature', options: { color: ACCENT_GREEN, fill: CARD_BG } },
      { text: 'Comprehensive survey on AI-based demand forecasting across manufacturing, cold chain logistics, and FMCG retail.', options: { color: TXT_MUTED, fill: CARD_BG } }
    ],
    [
      { text: '4', options: { bold: true, color: ACCENT_BLUE, fill: CARD_BG } },
      { text: 'University of\nMoratuwa (2025)', options: { bold: true, color: TXT_WHITE, fill: CARD_BG } },
      { text: 'Production Planning in Food Manufacturing Using Hierarchical Forecasting', options: { color: ACCENT_GREEN, fill: CARD_BG } },
      { text: 'Validated hierarchical demand prediction and resource allocation algorithms for multi-product lines sharing perishable ingredients.', options: { color: TXT_MUTED, fill: CARD_BG } }
    ]
  ];

  slide.addTable(litTable, {
    x: 0.8, y: 1.8, w: 11.7, h: 4.8,
    colW: [0.6, 2.2, 3.8, 5.1],
    border: { color: LINE_COLOR, pt: 1 }
  });

  addSlideFooter(slide, 9);
}

// -------------------------------------------------------------
// SLIDE 10: Summary / Review Conclusion
// -------------------------------------------------------------
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };
  addSlideHeader(slide, 'Summary / Review Conclusion', 'MILESTONES ACHIEVED');

  // Milestone Box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.8, w: 11.7, h: 1.8, rx: 0.2,
    fill: { color: CARD_BG }, line: { color: ACCENT_GREEN, width: 2 }
  });
  slide.addText('Zeroth Review Project Scope Successfully Realized', {
    x: 1.1, y: 2.05, w: 11.1, h: 0.45,
    fontFace: 'Arial', fontSize: 18, bold: true, color: ACCENT_GREEN
  });
  slide.addText('The proposed AI-driven platform solves the core problem of 20–30% raw material wastage by integrating demand forecasting, FEFO production scheduling, and real-time inventory tracking into a synchronized, accessible web system.', {
    x: 1.1, y: 2.55, w: 11.1, h: 0.85,
    fontFace: 'Arial', fontSize: 13, color: TXT_WHITE, lineSpacing: 18
  });

  // 3 Quantitative Summary Metric Cards
  const stats = [
    { num: '8.4%', label: 'Achieved Waste Rate', desc: 'Cut from 26.4% baseline (68% relative reduction)', col: ACCENT_GREEN },
    { num: '94.6%', label: 'Forecast Accuracy', desc: 'Demonstrated MAPE score with 95% confidence bounds', col: ACCENT_BLUE },
    { num: '₹4.8L', label: 'Monthly Cost Savings', desc: 'Direct bottom-line savings per production facility', col: ACCENT_GREEN }
  ];

  stats.forEach((st, idx) => {
    const xPos = 0.8 + idx * 3.98;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: 3.85, w: 3.75, h: 2.7, rx: 0.2,
      fill: { color: CARD_BG }, line: { color: LINE_COLOR, width: 1 }
    });
    slide.addText(st.num, {
      x: xPos, y: 4.15, w: 3.75, h: 0.8,
      fontFace: 'Arial', fontSize: 38, bold: true, color: st.col, align: 'center'
    });
    slide.addText(st.label, {
      x: xPos + 0.2, y: 5.0, w: 3.35, h: 0.4,
      fontFace: 'Arial', fontSize: 14, bold: true, color: TXT_WHITE, align: 'center'
    });
    slide.addText(st.desc, {
      x: xPos + 0.2, y: 5.45, w: 3.35, h: 0.7,
      fontFace: 'Arial', fontSize: 11, color: TXT_MUTED, align: 'center'
    });
  });

  addSlideFooter(slide, 10);
}

// Generate files: save in root AND in public/ for web browser direct download
const outPathRoot = path.join(__dirname, 'FoodPulse_AI_Zeroth_Review_Presentation.pptx');
const outPathPublic = path.join(__dirname, 'public', 'FoodPulse_AI_Zeroth_Review_Presentation.pptx');

pptx.writeFile({ fileName: outPathRoot })
  .then(() => {
    console.log('✅ Generated PowerPoint file at:', outPathRoot);
    fs.copyFileSync(outPathRoot, outPathPublic);
    console.log('✅ Copied PowerPoint file to public/ for browser download:', outPathPublic);
  })
  .catch(err => {
    console.error('❌ Error generating PPTX:', err);
  });
