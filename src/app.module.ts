import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { VenueModule } from './venue/venue.module';
import { UserEventModule } from './user_event/user_event.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    EventModule,
    UserModule,
    TicketModule,
    VenueModule,
    UserEventModule,
    ReviewModule,
    PaymentModule,
    PrismaModule,
  ],
})
export class AppModule {}
