import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Event {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    continent: string;
  };
  dates: {
    start: string;
    end: string;
    reg_open: string;
  };
  status: 'confirmed' | 'canceled' | 'tentative';
  tags: string[];
  attendance: number;
  description: string;
  bannerUrl: string;
  isPending?: boolean;
}

interface AppState {
  events: Event[];
  watchlist: string[];
  filters: {
    search: string;
    continents: string[];
    hidePast: boolean;
    regOpenOnly: boolean;
  };
  setSearch: (s: string) => void;
  toggleWatchlist: (id: string) => void;
  setFilters: (f: Partial<AppState['filters']>) => void;
  addEvent: (e: Event) => void;
  approveEvent: (id: string) => void;
}

const MOCK_DATA: Event[] = [
  {
    id: '1',
    name: 'Eurofurence 28',
    location: { city: 'Hamburg', country: 'Germany', continent: 'Europe' },
    dates: { start: '2024-09-18', end: '2024-09-22', reg_open: '2024-01-01' },
    status: 'confirmed',
    tags: ['Massive', 'Charity', 'Hotel Block Open'],
    attendance: 3500,
    description: 'One of the largest furry conventions in the world, held annually in Germany.',
    bannerUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    name: 'Anthrocon 2024',
    location: { city: 'Pittsburgh', country: 'USA', continent: 'North America' },
    dates: { start: '2024-07-04', end: '2024-07-07', reg_open: '2024-02-01' },
    status: 'confirmed',
    tags: ['18+', 'Downtown Takeover'],
    attendance: 13000,
    description: 'The world\'s largest furry convention, taking over the streets of Pittsburgh.',
    bannerUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    name: 'Confuzzled 2024',
    location: { city: 'Birmingham', country: 'UK', continent: 'Europe' },
    dates: { start: '2024-05-24', end: '2024-05-28', reg_open: '2023-11-01' },
    status: 'confirmed',
    tags: ['Sold Out', 'Charity'],
    attendance: 2500,
    description: 'The UK\'s largest furry convention, known for its high-quality production.',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=1000'
  }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      events: MOCK_DATA,
      watchlist: [],
      filters: {
        search: '',
        continents: [],
        hidePast: false,
        regOpenOnly: false,
      },
      setSearch: (search) => set((state) => ({ filters: { ...state.filters, search } })),
      toggleWatchlist: (id) => set((state) => ({
        watchlist: state.watchlist.includes(id) 
          ? state.watchlist.filter(i => i !== id) 
          : [...state.watchlist, id]
      })),
      setFilters: (f) => set((state) => ({ filters: { ...state.filters, ...f } })),
      addEvent: (e) => set((state) => ({ events: [...state.events, { ...e, isPending: true }] })),
      approveEvent: (id) => set((state) => ({
        events: state.events.map(e => e.id === id ? { ...e, isPending: false } : e)
      })),
    }),
    { name: 'furcon-storage' }
  )
);