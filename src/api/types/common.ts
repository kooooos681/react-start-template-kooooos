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
  pageSize?: number;
  pageNumber?: number;
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