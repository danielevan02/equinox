export interface TableState {
  page: number;
  pageSize: number;
  search: string;
  sortBy: 'name' | null;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
