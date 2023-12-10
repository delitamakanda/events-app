import { Module } from '@nestjs/common';
import { UserEventController } from './user_event.controller';

@Module({
  controllers: [UserEventController],
})
export class UserEventModule {}
