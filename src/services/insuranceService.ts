import { InsuranceIncident } from '../types';
import { INITIAL_INSURANCE_INCIDENT } from '../data/demoData';

const INSURANCE_STORAGE_KEY = 'kisanshield_insurance_incident_v1';

export const insuranceService = {
  getIncident: (): InsuranceIncident => {
    try {
      const stored = localStorage.getItem(INSURANCE_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read insurance incident', e);
    }
    localStorage.setItem(INSURANCE_STORAGE_KEY, JSON.stringify(INITIAL_INSURANCE_INCIDENT));
    return INITIAL_INSURANCE_INCIDENT;
  },

  updateChecklist: (key: keyof InsuranceIncident['checklistStatus'], value: boolean): InsuranceIncident => {
    const inc = insuranceService.getIncident();
    inc.checklistStatus[key] = value;
    localStorage.setItem(INSURANCE_STORAGE_KEY, JSON.stringify(inc));
    return inc;
  },

  addIncidentNote: (note: string): InsuranceIncident => {
    const inc = insuranceService.getIncident();
    inc.farmerNotes = `${inc.farmerNotes}\n[${new Date().toLocaleDateString('en-IN')}] ${note}`;
    localStorage.setItem(INSURANCE_STORAGE_KEY, JSON.stringify(inc));
    return inc;
  },

  resetIncident: (): InsuranceIncident => {
    localStorage.setItem(INSURANCE_STORAGE_KEY, JSON.stringify(INITIAL_INSURANCE_INCIDENT));
    return INITIAL_INSURANCE_INCIDENT;
  }
};
