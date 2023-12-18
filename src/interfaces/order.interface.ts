import { EOrderStatus } from '@/enum/order.enum.ts';
import { IUser } from '@/interfaces/user.interface.ts';

export interface IOrderState {
	orderData: IOrderList;
	filterOrder: IOrderCategory;
	modalFilterOrder: boolean;
}
export interface IOrderList {
	orders: IOrder[];
	totalItems: number;
	totalPages: number;
	links: Record<string, string | null>;
}
export interface IOrder {
	id: number;
	customerId: number;
	serviceId: number;
	createdAt?: string;
	orderData: string;
	address: string;
	description?: string;
	performersQuantity: number;
	timeWorked?: number;
	income?: number;
	performerPayment?: number;
	tax?: number;
	profit?: number;
	lat: number;
	lng: number;
	managerId?: number;
	managerCommentary?: string;
	status?: EOrderStatus;
}

export interface IResponseOrders {
	data: IOrderList;
}

export interface IResponseManagerList {
	data: {
		users: IUser[];
	};
}

export interface IOrderCategory {
	listManager: IUserOrder[];
	listCustomer: IUserOrder[];
}
export interface IUserOrder {
	id: number;
	displayName: string;
}
export interface IToken {
	user: {
		user: {
			accessToken: string;
		};
	};
}
