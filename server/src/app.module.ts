import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [ConfigModule.forRoot(), HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
