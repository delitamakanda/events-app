import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getEvents() {
    return [];
  }

  async getEventById(eventId: number) {
    return eventId;
  }

  async createEvent() {}

  async updateEvent() {}

  async deleteEvent() {}
}
