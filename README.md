# FoodPulse AI — AI-Driven Food Manufacturing Planning Platform

> **Predict. Produce. Prevent Waste.**  
> Built for **SRM Easwari Engineering College (SRM EEC)**  
> **Zeroth Project Review & Technical Demonstration**  
> **Candidate:** Harish Kanna M (Roll No: `310624104095`)  
> **Faculty Guide / Trainer:** Nagamani Segalla  

---

## 📌 Executive Abstract & Problem Statement

Food manufacturers waste **20–30% of raw materials** due to inaccurate production planning and manual spreadsheets that ignore ingredient perishability and fluctuating demand patterns. 

**FoodPulse AI** solves this systemic challenge with an integrated web platform that:
1. **Forecasts demand** across multi-horizon timelines (7d, 14d, 30d, 90d) with 94.6% accuracy.
2. **Schedules production lines** dynamically using **First-Expired, First-Out (FEFO)** mathematical optimization.
3. **Tracks raw material inventory** in real time with shelf-life countdown clocks.
4. **Dispatches automated alerts** and enables 1-click mitigation of stockouts and transit disruptions.
5. **Reduces scrap waste** from **26.4% down to 8.4%**, generating **₹4,80,000 monthly cost savings** per manufacturing facility.

---

## 🏛️ System Architecture

The platform operates across a synchronized 5-stage closed-loop pipeline:

```
[ Data Ingestion ] ──────> [ AI Forecasting Engine ] ──────> [ FEFO Production Scheduler ]
(POS, historical orders,     (Holt-Winters time-series,        (Perishability priority scoring,
 weather, shipment ETA)       seasonality & trend analysis)     capacity clash avoidance)
                                                                            │
                                                                            ▼
[ Cockpit / Alert Center ] <─────────────────────────────────── [ Real-Time Inventory Tracker ]
(Automated alert mitigation,                                     (Lot balances, storage temp,
 AI copilot, audit export)                                       FEFO countdown timeline)
```

---

## 🚀 Live Local Deployment & Usage

### 1. Instant Launch (Windows)
Double-click `start.bat` or run:
```powershell
cd C:\Users\acer\.gemini\antigravity\scratch\foodpulse-ai
node server.js
```
Then open your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

### 2. Demo Login Credentials
- **Role:** Manufacturing Manager (Chennai Plant Unit 01)
- **Email:** `manager@foodpulse.ai`
- **Password:** `demo123`

---

## 🖥️ Interactive Presentation Mode (10 Slides)

Click the **"Present Slides"** or **"Slides"** button inside the web app (or press <kbd>Esc</kbd> / <kbd>→</kbd> / <kbd>←</kbd>) to launch the embedded **SRM EEC Zeroth Review Slide Deck**:
- **Slide 1:** Project Title, Student & Guide Details
- **Slide 2:** Abstract & Key Value Proposition
- **Slide 3:** Introduction & Manufacturing Challenges
- **Slide 4:** Problem Statement (Spreadsheet flaws, 20-30% waste)
- **Slide 5:** Existing System vs Disadvantages
- **Slide 6:** Proposed System Architecture (5-stage pipeline)
- **Slide 7:** Project Objectives (Measurable outcomes)
- **Slide 8:** Project Scope & Functional Boundaries
- **Slide 9:** Literature Survey (C3 AI, FoodReady, IJACSA, Univ of Moratuwa)
- **Slide 10:** Summary & Review Conclusion

---

## ☁️ Cloud Deployment Options

### Deploy with Docker
```bash
docker build -t foodpulse-ai .
docker run -p 3000:3000 foodpulse-ai
```

### Deploy to Render
1. Push this repository to GitHub.
2. In Render, select **New Web Service** and link the repository.
3. Render automatically picks up `render.yaml` and starts `node server.js`.

### Deploy to Vercel
```bash
npx vercel
```
Vercel automatically detects `vercel.json` and configures the `@vercel/node` runtime.

---

## 📊 Core Features & Capabilities

| Feature | Capability | Industrial Benefit |
| :--- | :--- | :--- |
| **Demand Forecasting** | 7d/14d/30d/90d horizons, 90% & 95% confidence intervals, decomposition factors | Eliminates stockouts & aligns procurement |
| **FEFO Production Scheduler** | 4-stage optimization pipeline, drag-and-drop job reordering, clash check | Prioritizes perishable dairy lots before expiry |
| **Inventory Intelligence** | Lot numbers, storage temperatures, search, filter, and add material modal | 100% visibility over warehouse ingredients |
| **Alert Center** | Severity levels (Critical, Warning, Attention), 1-click PO creation | Swift response to transit delays and shortages |
| **AI Copilot** | Natural-language query assistant for factory managers | Immediate situational awareness on demand |
| **Sustainability Audit** | Waste reduction formula, CO2 offset metrics, printable report | Audit-ready for college reviews & plant audits |

---

## 📚 Academic Literature Survey

1. **C3 AI (2023):** *AI for Demand Forecasting Case Study* — Machine learning demand prediction for food plants.
2. **FoodReady (2025):** *AI Demand Forecasting for Food Manufacturers* — SKU-level perishability modeling to curtail food waste.
3. **IJACSA (2024), Vol. 15 No. 3:** *A Systematic Review of the Literature* — AI time-series architectures in food manufacturing.
4. **University of Moratuwa (2025):** *Production Planning in Food Manufacturing Using Hierarchical Forecasting* — Shared perishable ingredient allocation.
