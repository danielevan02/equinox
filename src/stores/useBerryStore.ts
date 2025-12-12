import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BerryTableState {
  page: number;
  pageSize: number;
  search: string;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

const initialState = {
  page: 1,
  pageSize: 10,
  search: '',
};

export const useBerryStore = create<BerryTableState>()(
  persist(
    (set) => ({
      ...initialState,
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: 1 }),
      setSearch: (search) => set({ search, page: 1 }),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'berry-storage',
    }
  )
);
