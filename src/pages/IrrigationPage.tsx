import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Droplets, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Calendar, 
  ArrowRight,
  TrendingDown,
  Layers,
  Thermometer
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { WaterBalanceChart } from '../components/charts/VegetationTrendChart';

export const IrrigationPage: React.FC = () => {
  const { selectedFarm, selectedField, setSelectedFieldId, showToast } = useApp();

  const [lastIrrigationDaysAgo, setLastIrrigationDaysAgo] = useState(11);
  const [scheduleMode, setScheduleMode] = useState<'standard' | 'weather_adaptive'>('weather_adaptive');

  // Soil-water calculations based on field
  const isFieldB = selectedField?.id === 'field-b';
  const soilMoisturePercent = isFieldB ? 18 : 64; // Deficit in Field B, optimal in Field A
  const rainfallForecast48h = 34.0; // mm

  const handleSimulateSchedule = () => {
    showToast({
      type: 'info',
      title: 'Schedule Updated',
      message: 'Adaptive schedule accounts for 34mm forecast rainfall across next 48 hours.'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              Smart Irrigation & Soil-Water Advisor
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              HydroCrop Balance
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
            Root zone water-balance estimation integrating soil moisture retention, crop evapotranspiration (ETc), and upcoming precipitation.
          </p>
        </div>

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

      <DisclaimerBanner 
        customText="Irrigation quantities are estimated through soil-water balance modeling. Real root zone absorption varies with soil compaction, crusting, and hardpan depth. Verify with a soil moisture probe or physical hand-feel test before pumping."
      />

      {/* Moisture Status Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-xs text-kisan-muted font-medium">Root Zone Moisture</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-black ${soilMoisturePercent < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {soilMoisturePercent}%
            </span>
            <span className="text-xs text-kisan-muted">Available Water Capacity</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <DataSourceBadge type="model_prediction" sourceName="HydroCrop Estimator" showIcon={false} />
          </div>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-kisan-muted font-medium">Past 24h Local Rainfall</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-blue-600">18.4</span>
            <span className="text-xs text-kisan-muted">mm measured</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <DataSourceBadge type="measured" sourceName="Field Node A1" showIcon={false} />
          </div>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-kisan-muted font-medium">48h Rain Forecast</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-amber-600">34.0</span>
            <span className="text-xs text-kisan-muted">mm expected</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <DataSourceBadge type="trusted_retrieval" sourceName="IMD Sehore Grid" showIcon={false} />
          </div>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-kisan-muted font-medium">Watering Decision</span>
          <div className="text-sm font-black text-forest-900 dark:text-white mt-1">
            {soilMoisturePercent < 30 ? 'Plan Watering Post-Rain' : 'Hold / Delay Irrigation'}
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-1">
            Heavy rain makes watering unnecessary
          </span>
        </Card>
      </div>

      {/* Main Grid: Soil-Water Balance Chart & Advisory Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Water Balance Timeline Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900 mb-4">
              <div>
                <h3 className="text-sm font-bold text-kisan-text dark:text-white">
                  Soil-Water Balance Simulation (Root Zone Depletion)
                </h3>
                <p className="text-xs text-kisan-muted dark:text-gray-400">
                  Tracking water additions (rainfall) vs daily crop evapotranspiration demand (ETc)
                </p>
              </div>
            </div>
            <WaterBalanceChart />
          </Card>

          {/* Schedule Comparison Box */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-kisan-text dark:text-white mb-3">
              Schedule Comparison: Fixed Interval vs Weather-Adaptive
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-surface-border bg-surface-warm/60">
                <span className="font-bold text-kisan-muted block mb-1">Fixed Traditional Schedule</span>
                <p className="text-kisan-text font-semibold">Irrigate Every 10 Days</p>
                <p className="text-[11px] text-kisan-muted mt-1">
                  Would have pumped 45mm today, leading to immediate waterlogging and runoff when tomorrow's 22.5mm rain lands.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-forest-700 bg-forest-50/70 text-forest-900">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-forest-800">Adaptive Smart Schedule</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-fresh/30 text-forest-950">Active</span>
                </div>
                <p className="font-bold text-forest-950">Postpone until Thursday</p>
                <p className="text-[11px] text-forest-800 mt-1">
                  Takes credit for 34mm precipitation, avoiding electricity cost and protecting root aeration.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Field Water Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-kisan-text dark:text-white pb-2 border-b border-surface-border dark:border-forest-900">
              Field Agronomic Parameters ({selectedField?.name})
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                <span className="text-kisan-muted">Monitored Crop:</span>
                <span className="font-bold text-kisan-text dark:text-white">{selectedField?.currentCrop}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                <span className="text-kisan-muted">Growth Stage:</span>
                <span className="font-medium text-kisan-text dark:text-white">{selectedField?.growthStage}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                <span className="text-kisan-muted">Soil Profile:</span>
                <span className="font-medium text-kisan-text dark:text-white">{selectedField?.soilType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                <span className="text-kisan-muted">Irrigation Method:</span>
                <span className="font-medium text-kisan-text dark:text-white">{selectedField?.irrigationMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                <span className="text-kisan-muted">Effective Root Depth:</span>
                <span className="font-medium text-kisan-text dark:text-white">45 cm (Vertisol Topsoil)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-kisan-muted">Daily Crop Water Demand:</span>
                <span className="font-bold text-forest-700 dark:text-fresh">4.2 mm / day</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-forest-900 text-white text-xs space-y-1.5">
              <span className="font-bold text-fresh block">Actionable Agronomic Advisory:</span>
              <p className="text-[11px] text-forest-100 leading-relaxed">
                Field A (Soybean) has optimal moisture. Maintain drainage bunds open. For Field B (Wheat early stage), inspect moisture after tomorrow's rain. If precipitation falls below 10mm, schedule light furrow watering.
              </p>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
