import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

import { getTodayDate } from 'src/utils/date';

// https://catalog.api.2gis.ru/3.0/items?page=1&page_size=10&rubric_id=269&fields=items.description&key=bba0681c-39f6-4fe2-a4ff-525012a7c657&city_id=9570771978420226&type=branch
interface TwoGisParams {
  q?: string;
  key: string;
  rubric_id: number;
  fields: string[];
  city_id: string;
  page: number;
  page_size: 10;
  type: 'branch';

  // 2gis doesnt have/use this fields, just adding to show, that we can operate w/ it
  column?: ColumnTypes;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class TwoGisService {
  private readonly apiUrl = 'https://catalog.api.2gis.com/3.0/items';
  private readonly apiKey = process.env.TWOGIS_API_KEY || '';

  async searchHotels({
    query,
    column = 'name',
    page = 1,
    startDate = getTodayDate(),
    endDate = getTodayDate(),
  }: SearchParams): Promise<any> {
    try {
      const params: TwoGisParams = {
        startDate,
        endDate,
        column,
        page,
        page_size: 10,
        key: this.apiKey,
        rubric_id: 269,
        fields: ['items.description'],
        city_id: '9570771978420226',
        type: 'branch',
      };
      if (query) params.q = query;

      const response = await axios.get(this.apiUrl, { params });
      return response.data;
    } catch {
      throw new HttpException(
        'Error fetching data from 2GIS API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
