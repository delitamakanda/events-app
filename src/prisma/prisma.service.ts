import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDB() {
    return this.$transaction([
      this.event.deleteMany(),
      this.user.deleteMany(),
      this.ticket.deleteMany(),
      this.venue.deleteMany(),
      this.userEvent.deleteMany(),
      this.review.deleteMany(),
      this.payment.deleteMany(),
    ]);
  }
}
