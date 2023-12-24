import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  getEvents(userID: number) {
    return this.prisma.event.findMany({
      where: {
        organizerId: userID,
      },
    });
  }

  getEventById(userID: number, eventId: number) {
    return this.prisma.event.findFirst({
      where: {
        eventID: eventId,
        organizerId: userID,
      },
    });
  }

  async createEvent(userID: number, dto: CreateEventDto) {
    try {
      const events = await this.prisma.event.create({
        data: {
          name: dto.name,
          organizerId: userID,
          description: dto.description,
          eventDate: dto.eventDate,
        },
      });
      return events;
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(userID: number, eventID: number, dto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({
      where: { eventID },
    });
    if (!event || event.organizerId !== userID) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.event.update({
      where: { eventID },
      data: {
        organizerId: userID,
        name: dto.name,
        description: dto.description,
        eventDate: dto.eventDate,
      },
    });
  }

  async deleteEvent(userID: number, eventID: number) {
    try {
      const event = await this.prisma.event.delete({
        where: { eventID },
      });
      return event;
    } catch (error) {
      throw error;
    }
  }
}
