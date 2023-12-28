import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrder, setIsModalDetailsOpen, setIsModalOrderPerformers } from '@/app/order.slice.ts';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { ModalOrderDetails } from '@/components/UI/Modal/ModalOrderDetails.tsx';
import { orderDetailsButton, ordersContainerFlexWrapStyle } from './OrderDetailsStyle.config';
import { ModalOrderPerformers } from '@/components/UI/Modal/ModalOrderPerformers';

export const OrderDetails = () => {
	const { orderDetails } = useAppSelector(state => state.order);
	const dispatch = useAppDispatch();
	const params = useParams();
	const idParams: string | undefined = params.id;
	useEffect(() => {
		if (idParams) dispatch(getOrder(idParams));
	}, [params]);
	return (
		<div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>

			<Flex gap='middle' vertical style={ordersContainerFlexWrapStyle}>
				<Typography.Title level={4}>Информация о заказе</Typography.Title>
				{orderDetails.details && orderDetails.details.address ?
					<Row>
						<Col>
							<Typography.Title level={4}>Куда:&nbsp;</Typography.Title>
						</Col>
						<Col>
							<Typography.Title level={4}>{ }</Typography.Title>
						</Col>
					</Row>
					: ''
				}
				<Button
					style={orderDetailsButton}
					type={'primary'}
					onClick={() => {
						dispatch(setIsModalOrderPerformers());
					}}
				>
					Показать исполнителей
				</Button>
				<Button
					style={orderDetailsButton}
					type={'primary'}
					onClick={() => {
						dispatch(setIsModalDetailsOpen());
					}}
				>
					Дополнительная информация
				</Button>
				<ModalOrderPerformers />
				<ModalOrderDetails />
			</Flex>
		</div>
	);
};
