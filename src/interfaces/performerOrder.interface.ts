import { EPerformerOrderStatus } from '@/enum/order.enum';
import { IUser } from './user.interface';

export interface IPerformerOrder {
	id: number;
	performerId: number;
	orderId: number;
	start: string;
	end: string;
	status: EPerformerOrderStatus;
	performerRating: number;
	customerRating: number;
	performer: IUser;
}