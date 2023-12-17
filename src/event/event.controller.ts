import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EventService } from './event.service';
import { EventDto } from './dto';

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}
  @Get()
  getEvents() {
    return this.eventService.getEvents();
  }

  @Get('eventID')
  getEventByID(eventId: number) {
    console.log(eventId);
  }

  @Patch()
  updateEvent() {}

  @Post()
  createEvent(dto: EventDto) {
    console.log(dto);
  }

  @Delete()
  deleteEvent() {}
}
