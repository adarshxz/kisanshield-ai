import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { satelliteService, FieldSatelliteData } from '../services/satelliteService';
import { 
  Satellite, 
  Layers, 
  AlertCircle, 
  Info, 
  MapPin, 
  Cloud, 
  CheckCircle2, 
  TrendingUp, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DisclaimerBanner, DataFreshnessTag } from '../components/common/DisclaimerBanner';
import { FieldMap } from '../components/maps/FieldMap';
import { VegetationTrendChart } from '../components/charts/VegetationTrendChart';

export const FieldIntelligencePage: React.FC = () => {
  const { selectedFarm, selectedField, setSelectedFieldId } = useApp();
  const [showNdviOverlay, setShowNdviOverlay] = useState(true);

  const satelliteData: FieldSatelliteData = satelliteService.getFieldSatelliteData(selectedField?.id || 'field-a');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <Satellite className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              Satellite Field Intelligence & Vegetation Health
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Sentinel-2 L2A (Simulated)
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
            Normalized Difference Vegetation Index (NDVI) monitoring for vigor trends, cloud coverage masking, and suggested scouting zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedField?.id}
            onChange={(e) => setSelectedFieldId(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-surface-border dark:border-forest-800 bg-white dark:bg-forest-900 text-kisan-text dark:text-white"
          >
            {selectedFarm.fields.map(f => (
              <option key={f.id} value={f.id}>{f.name} ({f.currentCrop})</option>
            ))}
          </select>
        </div>
      </div>

      <DisclaimerBanner 
        customText="Satellite vegetation indices are spectral canopy indicators, not definitive diagnoses. Atmospheric moisture, cloud shadows, crop phenology, and leaf angle affect NDVI readings. Never apply chemical inputs based on satellite imagery alone without physical field scouting."
      />

      {/* Map & Vigor Overlay Container */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-kisan-text dark:text-white uppercase tracking-wider">
              High-Resolution Vegetation Layer & Plot Boundaries
            </span>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={showNdviOverlay}
              onChange={(e) => setShowNdviOverlay(e.target.checked)}
              className="w-4 h-4 text-forest-700 rounded"
            />
            <span className="text-kisan-text dark:text-white">Show Vigor Shading</span>
          </label>
        </div>

        <FieldMap
          fields={selectedFarm.fields}
          selectedFieldId={selectedField?.id}
          onSelectField={(id) => setSelectedFieldId(id)}
          showNdviOverlay={showNdviOverlay}
        />
      </div>

      {/* 2-Column: NDVI Trend Line & Zone Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 8-Week NDVI Trend (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900 gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-kisan-text dark:text-white">
                  Vegetation Index (NDVI) Time Series Trend
                </h3>
                <p className="text-xs text-kisan-muted dark:text-gray-400">
                  {satelliteData.fieldName} ({satelliteData.crop})
                </p>
              </div>
              <DataFreshnessTag timestamp="Latest Pass: 16 Oct 2026" />
            </div>

            <VegetationTrendChart data={satelliteData.trend} />

            <div className="mt-4 p-3 rounded-xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800 text-xs flex items-start gap-2.5">
              <Cloud className="w-4 h-4 text-kisan-muted shrink-0 mt-0.5" />
              <div className="text-kisan-muted dark:text-gray-300 text-[11px] leading-relaxed">
                <span className="font-bold text-kisan-text dark:text-white block">Cloud Quality Notice:</span>
                {satelliteData.cloudInterferenceNotice}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Zone Breakdown & Ground Scouting Target (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-border dark:border-forest-900">
              <h3 className="text-sm font-bold text-kisan-text dark:text-white">
                Intra-Field Vigor Zones
              </h3>
              <span className="text-xs text-forest-700 dark:text-fresh font-bold">
                Latest Mean: {satelliteData.latestNdvi}
              </span>
            </div>

            <div className="space-y-3">
              {satelliteData.zones.map((zone, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-surface-border dark:border-forest-800 bg-surface-warm/60 dark:bg-forest-900/40 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-kisan-text dark:text-white">{zone.zoneName}</span>
                    <span className="font-bold" style={{ color: zone.color }}>{zone.vigorStatus}</span>
                  </div>
                  <div className="w-full bg-surface-border dark:bg-forest-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${zone.areaPercent}%`, backgroundColor: zone.color }} 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-kisan-muted mt-1">
                    <span>Coverage</span>
                    <span>{zone.areaPercent}% of plot</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Scouting Location */}
            <div className="p-4 rounded-2xl bg-forest-900 text-white text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-fresh" />
                <span className="font-bold text-fresh">Suggested In-Person Inspection Zone:</span>
              </div>
              <p className="text-forest-100 text-[11px] leading-relaxed">
                {satelliteData.suggestedInspectionZone}
              </p>
              <div className="text-[10px] text-forest-300 pt-1 border-t border-forest-800">
                Correlated with micro-climate humidity accumulation
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
