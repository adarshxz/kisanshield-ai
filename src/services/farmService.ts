import { Farm, Field } from '../types';
import { INITIAL_FARMS } from '../data/demoData';

const FARMS_STORAGE_KEY = 'kisanshield_farms_v1';

export const farmService = {
  getFarms: (): Farm[] => {
    try {
      const stored = localStorage.getItem(FARMS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read farms from localStorage', e);
    }
    // Default initial seed
    localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(INITIAL_FARMS));
    return INITIAL_FARMS;
  },

  getFarm: (id: string): Farm | undefined => {
    const farms = farmService.getFarms();
    return farms.find(f => f.id === id) || farms[0];
  },

  saveFarm: (farm: Farm): void => {
    const farms = farmService.getFarms();
    const index = farms.findIndex(f => f.id === farm.id);
    if (index >= 0) {
      farms[index] = farm;
    } else {
      farms.push(farm);
    }
    localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(farms));
  },

  addField: (farmId: string, field: Omit<Field, 'id' | 'farmId'>): Field => {
    const farms = farmService.getFarms();
    const farm = farms.find(f => f.id === farmId);
    if (!farm) throw new Error('Farm not found');

    const newField: Field = {
      ...field,
      id: `field-${Date.now().toString(36)}`,
      farmId: farm.id,
    };

    farm.fields.push(newField);
    farm.totalAreaAcres = Number((farm.totalAreaAcres + field.areaAcres).toFixed(1));
    farmService.saveFarm(farm);
    return newField;
  },

  resetToDefault: (): Farm[] => {
    localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(INITIAL_FARMS));
    return INITIAL_FARMS;
  }
};
