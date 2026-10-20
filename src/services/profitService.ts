import { ProfitScenario, ProfitResult } from '../types';
import { INITIAL_PROFIT_SCENARIOS } from '../data/demoData';

const PROFIT_STORAGE_KEY = 'kisanshield_profit_scenarios_v1';

export const profitService = {
  getScenarios: (): ProfitScenario[] => {
    try {
      const stored = localStorage.getItem(PROFIT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read profit scenarios', e);
    }
    localStorage.setItem(PROFIT_STORAGE_KEY, JSON.stringify(INITIAL_PROFIT_SCENARIOS));
    return INITIAL_PROFIT_SCENARIOS;
  },

  calculate: (scenario: ProfitScenario): ProfitResult => {
    // 1. Total yield in quintals across entire field area
    const totalYieldQuintal = Number((scenario.fieldAreaAcres * scenario.expectedYieldPerAcreQuintal).toFixed(2));

    // 2. Gross revenue = total yield * selling price per quintal
    const grossRevenue = Math.round(totalYieldQuintal * scenario.expectedSellingPricePerQuintal);

    // 3. Total cost = sum of all cost categories
    const {
      seeds = 0,
      fertilizers = 0,
      cropProtection = 0,
      irrigation = 0,
      labor = 0,
      machineryFuel = 0,
      transport = 0,
      other = 0,
    } = scenario.costs;

    const totalCost = Math.round(
      seeds + fertilizers + cropProtection + irrigation + labor + machineryFuel + transport + other
    );

    // 4. Net return = Gross Revenue - Total Cost
    const netReturn = grossRevenue - totalCost;

    // 5. Cost per quintal = Total Cost / Total Yield (or 0 if zero yield)
    const costPerQuintal = totalYieldQuintal > 0 ? Math.round(totalCost / totalYieldQuintal) : 0;

    // 6. Break-even selling price = Total Cost / Total Yield
    const breakEvenSellingPrice = totalYieldQuintal > 0 ? Math.round(totalCost / totalYieldQuintal) : 0;

    // 7. ROI % = (Net Return / Total Cost) * 100
    const returnOnInvestmentPercent = totalCost > 0 ? Number(((netReturn / totalCost) * 100).toFixed(1)) : 0;

    return {
      totalYieldQuintal,
      grossRevenue,
      totalCost,
      netReturn,
      costPerQuintal,
      breakEvenSellingPrice,
      returnOnInvestmentPercent,
    };
  },

  saveScenario: (scenario: ProfitScenario): void => {
    const list = profitService.getScenarios();
    const index = list.findIndex(s => s.id === scenario.id);
    if (index >= 0) {
      list[index] = scenario;
    } else {
      list.push(scenario);
    }
    localStorage.setItem(PROFIT_STORAGE_KEY, JSON.stringify(list));
  },

  duplicateScenario: (id: string): ProfitScenario | undefined => {
    const list = profitService.getScenarios();
    const existing = list.find(s => s.id === id);
    if (!existing) return undefined;

    const clone: ProfitScenario = {
      ...existing,
      id: `scen-${Date.now().toString(36)}`,
      name: `${existing.name} (Copy)`,
      type: 'custom',
    };
    list.push(clone);
    localStorage.setItem(PROFIT_STORAGE_KEY, JSON.stringify(list));
    return clone;
  },

  resetScenarios: (): ProfitScenario[] => {
    localStorage.setItem(PROFIT_STORAGE_KEY, JSON.stringify(INITIAL_PROFIT_SCENARIOS));
    return INITIAL_PROFIT_SCENARIOS;
  }
};
