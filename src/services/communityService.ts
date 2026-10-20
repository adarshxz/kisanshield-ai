import { CommunityAlert } from '../types';
import { INITIAL_COMMUNITY_ALERTS } from '../data/demoData';

const COMMUNITY_STORAGE_KEY = 'kisanshield_community_alerts_v1';

export const communityService = {
  getAlerts: (): CommunityAlert[] => {
    try {
      const stored = localStorage.getItem(COMMUNITY_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse community alerts', e);
    }
    localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_ALERTS));
    return INITIAL_COMMUNITY_ALERTS;
  },

  submitReport: (report: Omit<CommunityAlert, 'id' | 'reportedDate' | 'observationsCount' | 'verificationStatus'>): CommunityAlert => {
    const list = communityService.getAlerts();
    const newAlert: CommunityAlert = {
      ...report,
      id: `comm-${Date.now().toString(36)}`,
      reportedDate: new Date().toISOString().split('T')[0],
      observationsCount: 1,
      verificationStatus: 'reported',
    };
    list.unshift(newAlert);
    localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(list));
    return newAlert;
  },

  verifyAlert: (id: string, verifiedBy: string, status: 'expert_verified' | 'corrected' | 'dismissed'): void => {
    const list = communityService.getAlerts();
    const item = list.find(a => a.id === id);
    if (item) {
      item.verificationStatus = status;
      item.verifiedBy = verifiedBy;
      localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(list));
    }
  },

  resetAlerts: (): CommunityAlert[] => {
    localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_ALERTS));
    return INITIAL_COMMUNITY_ALERTS;
  }
};
