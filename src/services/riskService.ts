import { RiskItem, RiskCategory, RiskLevel } from '../types';
import { INITIAL_RISKS } from '../data/demoData';

const RISKS_STORAGE_KEY = 'kisanshield_risks_v1';

export const riskService = {
  getRisks: (fieldId?: string): RiskItem[] => {
    try {
      const stored = localStorage.getItem(RISKS_STORAGE_KEY);
      const allRisks: RiskItem[] = stored ? JSON.parse(stored) : INITIAL_RISKS;
      if (fieldId && fieldId !== 'all') {
        return allRisks.filter(r => r.fieldId === fieldId);
      }
      return allRisks;
    } catch {
      return INITIAL_RISKS;
    }
  },

  getRiskById: (id: string): RiskItem | undefined => {
    const risks = riskService.getRisks();
    return risks.find(r => r.id === id);
  },

  escalateToExpert: (riskId: string): void => {
    // In demo mode, records escalation
    console.log(`Risk ${riskId} escalated to agricultural expert desk`);
  },

  resetRisks: (): void => {
    localStorage.setItem(RISKS_STORAGE_KEY, JSON.stringify(INITIAL_RISKS));
  }
};
