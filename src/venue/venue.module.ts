import { Module } from '@nestjs/common';
import { VenueController } from './venue.controller';

@Module({
  controllers: [VenueController],
})
export class VenueModule {}
