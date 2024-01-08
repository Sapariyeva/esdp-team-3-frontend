import { Button, Flex, Form, Modal, Radio, Select, Typography } from 'antd';
import {
	getFilterOrders,
	getOrders,
	getUserList,
	setIsModalFilterClose,
} from '@/app/order.slice.ts';
import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { IStateFilter } from '@/interfaces/filter.interface.ts';
import {
	modalFilterRadioButtonStyle,
	modalFilterStyle,
} from '@/components/UI/Modal/modal.config.ts';
import './modalFilter.scss';
import {
	modalOrderFilterContainer,
	modalOrderFilterFormContainer,
} from '@/containers/Orders/OrderDetailsStyle.config.ts';
import { useEffect, useState } from 'react';

export const ModalOrderFilter = () => {
	const dispatch = useAppDispatch();
	const { filterOrder, modalFilterOrder } = useAppSelector(
		(store) => store.order
	);
	const [valueForm, setValueForm] = useState<{ displayName: string }>({
		displayName: '',
	});
	const onFinish = async (values: IStateFilter) => {
		let queryParameters: string = '';
		if (values.customer) {
			const idCustomer = filterOrder.listCustomer.filter(
				(item) => item.displayName === values.customer
			);
			values.customer = `${idCustomer[0].id}`;
		}
		const valuesWithoutNulls: Record<string, string> = Object.entries(
			values
		)
			.filter(([_, value]) => value !== null)
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
		for (const filter in valuesWithoutNulls) {
			queryParameters += `${filter}=${valuesWithoutNulls[filter]}&`;
		}
		await dispatch(getFilterOrders(queryParameters));
	};
	const [form] = Form.useForm<IStateFilter>();
	const optionsStatus = [
		{ label: 'В поиске', value: 'SEARCHING' },
		{ label: 'Менеджер', value: 'ON_MANAGER' },
		{ label: 'В ожидание', value: 'WAITING' },
		{ label: 'В процессе', value: 'IN_PROGRESS' },
		{ label: 'Отменён', value: 'CANCELED' },
		{ label: 'Требует платеж', value: 'REQUIRES_PAYMENT' },
		{ label: 'Сделано', value: 'DONE' },
	];
	const optionsService = [
		{ label: 'Грузчик', value: '1' },
		{ label: 'Грузовой транспорт', value: '2' },
	];
	const optionsSort = [
		{ label: 'Сначала новые', value: 'ASC&sortBy=createdAt' },
		{ label: 'Сначала старые', value: 'DESC&sortBy=createdAt' },
		{ label: 'По дате исполнения', value: 'ASC&sortBy=orderData' },
	];
	useEffect(() => {
		(async () => {
			await dispatch(
				getUserList({
					role: 'customer',
					displayName: valueForm.displayName,
				})
			);
		})();
	}, [valueForm]);
	return (
		<>
			<Modal
				title="Фильтрация"
				open={modalFilterOrder}
				footer={null}
				onCancel={() => {
					dispatch(setIsModalFilterClose());
				}}
				cancelButtonProps={{ style: { display: 'none' } }}
			>
				<Flex style={modalOrderFilterContainer}>
					<Form
						name="dynamic_form_nest_item"
						onFinish={onFinish}
						form={form}
						initialValues={{
							service: null,
							sort: null,
							manager: null,
							status: null,
							customer: null,
						}}
					>
						<Flex style={modalOrderFilterFormContainer}>
							<Typography.Title level={5}>
								Категория
							</Typography.Title>
							<Form.Item name="service">
								<Radio.Group
									className="radio-custom"
									size="middle"
									style={modalFilterStyle}
								>
									{optionsService.map((item, index) => (
										<Radio.Button
											style={modalFilterRadioButtonStyle}
											value={item.value}
											className={
												'modalFilter-radioButton'
											}
											key={index}
										>
											{item.label}
										</Radio.Button>
									))}
								</Radio.Group>
							</Form.Item>
						</Flex>

						<Flex style={modalOrderFilterFormContainer}>
							<Typography.Title level={5}>
								Сортировка
							</Typography.Title>
							<Form.Item name="sortOrder">
								<Radio.Group
									className="radio-custom"
									size="middle"
									style={modalFilterStyle}
								>
									{optionsSort.map((item, index) => (
										<Radio.Button
											style={modalFilterRadioButtonStyle}
											value={item.value}
											className={
												'modalFilter-radioButton'
											}
											key={index}
										>
											{item.label}
										</Radio.Button>
									))}
								</Radio.Group>
							</Form.Item>
						</Flex>
						<Flex style={modalOrderFilterFormContainer}>
							<Typography.Title level={5}>
								Менеджер
							</Typography.Title>
							<Form.Item name="manager">
								<Select placeholder="Выберите менджера">
									{filterOrder.listManager.length !== 0 ? (
										<>
											{filterOrder.listManager.map(
												(item, index) => (
													<Select.Option
														value={item.id}
														key={index}
													>
														{item.displayName}
													</Select.Option>
												)
											)}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Flex>
						<Flex style={modalOrderFilterFormContainer}>
							<Typography.Title level={5}>
								Статус
							</Typography.Title>
							<Form.Item name="status">
								<Radio.Group
									className="radio-custom"
									size="middle"
									style={modalFilterStyle}
								>
									{optionsStatus.map((item, index) => (
										<Radio.Button
											style={modalFilterRadioButtonStyle}
											value={item.value}
											className={
												'modalFilter-radioButton'
											}
											key={index}
										>
											{item.label}
										</Radio.Button>
									))}
								</Radio.Group>
							</Form.Item>
						</Flex>
						<Flex style={modalOrderFilterFormContainer}>
							<Typography.Title level={5}>
								Заказчик
							</Typography.Title>
							<Form.Item name="customer">
								<Select
									placeholder="Выберите заказчика"
									showSearch
									options={filterOrder.listCustomer.map(
										(item) => ({
											value: item.displayName,
											label: item.displayName,
										})
									)}
									onChange={(e) => {
										setValueForm(e);
									}}
								/>
							</Form.Item>
						</Flex>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
							>
								Применить
							</Button>
						</Form.Item>
						<Button
							type="text"
							onClick={async () => {
								form.resetFields();
								await dispatch(getOrders());
							}}
							style={{ display: 'block', margin: '0 auto' }}
						>
							Сброить все фильтры
						</Button>
					</Form>
				</Flex>
			</Modal>
		</>
	);
};
