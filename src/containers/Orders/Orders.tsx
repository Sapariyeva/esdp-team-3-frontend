import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { useEffect, useState } from 'react';
import {
	getOrders,
	getPageData,
	getUserList,
	setIsModalOpen,
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
import { ModalFilter } from '@/components/UI/Modal/ModalFilter.tsx';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const Orders = () => {
	const dispatch = useAppDispatch();
	const screens = useBreakpoint();
	const { orderData } = useAppSelector((store) => store.order);

	useEffect(() => {
		dispatch(getOrders());
	}, []);
	const [current, setCurrent] = useState(1);

	const onChange: PaginationProps['onChange'] = async (page) => {
		await dispatch(getPageData(`${orderData.links[`page${page}`]!}&`));
		setCurrent(page);
	};

	const showModal = async () => {
		await dispatch(getUserList('manager'));
		await dispatch(getUserList('customer'));
		dispatch(setIsModalOpen());
	};

	return (
		<>
			<ModalFilter />
			<Space direction={'vertical'} size={'middle'}>
				<Flex vertical justify={'center'} align={'center'} gap={'40px'}>
					<Flex
						vertical
						justify={'center'}
						align={'center'}
						gap={'20px'}
						style={{ width: '100%' }}
					>
						<Typography.Title level={2}>
							Список заказов
						</Typography.Title>
						<Flex
							justify={'space-between'}
							align={'center'}
							style={{ width: '100%' }}
						>
							<Typography.Title level={4}>
								Фильтры
							</Typography.Title>
							<Button
								onClick={showModal}
								style={{
									padding: '10px 20px',
									background: 'white',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
								icon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="35"
										height="35"
										viewBox="0 0 20 20"
										fill="none"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6.45817 14.583C6.45817 14.2378 6.17835 13.958 5.83317 13.958H1.6665C1.32133 13.958 1.0415 14.2378 1.0415 14.583C1.0415 14.9282 1.32133 15.208 1.6665 15.208H5.83317C6.17835 15.208 6.45817 14.9282 6.45817 14.583Z"
											fill="black"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M13.5415 5.41602C13.5415 5.07084 13.8213 4.79102 14.1665 4.79102H18.3332C18.6783 4.79102 18.9582 5.07084 18.9582 5.41602C18.9582 5.76119 18.6783 6.04102 18.3332 6.04102H14.1665C13.8213 6.04102 13.5415 5.76119 13.5415 5.41602Z"
											fill="black"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M18.958 14.583C18.958 14.2378 18.6782 13.958 18.333 13.958H10.833C10.4878 13.958 10.208 14.2378 10.208 14.583C10.208 14.9282 10.4878 15.208 10.833 15.208H18.333C18.6782 15.208 18.958 14.9282 18.958 14.583Z"
											fill="black"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M1.0415 5.41602C1.0415 5.07084 1.32133 4.79102 1.6665 4.79102H9.1665C9.51167 4.79102 9.7915 5.07084 9.7915 5.41602C9.7915 5.76119 9.51167 6.04102 9.1665 6.04102H1.6665C1.32133 6.04102 1.0415 5.76119 1.0415 5.41602Z"
											fill="black"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8.33301 12.625C9.36851 12.625 10.208 13.4645 10.208 14.5C10.208 15.5355 9.36851 16.375 8.33301 16.375C7.29747 16.375 6.45801 15.5355 6.45801 14.5C6.45801 13.4645 7.29747 12.625 8.33301 12.625ZM11.458 14.5C11.458 12.7741 10.0589 11.375 8.33301 11.375C6.60712 11.375 5.20801 12.7741 5.20801 14.5C5.20801 16.2259 6.60712 17.625 8.33301 17.625C10.0589 17.625 11.458 16.2259 11.458 14.5Z"
											fill="black"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.6665 3.45801C10.631 3.45801 9.7915 4.29747 9.7915 5.33301C9.7915 6.36854 10.631 7.20801 11.6665 7.20801C12.702 7.20801 13.5415 6.36854 13.5415 5.33301C13.5415 4.29747 12.702 3.45801 11.6665 3.45801ZM8.5415 5.33301C8.5415 3.60712 9.94059 2.20801 11.6665 2.20801C13.3924 2.20801 14.7915 3.60712 14.7915 5.33301C14.7915 7.0589 13.3924 8.45801 11.6665 8.45801C9.94059 8.45801 8.5415 7.0589 8.5415 5.33301Z"
											fill="black"
										/>
									</svg>
								}
							></Button>
						</Flex>
						{screens.lg ? (
							<>
								<Row gutter={[16, 16]}>
									{orderData.orders.length !== 0 ? (
										<>
											{orderData.orders.map(
												(item, index) => (
													<Col span={12} key={index} >
														<Order
															{...item}
														/>
													</Col>
												)
											)}
										</>
									) : (
										<>
											<Typography.Title level={3}>
												Таких заказов нет...
											</Typography.Title>{' '}
										</>
									)}
								</Row>
							</>
						) : (
							<>
								<Row gutter={[8, 8]}>
									{orderData.orders.length !== 0 ? (
										<>
											{orderData.orders.map(
												(item, index) => (
													<Col span={24}>
														<Order
															{...item}
															key={index}
														/>
													</Col>
												)
											)}
										</>
									) : (
										<>
											<Typography.Title level={3}>
												Таких заказов нет...
											</Typography.Title>{' '}
										</>
									)}
								</Row>
							</>
						)}
					</Flex>
					{orderData.orders.length !== 0 ? (
						<>
							<Flex
								vertical
								justify={'center'}
								align={'center'}
								style={{ width: '100%' }}
							>
								<Pagination
									current={current}
									onChange={onChange}
									total={orderData.totalItems}
									pageSize={20}
									showSizeChanger={false}
								/>
							</Flex>
						</>
					) : (
						<></>
					)}
				</Flex>
			</Space>
		</>
	);
};
