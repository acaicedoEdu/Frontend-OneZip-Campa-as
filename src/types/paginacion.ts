export interface Paginacion {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

export interface RequestProps {
  pagination: Paginacion;
  filter?: string;
}
