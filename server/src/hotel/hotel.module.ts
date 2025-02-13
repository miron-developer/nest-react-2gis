import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { TwoGisService } from './2gis.service';

@Module({
  controllers: [HotelController],
  providers: [TwoGisService],
})
export class HotelModule {}
