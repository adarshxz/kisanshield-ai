import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { profitService } from '../services/profitService';
import { ProfitScenario, ProfitResult } from '../types';
import { 
  TrendingUp, 
  IndianRupee, 
  RotateCcw, 
  Copy, 
  Save, 
  Scale, 
  Info, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ProfitComparisonChart } from '../components/charts/ProfitComparisonChart';

export const ProfitGuardPage: React.FC = () => {
  const { t, showToast } = useApp();
  const [scenarios, setScenarios] = useState<ProfitScenario[]>(() => profitService.getScenarios());
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || 'scen-expected');

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
  const activeResult: ProfitResult = profitService.calculate(activeScenario);

  const updateCostField = (field: keyof ProfitScenario['costs'], val: number) => {
    const updated: ProfitScenario = {
      ...activeScenario,
      costs: {
        ...activeScenario.costs,
        [field]: Number(val) || 0,
      }
    };
    profitService.saveScenario(updated);
    setScenarios(profitService.getScenarios());
  };

  const updateParameter = (field: keyof ProfitScenario, val: any) => {
    const updated: ProfitScenario = {
      ...activeScenario,
      [field]: val,
    };
    profitService.saveScenario(updated);
    setScenarios(profitService.getScenarios());
  };

  const handleDuplicate = () => {
    const cloned = profitService.duplicateScenario(activeScenario.id);
    if (cloned) {
      setScenarios(profitService.getScenarios());
      setActiveScenarioId(cloned.id);
      showToast({ type: 'success', title: 'Scenario Cloned', message: 'You can now modify the assumptions.' });
    }
  };

  const handleReset = () => {
    const fresh = profitService.resetScenarios();
    setScenarios(fresh);
    setActiveScenarioId(fresh[0].id);
    showToast({ type: 'info', title: 'Scenarios Reset', message: 'Restored baseline adverse, expected, and favorable presets.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-forest-700 dark:text-fresh" />
              <h2 className="text-xl font-black text-kisan-text dark:text-white">
                {t.profit.title}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Deterministic Model
              </span>
            </div>
            <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
              {t.profit.subtitle} Calculate break-even selling prices and test input cost sensitivity before committing capital.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDuplicate}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Duplicate
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Scenarios
            </Button>
          </div>
        </div>
      </div>

      <DisclaimerBanner 
        customText="ProfitGuard provides deterministic arithmetic scenario simulation. It does not predict or guarantee market prices, crop yields, or net financial returns. Actual outcomes depend on real market conditions, weather events, and post-harvest quality."
      />

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {scenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => setActiveScenarioId(scen.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border shrink-0 ${
              activeScenarioId === scen.id
                ? 'bg-forest-700 text-white border-forest-700 shadow-md'
                : 'bg-white dark:bg-forest-950 text-kisan-muted dark:text-gray-300 border-surface-border dark:border-forest-800 hover:border-forest-400'
            }`}
          >
            {scen.name}
          </button>
        ))}
      </div>

      {/* Main Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Parameters Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900">
              <h3 className="text-sm font-bold text-kisan-text dark:text-white">
                Economic Assumptions ({activeScenario.name})
              </h3>
              <span className="text-[11px] text-kisan-muted">All inputs editable</span>
            </div>

            {/* Farm Area & Yield */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-kisan-text dark:text-white">Field Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={activeScenario.fieldAreaAcres}
                  onChange={(e) => updateParameter('fieldAreaAcres', Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2.5 bg-white dark:bg-forest-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-kisan-text dark:text-white">Yield / Acre (Quintals)</label>
                <input
                  type="number"
                  step="0.5"
                  value={activeScenario.expectedYieldPerAcreQuintal}
                  onChange={(e) => updateParameter('expectedYieldPerAcreQuintal', Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2.5 bg-white dark:bg-forest-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-kisan-text dark:text-white">
                Expected Mandi Selling Price (₹ / Quintal)
              </label>
              <input
                type="number"
                step="50"
                value={activeScenario.expectedSellingPricePerQuintal}
                onChange={(e) => updateParameter('expectedSellingPricePerQuintal', Number(e.target.value))}
                className="w-full text-xs rounded-xl border border-surface-border dark:border-forest-800 p-2.5 bg-white dark:bg-forest-900"
              />
              <span className="text-[10px] text-kisan-muted mt-0.5 block">MSP Reference: ~₹4,892 / quintal for Soybean</span>
            </div>

            {/* Cost Breakdown Inputs */}
            <div className="pt-2 border-t border-surface-border dark:border-forest-900">
              <span className="text-xs font-bold uppercase tracking-wider text-kisan-muted dark:text-gray-400 block mb-3">
                Input & Operational Expenses (₹ Total for Plot)
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { key: 'seeds', label: 'Certified Seeds' },
                  { key: 'fertilizers', label: 'Fertilizers & Nutrients' },
                  { key: 'cropProtection', label: 'Crop Protection & Bio' },
                  { key: 'irrigation', label: 'Irrigation & Pumping' },
                  { key: 'labor', label: 'Farm Labor & Weeding' },
                  { key: 'machineryFuel', label: 'Tractor, Fuel & Harvest' },
                  { key: 'transport', label: 'Mandi Transport' },
                  { key: 'other', label: 'Other Miscellaneous' },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block font-medium mb-1 text-kisan-muted dark:text-gray-300 text-[11px] truncate">
                      {item.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-kisan-muted text-xs">₹</span>
                      <input
                        type="number"
                        step="100"
                        value={activeScenario.costs[item.key as keyof ProfitScenario['costs']]}
                        onChange={(e) => updateCostField(item.key as any, Number(e.target.value))}
                        className="w-full rounded-xl border border-surface-border dark:border-forest-800 py-1.5 pl-6 pr-2 text-xs bg-white dark:bg-forest-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Projected Financial Outcomes & Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-emerald-50/70 dark:bg-forest-900 border-emerald-200 dark:border-forest-800">
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold uppercase block">
                Gross Revenue
              </span>
              <div className="text-xl sm:text-2xl font-black text-forest-900 dark:text-white mt-1">
                ₹{activeResult.grossRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                {activeResult.totalYieldQuintal} Quintals total
              </span>
            </Card>

            <Card className="p-4 bg-amber-50/70 dark:bg-forest-900 border-amber-200 dark:border-forest-800">
              <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold uppercase block">
                Total Expenses
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-100 mt-1">
                ₹{activeResult.totalCost.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-amber-700 dark:text-amber-300">
                ₹{activeResult.costPerQuintal} / quintal
              </span>
            </Card>

            <Card className={`p-4 col-span-2 sm:col-span-1 border ${
              activeResult.netReturn >= 0 
                ? 'bg-forest-900 text-white border-forest-800' 
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}>
              <span className="text-[11px] font-bold uppercase block opacity-80">
                Estimated Net Margin
              </span>
              <div className={`text-xl sm:text-2xl font-black mt-1 ${activeResult.netReturn >= 0 ? 'text-fresh' : 'text-rose-600'}`}>
                ₹{activeResult.netReturn.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] opacity-80">
                ROI: {activeResult.returnOnInvestmentPercent}%
              </span>
            </Card>
          </div>

          {/* Break-Even Price Insight Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card flex items-start gap-3">
            <Scale className="w-5 h-5 text-forest-700 dark:text-fresh shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-kisan-text dark:text-white block">
                Break-Even Selling Price: ₹{activeResult.breakEvenSellingPrice.toLocaleString('en-IN')} / Quintal
              </span>
              <p className="text-kisan-muted dark:text-gray-300 mt-0.5 leading-relaxed">
                At an expected yield of {activeScenario.expectedYieldPerAcreQuintal} quintals/acre across {activeScenario.fieldAreaAcres} acres, any mandi price above ₹{activeResult.breakEvenSellingPrice} generates positive net operational return.
              </p>
            </div>
          </div>

          {/* Comparison Bar Chart Across Presets */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900 mb-4">
              <div>
                <h4 className="text-sm font-bold text-kisan-text dark:text-white">
                  Scenario Comparison: Adverse vs Expected vs Favorable
                </h4>
                <p className="text-xs text-kisan-muted dark:text-gray-400">
                  Comparing revenue, total expense, and net return across presets.
                </p>
              </div>
            </div>
            <ProfitComparisonChart scenarios={scenarios} />
          </Card>

        </div>

      </div>

    </div>
  );
};
