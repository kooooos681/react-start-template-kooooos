export interface Pagination {
  pageSize: number;
  pageNumber: number;
  total: number;
}

export interface Sorting {
  type: 'ASC' | 'DESC';
  field: string;
}

export interface BaseFilters {
  ids?: string[];
  name?: string;
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  sorting?: Sorting;
}

export interface BaseResponse<T> {
  data: T[];
  pagination: Pagination;
} 