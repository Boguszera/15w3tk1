import { create } from 'zustand';
import type { CarConfiguration } from '../types/CarConfiguration';
import { defaultConfiguration } from '../types/CarConfiguration';

interface ConfigStore {
  config: CarConfiguration;
  updateConfig: (updates: Partial<CarConfiguration>) => void;
  resetConfig: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const STORAGE_KEY = 'car-configurator-config';

export const useConfigStore = create<ConfigStore>((set, get) => ({
  config: defaultConfiguration,
  
  updateConfig: (updates) => {
    set((state) => ({
      config: { ...state.config, ...updates },
    }));
    // Auto-save to localStorage
    setTimeout(() => get().saveToLocalStorage(), 100);
  },
  
  resetConfig: () => {
    set({ config: defaultConfiguration });
    get().saveToLocalStorage();
  },
  
  saveToLocalStorage: () => {
    const { config } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },
  
  loadFromLocalStorage: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const config = JSON.parse(stored);
        set({ config: { ...defaultConfiguration, ...config } });
      } catch (e) {
        console.error('Failed to load configuration from localStorage', e);
      }
    }
  },
}));
