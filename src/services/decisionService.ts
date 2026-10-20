import { DecisionRecord } from '../types';
import { INITIAL_DECISION_HISTORY } from '../data/demoData';

const DECISIONS_STORAGE_KEY = 'kisanshield_decisions_v1';

export const decisionService = {
  getDecisions: (): DecisionRecord[] => {
    try {
      const stored = localStorage.getItem(DECISIONS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read decision records', e);
    }
    localStorage.setItem(DECISIONS_STORAGE_KEY, JSON.stringify(INITIAL_DECISION_HISTORY));
    return INITIAL_DECISION_HISTORY;
  },

  getDecisionById: (id: string): DecisionRecord | undefined => {
    return decisionService.getDecisions().find(d => d.id === id);
  },

  updateFarmerResponse: (
    id: string, 
    response: { status: 'followed' | 'skipped' | 'modified'; actionTaken?: string; skipReason?: string; notes?: string }
  ): DecisionRecord | undefined => {
    const list = decisionService.getDecisions();
    const item = list.find(d => d.id === id);
    if (item) {
      item.farmerResponse = {
        ...response,
        updatedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };
      localStorage.setItem(DECISIONS_STORAGE_KEY, JSON.stringify(list));
    }
    return item;
  },

  recordObservedOutcome: (
    id: string, 
    outcome: { description: string; rating: 'positive' | 'neutral' | 'negative' }
  ): DecisionRecord | undefined => {
    const list = decisionService.getDecisions();
    const item = list.find(d => d.id === id);
    if (item) {
      item.observedOutcome = {
        recordedDate: new Date().toISOString().split('T')[0],
        ...outcome,
      };
      localStorage.setItem(DECISIONS_STORAGE_KEY, JSON.stringify(list));
    }
    return item;
  },

  resetDecisions: (): DecisionRecord[] => {
    localStorage.setItem(DECISIONS_STORAGE_KEY, JSON.stringify(INITIAL_DECISION_HISTORY));
    return INITIAL_DECISION_HISTORY;
  }
};
