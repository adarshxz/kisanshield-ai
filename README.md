# KisanShield AI — From Reactive Farming to Predictive Farming

> **Predict the risk. Explain the reason. Recommend the action. Measure the outcome.**

KisanShield AI is an explainable agricultural risk intelligence and decision-support platform designed for farmers, agricultural extension workers, and agronomists. It bridges micro-climate weather forecasts, crop phenology, visual leaf diagnostics, soil water balance, and farm economics into an interconnected, actionable decision workflow.

---

## 🌾 Core Product Philosophy

The platform helps farmers answer five fundamental questions:

1. **What is happening on my farm?** (Phenology, soil moisture, micro-climate conditions)
2. **What could go wrong next?** (Pathogen wetness windows, pest flight thresholds, moisture deficits)
3. **Why does the system believe this?** (Transparent ground evidence stream and data provenance)
4. **What should I do next?** (Prioritized daily operations emphasizing safe cultural and biological steps)
5. **Did the recommended action actually help?** (Closed-loop audit logging of farmer actions and observed harvest outcomes)

---

## 🛡️ Trust, Transparency & Provenance

KisanShield AI strictly adheres to agricultural safety principles:
- **Data Provenance Badges**: Every telemetry data point is labeled as `Measured (Physical/Sensor)`, `Farmer Reported`, `Verified Agronomic Knowledge (IMD/ICAR)`, `Model Prediction`, `Simulated Scenario`, or `Expert Verified`.
- **Honest Uncertainty**: Forecast disease conduciveness is never presented as confirmed pathogen presence.
- **Deterministic Economics**: ProfitGuard calculates gross revenue, total expenses, net margin, and break-even selling prices using exact arithmetic.
- **Bilingual Interface**: Full English and Hindi (हिन्दी / Noto Sans Devanagari) support.
- **Offline-First Resilience**: All farms, tasks, risk assessments, and financial scenarios persist locally in `localStorage`, accompanied by an offline banner and sync simulation.
- **Agronomist Escalation Desk**: Qualified agricultural reviewers can review high-uncertainty cases, preserving the original automated model assessment while appending verified clinical corrections.

---

## 🚀 Key Modules & Routes

### Public Routes
- `/` — Modern, conversion-focused landing page featuring the 5-question framework and trust transparency.
- `/login` — Sign-in screen with one-click demo credentials for farmers and expert reviewers.
- `/register` — Account registration.
- `/onboarding` — 5-step Farm Onboarding Wizard configuring crops, plots, soil profiles, and irrigation methods.

### Authenticated Application Routes (`/app`)
- `/app/dashboard` — Central operational command center with micro-climate telemetry, 5-day forecast chart, risk highlights, today's tasks, and field health.
- `/app/farms` — Farm and plot management with interactive Leaflet boundary maps and plot creation.
- `/app/risk-radar` — Multi-factor predictive threat monitoring (disease weather, moisture stress, waterlogging, pest flights) with a 7-day risk evolution chart and evidence inspection modal.
- `/app/crop-doctor` — Multimodal symptom assessment with leaf photo dropzone, structured symptom checklist, explainable candidate causes, missing information prompts, and expert review requests.
- `/app/action-planner` — Weather-adaptive farm task management with completion outcome logging, task skipping with reasons, and dynamic adaptation history.
- `/app/profitguard` — Farm economics simulator comparing Adverse, Expected, and Favorable scenarios with break-even selling price calculations and sensitivity bar charts.
- `/app/field-intelligence` — Open-access Sentinel-2 NDVI time series trend, intra-field vigor zoning, cloud-mask notices, and physical scouting targets.
- `/app/irrigation` — Root zone soil-water balance timeline comparing fixed traditional vs weather-adaptive schedules that account for upcoming rain.
- `/app/soil` — Soil Health Card (SHC) parameters (pH, OC, N, P, K, Zn) with deficit ratings and ICAR nutrient recommendations.
- `/app/community-alerts` — Localized pest early-warning surveillance with privacy-conscious block-level location aggregation and agronomist verification.
- `/app/insurance` — Crop loss evidence organizer with PMFBY 72-hour claim intimation checklist, weather event timeline, and geotagged photo attachments.
- `/app/assistant` — Voice-first Kisan Assistant with Web Speech API integration, Hindi/English speech synthesis, and grounded farm context.
- `/app/decision-history` — Transparent 5-stage explainability audit trail (Input Evidence → Risk Assessment → Recommendation → Farmer Action → Observed Outcome).
- `/app/settings` — Profile, notification triggers, theme mode (Light/Dark), and one-click demo data reset.

### Agricultural Expert Routes (`/expert`)
- `/expert/dashboard` — Agronomist review desk for high-uncertainty farmer cases.
- `/expert/cases` — Queue of submitted diagnostic cases.
- `/expert/cases/:id` — Individual case inspection preserving original AI output while recording agronomist diagnosis and signed advisory.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5 with manual vendor chunking
- **Styling**: Tailwind CSS with custom agricultural palette (`#166534`, `#123524`, `#22C55E`, `#F8FAF5`)
- **Navigation**: React Router v6
- **Data Visualization**: Recharts (ComposedChart, AreaChart, BarChart, LineChart)
- **Mapping**: Leaflet & React Leaflet with OpenStreetMap and World Imagery satellite layers
- **Icons**: Lucide React
- **Internationalization**: Bilingual English and Hindi dictionary architecture
- **State & Storage**: React Context API with persistent `localStorage` synchronization

---

## 📦 Setup & Development Instructions

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Builds optimized production assets in `dist/`.

### Preview Build
```bash
npm run preview
```

---

## 🌾 Demonstration Farm Dataset

The application is seeded with realistic demonstration data from **Sehore District, Madhya Pradesh, India (Agro-Climatic Zone VII)**:
- **Farm**: Kisan Demo Adarsh Farm (Owner: Ramesh Patel)
- **Plots**:
  - **Field A (North Ridge)**: 5.0 Acres · Soybean (JS 20-34) · Pod Formation Stage · Deep Black Cotton Soil · Sprinkler
  - **Field B (Canal Side)**: 4.5 Acres · Wheat (Sharbati C-306) · Early Vegetative · Medium Black Loam · Furrow
  - **Field C (South Terraces)**: 3.0 Acres · Gram / Chickpea (JG-11) · Flowering · Light Clay Loam · Rainfed

To restore all baseline data at any time, tap **"Reset Demo Data"** in the sidebar footer or in Settings.

---

## ⚖️ Mandatory Agricultural Advisory Notice

> *KisanShield AI provides agricultural decision support. Assessments may be uncertain and depend on the quality and freshness of available data. Verify important crop-treatment, irrigation, fertilizer, and financial decisions with trusted local guidance or a qualified agricultural expert.*
