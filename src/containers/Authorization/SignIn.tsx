import {
	Button,
	Flex,
	Form,
	Input,
	message,
	Radio,
	RadioChangeEvent,
	Space,
	Typography,
} from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import {
	IAxiosErrorPayload,
	IUser,
	IUserSignInRequest,
} from '@/interfaces/user.interface.ts';
import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { signIn, signInConfirmRole } from '@/app/user.slice.ts';
import './authorization.scss';
import { useNavigate } from 'react-router-dom';
import { ERole } from '@/enum/role.enum.ts';
import { ModalConfirm } from '@/components/UI/Modal/Modal.tsx';
import { closeModal, showModal } from '@/app/app.slice.ts';
import { formatPhoneNumber } from '@/helpers/input.helper.tsx';

export const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((store) => store.user);
	const [form] = Form.useForm<IUserSignInRequest>();
	const [stateValueForm, setStateValueForm] = useState<IUserSignInRequest>({
		phone: '',
		password: '',
		role: null,
	});
	const [messageApi, contextHolder] = message.useMessage();
	const warning = (text: string) => {
		messageApi.open({
			type: 'error',
			content: text,
		});
	};
	const onFinish = async (values: IUserSignInRequest) => {
		setStateValueForm({
			...stateValueForm,
			...values,
			phone: values.phone.replace(/[\s()+_-]/g, '').substring(1),
		});
		const user: IUserSignInRequest = {
			phone: values.phone.replace(/[\s()+_-]/g, '').substring(1),
			password: values.password,
			role: null,
		};
		const data = await dispatch(signIn(user));
		const response = data.payload as IAxiosErrorPayload;
		if (response.response) {
			if (
				!Array.isArray(data.payload) &&
				response.response.data.success
			) {
				navigate('/');
			}
			if (!response.response.data.success) {
				warning(response.response?.data.message!);
			}
		}
	};
	const handleValueForm = (e: ChangeEvent<HTMLInputElement>) => {
		const mask = formatPhoneNumber(e.target.value);
		form.setFieldsValue({ phone: mask });
	};
	const onChangeRoleRadioGroup = async (e: RadioChangeEvent) => {
		dispatch(showModal());
		await dispatch(
			signInConfirmRole({
				...stateValueForm,
				phone: stateValueForm.phone.replace(/[\s()+_-]/g, ''),
				role: e.target.value,
			})
		);
		navigate('/');
	};
	useEffect(() => {
		if (Array.isArray(user)) {
			dispatch(showModal());
		} else {
			dispatch(closeModal());
		}
	}, [user]);
	const generateRadioButton = (user: IUser[]) => {
		return user.map((item, index) => {
			if (item.role === ERole.performer) {
				return (
					<Radio.Button value={item.role} key={index}>
						Испольнитель
					</Radio.Button>
				);
			} else if (item.role === ERole.customer) {
				return (
					<Radio.Button value={item.role} key={index}>
						Заказчик
					</Radio.Button>
				);
			} else if (item.role === ERole.manager) {
				return (
					<Radio.Button value={item.role} key={index}>
						Менеджер
					</Radio.Button>
				);
			}
		});
	};
	return (
		<>
			{contextHolder}
			<ModalConfirm title="Выберите как войти">
				<Form.Item validateTrigger={['onBlur']}>
					<Radio.Group
						className="radio-custom"
						name="role"
						onChange={onChangeRoleRadioGroup}
						size="large"
					>
						{Array.isArray(user) ? (
							<>{generateRadioButton(user)}</>
						) : (
							<></>
						)}
					</Radio.Group>
				</Form.Item>
			</ModalConfirm>
			<Space
				className={'space'}
				direction="vertical"
				size="middle"
				style={{ display: 'flex' }}
			>
				<Flex vertical justify={'center'} align={'center'}>
					<Typography.Title level={2}>Вход</Typography.Title>
					<Form
						form={form}
						initialValues={{
							phone: '+7 (',
							password: '',
							role: null,
						}}
						onFinish={onFinish}
					>
						<Form.Item
							name="phone"
							validateTrigger={['onBlur']}
							rules={[
								{
									required: true,
									message:
										'Пожалуйста, введите свой номер телефона!',
									validator: (_, value) => {
										if (
											value
												.replace(/[\s()+_-]/g, '')
												.substring(1).length == 10
										) {
											return Promise.resolve();
										} else {
											return Promise.reject();
										}
									},
								},
							]}
						>
							<Input
								placeholder="Номер"
								onChange={handleValueForm}
							/>
						</Form.Item>

						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Пожалуйста, введите пароль!',
								},
							]}
						>
							<Input.Password placeholder="Пароль" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
							>
								Войти
							</Button>
						</Form.Item>
					</Form>
				</Flex>
			</Space>
		</>
	);
};
