import { SoilReport } from '../types';
import { INITIAL_SOIL_REPORTS } from '../data/demoData';

const SOIL_STORAGE_KEY = 'kisanshield_soil_reports_v1';

export const soilService = {
  getSoilReports: (farmId?: string): SoilReport[] => {
    try {
      const stored = localStorage.getItem(SOIL_STORAGE_KEY);
      const list: SoilReport[] = stored ? JSON.parse(stored) : INITIAL_SOIL_REPORTS;
      if (farmId) return list.filter(r => r.farmId === farmId);
      return list;
    } catch {
      return INITIAL_SOIL_REPORTS;
    }
  },

  addReport: (report: SoilReport): void => {
    const list = soilService.getSoilReports();
    list.unshift(report);
    localStorage.setItem(SOIL_STORAGE_KEY, JSON.stringify(list));
  },

  resetSoilReports: (): SoilReport[] => {
    localStorage.setItem(SOIL_STORAGE_KEY, JSON.stringify(INITIAL_SOIL_REPORTS));
    return INITIAL_SOIL_REPORTS;
  }
};
