type ColumnTypes = 'name' | 'description' | 'location';

interface SearchParams {
  query: string;
  page?: number;
  column?: ColumnTypes;
  startDate?: string;
  endDate?: string;
}
