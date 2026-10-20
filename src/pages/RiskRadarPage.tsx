import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { riskService } from '../services/riskService';
import { RiskItem, RiskCategory, RiskLevel } from '../types';
import { 
  Radar, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ExternalLink, 
  Filter, 
  ChevronRight, 
  Cpu, 
  Clock, 
  Send,
  HelpCircle,
  Eye
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { DataFreshnessTag, DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { RiskHistoryChart } from '../components/charts/RiskHistoryChart';

export const RiskRadarPage: React.FC = () => {
  const { selectedFarm, selectedField, setSelectedFieldId, t, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeRiskModal, setActiveRiskModal] = useState<RiskItem | null>(null);

  const risks = riskService.getRisks(selectedField?.id);

  // Filter
  const filteredRisks = risks.filter(r => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (selectedSeverity !== 'all' && r.level !== selectedSeverity) return false;
    return true;
  });

  const handleEscalate = (risk: RiskItem) => {
    riskService.escalateToExpert(risk.id);
    showToast({
      type: 'success',
      title: 'Escalated to Agricultural Officer',
      message: `Risk case for ${risk.title} submitted to KVK Sehore expert review desk.`
    });
    setActiveRiskModal(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              {t.riskRadar.title}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Micro-Climate Predictive
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
            {t.riskRadar.subtitle} Note: A weather-related risk alert is a forecast of favorable disease conditions, not proof that pathogens are already present.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedField?.id}
            onChange={(e) => setSelectedFieldId(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-surface-border dark:border-forest-800 bg-surface-warm dark:bg-forest-900 text-kisan-text dark:text-white"
          >
            {selectedFarm.fields.map(f => (
              <option key={f.id} value={f.id}>{f.name} ({f.currentCrop})</option>
            ))}
          </select>
        </div>
      </div>

      <DisclaimerBanner variant="compact" />

      {/* 7-Day Risk History Evolution Chart */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900 gap-2">
          <div>
            <h3 className="text-sm font-bold text-kisan-text dark:text-white">
              7-Day Crop Threat Index History & Trend
            </h3>
            <p className="text-xs text-kisan-muted dark:text-gray-400">
              Tracking canopy wetness accumulation, soil moisture tension, and pest threshold flight activity.
            </p>
          </div>
          <DataFreshnessTag timestamp="Updated 2h ago · Simulated Model v2.4" />
        </div>
        <div className="mt-4">
          <RiskHistoryChart />
        </div>
      </Card>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-forest-950 p-4 rounded-2xl border border-surface-border dark:border-forest-900 shadow-card">
        <div className="flex items-center gap-2 text-xs font-bold text-kisan-text dark:text-white">
          <Filter className="w-4 h-4 text-forest-700" />
          <span>Filters:</span>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs rounded-xl border border-surface-border dark:border-forest-800 px-3 py-1.5 bg-surface-warm dark:bg-forest-900 text-kisan-text dark:text-white"
        >
          <option value="all">All Risk Categories</option>
          <option value="disease_weather">Disease-Conducive Weather</option>
          <option value="water_stress">Water / Drought Stress</option>
          <option value="excess_rainfall">Excess Rainfall / Waterlogging</option>
          <option value="pest_outbreak">Pest Flight Thresholds</option>
        </select>

        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="text-xs rounded-xl border border-surface-border dark:border-forest-800 px-3 py-1.5 bg-surface-warm dark:bg-forest-900 text-kisan-text dark:text-white"
        >
          <option value="all">All Severities</option>
          <option value="elevated">Elevated & High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRisks.map((risk) => (
          <Card key={risk.id} className="p-6 flex flex-col justify-between hoverable">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant={risk.level as any} dot>
                  {risk.level.toUpperCase()} · {risk.categoryLabel}
                </Badge>
                <span className="text-xs text-kisan-muted dark:text-gray-400 font-semibold">
                  Forecast: {risk.forecastPeriod}
                </span>
              </div>

              <h3 className="text-base font-bold text-kisan-text dark:text-white">
                {risk.title}
              </h3>

              <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">
                {risk.explanation}
              </p>

              {/* Evidence Panel */}
              <div className="mt-4 pt-4 border-t border-surface-border dark:border-forest-900">
                <span className="text-[11px] font-bold text-kisan-text dark:text-white uppercase tracking-wider block mb-2">
                  Diagnostic Ground Evidence Stream:
                </span>
                <div className="space-y-2">
                  {risk.evidence.map((ev, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-surface-warm dark:bg-forest-900/60 text-xs">
                      <span className="font-medium text-kisan-text dark:text-gray-200">{ev.label}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-forest-700 dark:text-fresh">{ev.value}</span>
                        <DataSourceBadge type={ev.source} sourceName={ev.sourceName} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing information callout */}
              {risk.missingInformation && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Information that would refine this assessment:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {risk.missingInformation.map((info, idx) => (
                      <li key={idx}>{info}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommended Action Footer */}
            <div className="mt-5 pt-4 border-t border-surface-border dark:border-forest-900">
              <div className="p-3 rounded-xl bg-forest-900 text-white text-xs">
                <span className="text-fresh font-bold block mb-1">
                  Recommended Action ({risk.actionUrgency.replace('_', ' ')}):
                </span>
                <p className="text-forest-100 text-[11px] leading-relaxed">
                  {risk.recommendedNextAction}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setActiveRiskModal(risk)}
                  className="text-xs font-bold text-forest-700 dark:text-fresh hover:underline inline-flex items-center gap-1"
                >
                  Inspect Full Rationale & Evidence <ChevronRight className="w-4 h-4" />
                </button>

                {risk.expertEscalationAvailable && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEscalate(risk)}
                    leftIcon={<Send className="w-3.5 h-3.5 text-forest-700" />}
                  >
                    Escalate to Agronomist
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Deep-Dive Evidence & Model Explanation Modal */}
      {activeRiskModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveRiskModal(null)}
          title={`Explainable Risk Breakdown: ${activeRiskModal.title}`}
          subtitle={`${activeRiskModal.fieldName} · ${activeRiskModal.crop}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800">
              <span className="font-bold text-kisan-text dark:text-white block mb-1">What This Risk Means</span>
              <p className="text-kisan-muted dark:text-gray-300 leading-relaxed">{activeRiskModal.explanation}</p>
            </div>

            <div>
              <span className="font-bold text-kisan-text dark:text-white block mb-2 uppercase tracking-wider text-[11px]">
                Ground Evidence & Data Provenance
              </span>
              <div className="space-y-2">
                {activeRiskModal.evidence.map((ev, i) => (
                  <div key={i} className="p-3 rounded-xl border border-surface-border dark:border-forest-800 bg-white dark:bg-forest-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-semibold text-kisan-text dark:text-white">{ev.label}</span>
                      <span className="text-[11px] text-kisan-muted block">{ev.sourceName} · {ev.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-forest-700 dark:text-fresh">{ev.value}</span>
                      <DataSourceBadge type={ev.source} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-warm dark:bg-forest-900 text-xs">
              <div>
                <span className="text-kisan-muted block text-[10px]">Model Architecture</span>
                <span className="font-semibold text-kisan-text dark:text-white">{activeRiskModal.modelVersion || 'Calibrated Agromet v2.4'}</span>
              </div>
              <div>
                <span className="text-kisan-muted block text-[10px]">Uncertainty Level</span>
                <span className="font-semibold text-amber-600">{activeRiskModal.uncertaintyRating} Uncertainty</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveRiskModal(null)}
              >
                Close
              </Button>
              {activeRiskModal.expertEscalationAvailable && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEscalate(activeRiskModal)}
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Submit Case to Human Expert
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
