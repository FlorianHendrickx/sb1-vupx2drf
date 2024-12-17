import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Prospect, User, IcpDescription } from '../types';
import { mockProspects } from './mockData';

interface Store {
  user: User | null;
  prospects: Prospect[];
  currentProspect: Prospect | null;
  currentView: 'prospects' | 'inbox' | 'network';
  icpDescription: IcpDescription | null;
  activeFilter: { type: 'connector'; id: string; name: string } | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setProspects: (prospects: Prospect[]) => void;
  setCurrentProspect: (prospect: Prospect | null) => void;
  setCurrentView: (view: 'prospects' | 'inbox' | 'network') => void;
  setIcpDescription: (icp: IcpDescription | null) => void;
  setActiveFilter: (filter: { type: 'connector'; id: string; name: string } | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  nextProspect: () => void;
  clearCurrentProspect: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      prospects: mockProspects,
      currentProspect: null,
      currentView: 'prospects',
      icpDescription: null,
      activeFilter: null,
      theme: 'light',
      setUser: (user) => set({ user }),
      setProspects: (prospects) => set({ prospects }),
      setCurrentProspect: (prospect) => set({ currentProspect: prospect }),
      setCurrentView: (view) => set({ currentView: view }),
      setIcpDescription: (icp) => set({ icpDescription: icp }),
      setActiveFilter: (filter) => set({ activeFilter: filter }),
      setTheme: (theme) => set({ theme }),
      nextProspect: () => {
        const { prospects, currentProspect } = get();
        const currentIndex = prospects.findIndex(p => p.id === currentProspect?.id);
        const nextProspect = prospects[currentIndex + 1] || null;
        if (!nextProspect) {
          set({ currentProspect: null, currentView: 'prospects' });
        } else {
          set({ currentProspect: nextProspect });
        }
      },
      clearCurrentProspect: () => set({ currentProspect: null })
    }),
    {
      name: 'sniper-storage',
      partialize: (state) => ({ theme: state.theme })
    }
  )
);