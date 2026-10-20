import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { OfflineBanner } from './OfflineBanner';
import { ToastContainer } from '../common/ToastContainer';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useApp();

  // Page title mapping based on route
  const getPageMeta = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return { title: t.nav.dashboard, subtitle: 'Real-time micro-climate & crop risk telemetry' };
    if (path.includes('farms')) return { title: t.nav.farms, subtitle: 'Plot boundaries, active crops, and soil profiles' };
    if (path.includes('risk-radar')) return { title: t.nav.riskRadar, subtitle: 'Multi-factor risk prediction and evidence stream' };
    if (path.includes('crop-doctor')) return { title: t.nav.cropDoctor, subtitle: 'Visual symptom assessment & safe cultural guidance' };
    if (path.includes('action-planner')) return { title: t.nav.actionPlanner, subtitle: 'Prioritized adaptive farm operations' };
    if (path.includes('profitguard')) return { title: t.nav.profitguard, subtitle: 'Deterministic economic simulator & scenario comparison' };
    if (path.includes('field-intelligence')) return { title: t.nav.fieldIntelligence, subtitle: 'Satellite vegetation index & vigor zoning' };
    if (path.includes('irrigation')) return { title: t.nav.irrigation, subtitle: 'Soil-water balance & weather-informed watering schedule' };
    if (path.includes('soil')) return { title: t.nav.soil, subtitle: 'Soil health card interpretation & nutrient balancing' };
    if (path.includes('community-alerts')) return { title: t.nav.communityAlerts, subtitle: 'Regional pest & pathogen early-warning surveillance' };
    if (path.includes('insurance')) return { title: t.nav.insurance, subtitle: 'PMFBY loss evidence timeline & 72h intimation readiness' };
    if (path.includes('assistant')) return { title: t.nav.assistant, subtitle: 'Bilingual voice-assisted farm decision support' };
    if (path.includes('decision-history')) return { title: t.nav.decisionHistory, subtitle: 'Transparent five-stage explainability & audit history' };
    if (path.includes('settings')) return { title: t.nav.settings, subtitle: 'Farmer profile, language, notifications, and demo controls' };
    if (path.includes('expert')) return { title: t.nav.expertPortal, subtitle: 'Agronomist verification and escalation desk' };
    return { title: t.brandName, subtitle: t.tagline };
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-surface-warm dark:bg-forest-950/95 flex transition-colors">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <OfflineBanner />
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};
