import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { GetUser } from './../auth/decorator';

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}
  @Get()
  getEvents(@GetUser('userID') userID: number) {
    return this.eventService.getEvents(userID);
  }

  @Get(':eventID')
  getEventById(
    @GetUser('userID') userID: number,
    @Param('eventID', ParseIntPipe) eventID: number,
  ) {
    return this.eventService.getEventById(userID, eventID);
  }

  @Patch(':eventID')
  updateEventById(
    @GetUser('userID') userID: number,
    @Param('eventID', ParseIntPipe) eventID: number,
    @Body() dto: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(userID, eventID, dto);
  }

  @Post()
  createEventById(
    @GetUser('userID') userID: number,
    @Body() dto: CreateEventDto,
  ) {
    return this.eventService.createEvent(userID, dto);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':eventID')
  deleteEventById(
    @GetUser('userID') userID: number,
    @Param('eventID', ParseIntPipe) eventID: number,
  ) {
    return this.eventService.deleteEvent(userID, eventID);
  }
}
