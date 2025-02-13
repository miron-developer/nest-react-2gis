import { Controller, Get, Query } from '@nestjs/common';

import { TwoGisService } from './2gis.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly twoGisService: TwoGisService) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('page') page?: number,
    @Query('column') column?: ColumnTypes,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<any> {
    return this.twoGisService.searchHotels({
      query,
      page,
      column,
      startDate,
      endDate,
    });
  }
}
