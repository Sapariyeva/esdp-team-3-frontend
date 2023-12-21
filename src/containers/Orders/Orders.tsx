import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { useEffect, useState } from 'react';
import {
	getFilterOrders,
	getOrders,
	getPageData,
	getUserList,
	setIsModalFilterOpen,
} from '@/app/order.slice.ts';
import { Order } from '@/components/Order/Order.tsx';
import {
	Button,
	Col,
	Flex,
	Pagination,
	PaginationProps,
	Row,
	Space,
	Typography,
} from 'antd';
import { ModalOrderFilter } from '@/components/UI/Modal/ModalOrderFilter.tsx';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useParams } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import {
	ordersContainerFlexStyle,
	ordersContainerFlexWrapStyle,
	ordersModalFilterButtonStyle,
	ordersRowStyle,
} from '@/containers/Orders/OrderDetailsStyle.config.ts';

export const Orders = () => {
	const dispatch = useAppDispatch();
	const screens = useBreakpoint();
	const params = useParams();
	const idParams: string | undefined = params.filter;
	const { orderData } = useAppSelector((store) => store.order);

	useEffect(() => {
		if (!idParams) dispatch(getOrders());
	}, [params]);
	useEffect(() => {
		if (idParams && (idParams === 'in_progress' || idParams === 'done')) {
			dispatch(getFilterOrders(`status=${idParams.toUpperCase()}`));
		}
	}, [params]);
	const [current, setCurrent] = useState(1);
	const onChange: PaginationProps['onChange'] = async (page) => {
		await dispatch(getPageData(`${orderData.links[`page${page}`]!}&`));
		setCurrent(page);
	};
	const showModal = async () => {
		await dispatch(getUserList('manager'));
		await dispatch(getUserList('customer'));
		dispatch(setIsModalFilterOpen());
	};
	return (
		<>
			{!idParams && <ModalOrderFilter />}
			<Space direction="vertical" size="middle">
				<Flex style={ordersContainerFlexStyle}>
					<Flex
						vertical
						justify="center"
						align="center"
						gap="20px"
						style={{ width: '100%' }}
					>
						<Typography.Title level={2}>
							Список заказов
						</Typography.Title>
						<Flex style={ordersContainerFlexWrapStyle}>
							{!idParams && (
								<>
									<Typography.Title level={4}>
										Фильтры
									</Typography.Title>
									<Button
										onClick={showModal}
										style={ordersModalFilterButtonStyle}
										icon={<FilterOutlined />}
									></Button>
								</>
							)}
						</Flex>
						{screens.lg ? (
							<Row gutter={[16, 16]} style={ordersRowStyle}>
								{orderData.orders.length !== 0 ? (
									orderData.orders.map((item, index) => (
										<Col span={12} key={index}>
											<Order {...item} />
										</Col>
									))
								) : (
									<Typography.Title level={3}>
										Таких заказов нет...
									</Typography.Title>
								)}
							</Row>
						) : (
							<Row gutter={[8, 8]} style={ordersRowStyle}>
								{orderData.orders.length !== 0 ? (
									orderData.orders.map((item, index) => (
										<Col span={24} key={index}>
											<Order {...item} />
										</Col>
									))
								) : (
									<Typography.Title level={3}>
										Таких заказов нет...
									</Typography.Title>
								)}
							</Row>
						)}
					</Flex>
					{orderData.orders.length !== 0 &&
						orderData.totalItems > 20 && (
							<Flex style={ordersContainerFlexStyle}>
								<Pagination
									current={current}
									onChange={onChange}
									total={orderData.totalItems}
									pageSize={20}
									showSizeChanger={false}
								/>
							</Flex>
						)}
				</Flex>
			</Space>
		</>
	);
};
