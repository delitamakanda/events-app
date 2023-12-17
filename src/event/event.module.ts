import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  imports: [PrismaModule],
  providers: [EventService],
})
export class EventModule {}
