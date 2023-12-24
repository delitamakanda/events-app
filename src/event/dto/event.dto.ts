import { TicketDto } from '../../ticket/dto';
import { ReviewDto } from '../../review/dto';
import { UserEventDto } from '../../user_event/dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventDto {
  eventID: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNotEmpty()
  eventDate: string;
  @IsOptional()
  venueId?: number;
  @IsNotEmpty()
  organizerId: number;
  @IsOptional()
  ticket?: TicketDto[];
  @IsOptional()
  reviews?: ReviewDto[];
  @IsOptional()
  userEvent?: UserEventDto[];
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsOptional()
  eventDate?: string;
  @IsOptional()
  venueId?: number;
  @IsOptional()
  organizerId?: number;
  @IsOptional()
  ticket?: TicketDto[];
  @IsOptional()
  reviews?: ReviewDto[];
  @IsOptional()
  userEvent?: UserEventDto[];
}
