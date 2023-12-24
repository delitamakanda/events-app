import { PaymentDto } from '../../payment/dto';

export class TicketDto {
  ticketID: number;
  eventId: number;
  purchaserId: number;
  purchaseDate: string;
  price: string;
  status: string;
  payment: PaymentDto[];
}
