import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TableState } from '@/types/table';

interface TableStore extends TableState {
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: 'name' | null) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

const initialState: TableState = {
  page: 1,
  pageSize: 10,
  search: '',
  sortBy: 'name',
  sortOrder: 'asc',
};

export const useTableStore = create<TableStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: 1 }),
      setSearch: (search) => set({ search, page: 1 }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'table-storage',
    }
  )
);
