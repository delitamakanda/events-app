import { EventDto } from '../../event/dto';

export class VenueDto {
  venueID: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  seatingCapacity: number;
  events: EventDto[];
}
