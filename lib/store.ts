import { create } from 'zustand';
import type { MockData, Alert } from './types';

interface AppState {
  data: MockData | null;
  filters: {
    dateRange: [Date, Date];
    storeIds: string[];
    categories: string[];
    regions: string[];
  };
  alerts: Alert[];
  loading: boolean;
  
  // Actions
  setData: (data: MockData) => void;
  setFilters: (filters: Partial<AppState['filters']>) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (id: string) => void;
  assignAlert: (id: string, assignee: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  data: null,
  filters: {
    dateRange: [new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()],
    storeIds: [],
    categories: [],
    regions: [],
  },
  alerts: [],
  loading: true,
  
  setData: (data) => set({ data, loading: false }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts]
  })),
  
  acknowledgeAlert: (id) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a)
  })),
  
  assignAlert: (id, assignee) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, assignedTo: assignee } : a)
  })),
  
  setLoading: (loading) => set({ loading }),
}));
