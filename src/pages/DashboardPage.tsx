import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Radar, 
  Stethoscope, 
  Droplets, 
  CalendarCheck, 
  TrendingUp, 
  Mic, 
  CloudRain, 
  Wind, 
  Thermometer, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sprout,
  Activity
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { DataFreshnessTag, DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { weatherService } from '../services/weatherService';
import { riskService } from '../services/riskService';
import { taskService } from '../services/taskService';
import { WeatherSummary, RiskItem, FarmTask } from '../types';
import { WeatherForecastChart } from '../components/charts/WeatherForecastChart';

export const DashboardPage: React.FC = () => {
  const { selectedFarm, selectedField, setSelectedFieldId, t, showToast } = useApp();
  const navigate = useNavigate();

  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [risks, setRisks] = useState<RiskItem[]>([]);
  const [tasks, setTasks] = useState<FarmTask[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data dynamically
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const w = await weatherService.getCurrentWeather();
      setWeather(w);
      const r = riskService.getRisks();
      setRisks(r);
      const tks = taskService.getTasks();
      setTasks(tks);
      setLoading(false);
    };
    loadDashboardData();
  }, [selectedFarm.id]);

  const handleToggleTask = (taskId: string) => {
    const updated = taskService.toggleComplete(taskId);
    if (updated) {
      setTasks(taskService.getTasks());
      showToast({
        type: updated.isCompleted ? 'success' : 'info',
        title: updated.isCompleted ? 'Task Marked Completed' : 'Task Reopened',
        message: `${updated.title} updated on field timeline.`
      });
    }
  };

  const highestRisk = risks.find(r => r.level === 'high' || r.level === 'elevated') || risks[0];
  const pendingTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Greeting & Farm Meta */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-fresh/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-fresh/20 text-fresh text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Predictive Decision Support Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.dashboard.welcome}, {selectedFarm.ownerName}
            </h2>
            <p className="text-forest-200 text-xs sm:text-sm mt-1 max-w-xl">
              Monitoring {selectedFarm.name} · {selectedFarm.village}, {selectedFarm.district} ({selectedFarm.totalAreaAcres} Acres total)
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-forest-300 block">Fields</span>
              <span className="text-lg font-black text-white">{selectedFarm.fields.length}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-forest-300 block">Top Threat</span>
              <span className="text-sm font-black text-amber-300 truncate max-w-[100px] block">
                {highestRisk ? highestRisk.level.toUpperCase() : 'LOW'}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-forest-300 block">Pending Tasks</span>
              <span className="text-lg font-black text-fresh">{pendingTasks.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Banner */}
      <DisclaimerBanner variant="compact" />

      {/* 2. Quick Decision Actions Shortcuts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-kisan-muted dark:text-gray-400">
            {t.dashboard.quickActions}
          </h3>
          <span className="text-[11px] text-kisan-muted">Instant Access</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: t.dashboard.actionAnalyzePhoto, icon: Stethoscope, to: '/app/crop-doctor', color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
            { label: t.dashboard.actionCheckRisks, icon: Radar, to: '/app/risk-radar', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' },
            { label: t.dashboard.actionCreateTask, icon: CalendarCheck, to: '/app/action-planner', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
            { label: t.dashboard.actionCalculateCosts, icon: TrendingUp, to: '/app/profitguard', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
            { label: 'Smart Irrigation', icon: Droplets, to: '/app/irrigation', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40' },
            { label: t.dashboard.actionAskAssistant, icon: Mic, to: '/app/assistant', color: 'text-forest-700 bg-fresh/10 dark:text-fresh' },
          ].map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(act.to)}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card hover:shadow-elevated hover:border-forest-400 transition-all text-center group"
              >
                <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-kisan-text dark:text-white leading-tight">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Weather & Micro-climate Section */}
      {weather && (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-border dark:border-forest-900 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-kisan-text dark:text-white">
                  {t.dashboard.weatherTitle}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Simulated Agromet Station
                </span>
              </div>
              <p className="text-xs text-kisan-muted dark:text-gray-400 mt-0.5">
                {weather.stationName} · {weather.lastUpdated}
              </p>
            </div>
            <DataFreshnessTag timestamp="Updated 08:30 AM IST" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
            {/* Current Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-surface-warm dark:bg-forest-900/60 border border-surface-border dark:border-forest-800">
                <div className="flex items-center justify-between text-kisan-muted dark:text-gray-400 mb-1">
                  <span className="text-xs">Temperature</span>
                  <Thermometer className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-black text-kisan-text dark:text-white">
                  {weather.currentTemp}°C
                </div>
                <span className="text-[11px] text-kisan-muted">Feels like {weather.feelsLike}°C</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-warm dark:bg-forest-900/60 border border-surface-border dark:border-forest-800">
                <div className="flex items-center justify-between text-kisan-muted dark:text-gray-400 mb-1">
                  <span className="text-xs">Canopy Humidity</span>
                  <Droplets className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                  {weather.humidity}%
                </div>
                <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">Elevates Fungal Risk</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-warm dark:bg-forest-900/60 border border-surface-border dark:border-forest-800">
                <div className="flex items-center justify-between text-kisan-muted dark:text-gray-400 mb-1">
                  <span className="text-xs">Past 24h Rain</span>
                  <CloudRain className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-black text-kisan-text dark:text-white">
                  {weather.rainfallPast24hMm} <span className="text-xs font-normal">mm</span>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Measured Local</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-warm dark:bg-forest-900/60 border border-surface-border dark:border-forest-800">
                <div className="flex items-center justify-between text-kisan-muted dark:text-gray-400 mb-1">
                  <span className="text-xs">Forecast 48h</span>
                  <CloudRain className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                  {weather.rainfallForecast48hMm} <span className="text-xs font-normal">mm</span>
                </div>
                <span className="text-[11px] text-kisan-muted">Heavy showers exp.</span>
              </div>
            </div>

            {/* 5-Day Trend Chart */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-kisan-text dark:text-white block mb-2">
                5-Day Temperature & Rain Forecast Projection
              </span>
              <WeatherForecastChart data={weather.forecast} />
            </div>
          </div>
        </Card>
      )}

      {/* 4. Crop Risk Radar Highlights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-kisan-text dark:text-white">
              {t.dashboard.cropRiskSummary}
            </h3>
            <p className="text-xs text-kisan-muted dark:text-gray-400">
              Correlated micro-weather, sensor wetness hours, and crop phenology
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate('/app/risk-radar')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Open Full Radar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {risks.slice(0, 3).map((risk) => (
            <Card key={risk.id} className="p-5 flex flex-col justify-between hoverable">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant={risk.level as any} dot>
                    {risk.categoryLabel}
                  </Badge>
                  <span className="text-[11px] font-bold text-kisan-muted dark:text-gray-400">
                    {risk.crop}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-kisan-text dark:text-white leading-snug">
                  {risk.title}
                </h4>

                <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                  {risk.headline}
                </p>

                {/* Evidence snippet */}
                <div className="mt-3 pt-3 border-t border-surface-border dark:border-forest-900 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-kisan-muted dark:text-gray-400 tracking-wider">
                    Ground Evidence:
                  </span>
                  {risk.evidence.slice(0, 2).map((ev, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <span className="text-kisan-text dark:text-gray-200">{ev.label}:</span>
                      <span className="font-semibold text-forest-700 dark:text-fresh">{ev.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Recommendation */}
              <div className="mt-4 pt-3 border-t border-surface-border dark:border-forest-900">
                <div className="p-2.5 rounded-xl bg-forest-50 dark:bg-forest-900/60 border border-forest-100 dark:border-forest-800 text-xs">
                  <span className="font-bold text-forest-900 dark:text-fresh block mb-0.5">
                    Recommended Action:
                  </span>
                  <p className="text-[11px] text-forest-800 dark:text-gray-300 line-clamp-2">
                    {risk.recommendedNextAction}
                  </p>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-kisan-muted">Field: {risk.fieldName}</span>
                  <button
                    onClick={() => navigate('/app/risk-radar')}
                    className="text-xs font-bold text-forest-700 dark:text-fresh hover:underline inline-flex items-center gap-1"
                  >
                    Examine Risk <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Today's Prioritized Tasks & Field Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Action Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-kisan-text dark:text-white">
                {t.dashboard.actionsToday}
              </h3>
              <p className="text-xs text-kisan-muted dark:text-gray-400">
                Prioritized farm operations adjusted to weather and risk triggers
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/app/action-planner')}
              rightIcon={<CalendarCheck className="w-4 h-4" />}
            >
              Action Planner
            </Button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card transition-all flex items-start gap-3.5 ${
                  task.isCompleted ? 'opacity-65 bg-surface-warm dark:bg-forest-950/40' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task.id)}
                  className="mt-1 w-4 h-4 text-forest-700 rounded focus:ring-forest-700 cursor-pointer"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-xs sm:text-sm font-bold text-kisan-text dark:text-white ${
                      task.isCompleted ? 'line-through text-kisan-muted dark:text-gray-400' : ''
                    }`}>
                      {task.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      task.priority === 'high' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40' 
                        : 'bg-surface-warm text-kisan-muted border border-surface-border dark:bg-forest-900'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-xs text-kisan-muted dark:text-gray-300 mt-1 leading-relaxed">
                    {task.description}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-kisan-muted dark:text-gray-400">
                    <span className="font-semibold text-forest-700 dark:text-fresh">
                      {task.fieldName} ({task.crop})
                    </span>
                    <span>·</span>
                    <span>Due: {task.dueDate}</span>
                    {task.estimatedMinutes && (
                      <>
                        <span>·</span>
                        <span>{task.estimatedMinutes} mins</span>
                      </>
                    )}
                  </div>

                  {task.reason && (
                    <div className="mt-2 p-2 rounded-lg bg-surface-warm dark:bg-forest-900/60 text-[11px] text-kisan-muted dark:text-gray-300">
                      <strong>Why:</strong> {task.reason}
                    </div>
                  )}

                  {task.outcomeNotes && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[11px] text-emerald-800 dark:text-emerald-200 border border-emerald-200">
                      <strong>Outcome Recorded:</strong> {task.outcomeNotes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fields & Crop Phenology Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-kisan-text dark:text-white">
              {t.dashboard.cropHealthStatus}
            </h3>
            <span className="text-xs text-kisan-muted">{selectedFarm.fields.length} Registered Plots</span>
          </div>

          <div className="space-y-3">
            {selectedFarm.fields.map((field) => (
              <div
                key={field.id}
                onClick={() => setSelectedFieldId(field.id)}
                className={`p-4 rounded-2xl bg-white dark:bg-forest-950 border transition-all cursor-pointer ${
                  field.id === selectedField?.id
                    ? 'border-forest-700 dark:border-fresh ring-1 ring-forest-700/20 shadow-card'
                    : 'border-surface-border dark:border-forest-900 hover:border-forest-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-kisan-text dark:text-white">
                      {field.name}
                    </h4>
                    <p className="text-xs text-kisan-muted dark:text-gray-400">
                      {field.currentCrop} {field.variety && `(${field.variety})`} · {field.areaAcres} Acres
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    field.moistureStatus === 'Deficit'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {field.moistureStatus} Moisture
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-surface-border dark:border-forest-900 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-kisan-muted dark:text-gray-400 block text-[10px]">Growth Stage</span>
                    <span className="font-semibold text-kisan-text dark:text-white">{field.growthStage}</span>
                  </div>
                  <div>
                    <span className="text-kisan-muted dark:text-gray-400 block text-[10px]">Irrigation & Soil</span>
                    <span className="font-semibold text-kisan-text dark:text-white">{field.irrigationMethod}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-forest-900 text-white text-xs space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-fresh" />
              <span className="font-bold">Explainable AI Audit Active</span>
            </div>
            <p className="text-forest-200 text-[11px] leading-relaxed">
              Every weather alert, risk assessment, and recommended action is logged in your decision audit trail.
            </p>
            <button
              onClick={() => navigate('/app/decision-history')}
              className="text-fresh text-xs font-bold hover:underline inline-flex items-center gap-1"
            >
              Inspect Decision Audit Trail <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
