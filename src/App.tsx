import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage, RegisterPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Authenticated Application Pages
import { DashboardPage } from './pages/DashboardPage';
import { FarmsPage } from './pages/FarmsPage';
import { RiskRadarPage } from './pages/RiskRadarPage';
import { CropDoctorPage } from './pages/CropDoctorPage';
import { ActionPlannerPage } from './pages/ActionPlannerPage';
import { ProfitGuardPage } from './pages/ProfitGuardPage';
import { FieldIntelligencePage } from './pages/FieldIntelligencePage';
import { IrrigationPage } from './pages/IrrigationPage';
import { SoilPage } from './pages/SoilPage';
import { CommunityAlertsPage } from './pages/CommunityAlertsPage';
import { InsurancePage } from './pages/InsurancePage';
import { AssistantPage } from './pages/AssistantPage';
import { DecisionHistoryPage } from './pages/DecisionHistoryPage';
import { SettingsPage } from './pages/SettingsPage';

// Expert Pages
import { ExpertDashboardPage } from './pages/expert/ExpertDashboardPage';
import { ExpertCasesPage, ExpertCaseDetailPage } from './pages/expert/ExpertCasesPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated Farm Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="farms" element={<FarmsPage />} />
            <Route path="risk-radar" element={<RiskRadarPage />} />
            <Route path="crop-doctor" element={<CropDoctorPage />} />
            <Route path="action-planner" element={<ActionPlannerPage />} />
            <Route path="profitguard" element={<ProfitGuardPage />} />
            <Route path="field-intelligence" element={<FieldIntelligencePage />} />
            <Route path="irrigation" element={<IrrigationPage />} />
            <Route path="soil" element={<SoilPage />} />
            <Route path="community-alerts" element={<CommunityAlertsPage />} />
            <Route path="insurance" element={<InsurancePage />} />
            <Route path="assistant" element={<AssistantPage />} />
            <Route path="decision-history" element={<DecisionHistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Expert Review Routes */}
          <Route path="/expert" element={<AppLayout />}>
            <Route index element={<Navigate to="/expert/dashboard" replace />} />
            <Route path="dashboard" element={<ExpertDashboardPage />} />
            <Route path="cases" element={<ExpertCasesPage />} />
            <Route path="cases/:id" element={<ExpertCaseDetailPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
