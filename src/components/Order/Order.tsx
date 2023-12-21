import { IOrder } from '@/interfaces/order.interface.ts';
import { FC } from 'react';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { formatDate } from '@/config/main.config.ts';

export const Order: FC<IOrder> = ({ createdAt, address, id }) => {
	return (
		<>
			<Card
				title={`${formatDate(createdAt!)}`}
				style={{ width: '100%' }}
				extra={
					<NavLink to={`/order/details/${id}`}>
						Посмотреть заказ...
					</NavLink>
				}
			>
				<p>{address}</p>
			</Card>
		</>
	);
};
