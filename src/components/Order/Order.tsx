import { IOrder } from '@/interfaces/order.interface.ts';
import { FC } from 'react';
import { Card } from 'antd';

const formatDate = (originalDate: string) => {
	const date = new Date(originalDate);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const Order: FC<IOrder> = ({ createdAt, address }) => {
	return (
		<>
			<Card title={`${formatDate(createdAt!)}`} style={{ width: '100%' }}>
				<p>{address}</p>
			</Card>
		</>
	);
};
