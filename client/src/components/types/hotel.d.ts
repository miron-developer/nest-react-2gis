interface AvailableDates {
  start: string;
  end: string;
}

interface Hotel {
  address_name: string;
  building_name: string;
  full_name: string;
  id: string;
  name: string;
  purpose_name: string;
  type: string;
  available_date_start?: string;
  available_date_end?: string;
}

interface ResultResponse {
  items: Hotel[];
  total: number;
}

interface SearchResponse {
  meta: MetaResponse;
  result: ResultResponse;
}

interface SearchMetaError {
  message: string;
  type: string;
}

interface MetaResponse {
  api_version: string;
  code: number;
  issue_date: string;
  error: SearchMetaError;
}
