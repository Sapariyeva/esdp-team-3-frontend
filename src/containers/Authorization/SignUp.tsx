import {
	Button,
	DatePicker,
	Flex,
	Form,
	Input,
	Radio,
	Space,
	Typography,
} from 'antd';
import { ERole } from '@/enum/role.enum.ts';
import { ChangeEvent, useState } from 'react';
import {
	IUserSignUpRequest,
	IUserStateForm,
} from '@/interfaces/user.interface.ts';
import { useAppDispatch } from '@/app/store.ts';
import { EUserSubject } from '@/enum/user.enum.ts';
import './authorization.scss';
import { formatPhoneNumber } from '@/helpers/input.helper.tsx';
import { signIn, signUp } from '@/app/user.slice.ts';

export const SignUp = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm<IUserStateForm>();

	const [stateValueForm, setStateValueForm] = useState<IUserStateForm>({
		firstName: '',
		lastName: '',
		phone: '',
		birthday: null,
		password: '',
		passwordConfirm: '',
		role: ERole.performer,
		subject: null,
		identifyingNumber: null,
	});
	const handleValueForm = (e: ChangeEvent<HTMLInputElement>) => {
		const mask = formatPhoneNumber(e.target.value);
		form.setFieldsValue({ phone: mask });
	};
	const onChangeRoleRadioGroup = ({ role }: { role: ERole }) => {
		form.resetFields();
		if (role === ERole.customer) {
			setStateValueForm({
				...stateValueForm,
				subject: EUserSubject.INDIVIDUAL,
			});
			form.setFieldsValue({ subject: EUserSubject.INDIVIDUAL });
		} else {
			setStateValueForm({
				...stateValueForm,
				subject: null,
			});
			form.setFieldsValue({ subject: null });
		}
		form.setFieldsValue({ role });
		setStateValueForm({
			firstName: '',
			lastName: '',
			phone: '',
			birthday: null,
			password: '',
			passwordConfirm: '',
			role: role,
			subject: null,
			identifyingNumber: null,
		});
	};
	const onChangeSubjectRadioGroup = ({
		subject,
	}: {
		subject: EUserSubject;
	}) => {
		form.setFieldsValue({ subject });
		setStateValueForm({
			...stateValueForm,
			subject,
		});
	};
	const onFinish = async (values: IUserStateForm) => {
		const dateString = values.birthday!.toString();
		const dateObject = new Date(dateString);

		const day = dateObject.getDate().toString().padStart(2, '0');
		const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
		const year = dateObject.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;
		setStateValueForm({
			...stateValueForm,
			...values,
			birthday: formattedDate,
			phone: values.phone.replace(/[\s()+_-]/g, '').substring(1),
		});
		const user: IUserSignUpRequest = {
			phone: values.phone.replace(/[\s()+_-]/g, '').substring(1),
			displayName: `${values.firstName} ${values.lastName}`,
			password: values.password,
			birthday: formattedDate,
			role: values.role,
			subject: null,
			identifyingNumber: null,
		};
		const success = await dispatch(signUp(user));
		if (success) {
			await dispatch(
				signIn({
					phone: values.phone,
					password: values.password,
					role: ERole.customer,
				})
			);
		}
	};
	return (
		<>
			<Space className={'space'} direction="vertical" size="middle" style={{ display: "flex" }}>
				<Flex vertical justify={'center'} align={'center'}>
					<Typography.Title level={2}>Регистрация</Typography.Title>
					<Form
						form={form}
						initialValues={{
							firstName: '',
							lastName: '',
							phone: '',
							birthday: null,
							password: '',
							passwordConfirm: '',
							role: ERole.performer,
							subject: null,
							identifyingNumber: null,
						}}
						onFinish={onFinish}
						onValuesChange={(changedValues, _) => {
							if ('role' in changedValues) {
								onChangeRoleRadioGroup(changedValues);
							} else if ('subject' in changedValues) {
								onChangeSubjectRadioGroup(changedValues);
							}
						}}
					>
						<Form.Item name="role" validateTrigger={['onBlur']}>
							<Radio.Group className="radio-custom" size="large">
								<Radio.Button value={ERole.performer}>
									Исполнитель
								</Radio.Button>
								<Radio.Button value={ERole.customer}>
									Заказчик
								</Radio.Button>
							</Radio.Group>
						</Form.Item>

						<Form.Item
							rules={[
								{
									required: true,
									message: 'Пожалуйста, введите свое Имя!',
									validator: (_, value) => {
										if (value && value.trim().length >= 2) {
											return Promise.resolve();
										} else {
											return Promise.reject();
										}
									},
								},
							]}
							name="firstName"
							validateTrigger={['onBlur']}
						>
							<Input placeholder="Имя" />
						</Form.Item>

						<Form.Item
							rules={[
								{
									required: true,
									message:
										'Пожалуйста, введите свою Фамилию!',
									validator: (_, value) => {
										if (value && value.trim().length >= 2) {
											return Promise.resolve();
										} else {
											return Promise.reject();
										}
									},
								},
							]}
							name="lastName"
							validateTrigger={['onBlur']}
						>
							<Input placeholder="Фамилия" />
						</Form.Item>

						<Form.Item
							name="phone"
							rules={[
								{
									required: true,
									message:
										'Пожалуйста, введите свой номер телефона!',
									validator: (_, value) => {
										if (
											value &&
											value
												.replace(/[\s()+_]/g, '')
												.substring(1).length >= 10
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

						{stateValueForm.role === ERole.performer ? (
							<>
								<Form.Item
									name="birthday"
									rules={[
										{
											required: true,
											message:
												'Пожалуйста, введите свою дату рождения!',
											validator: (_, value) => {
												if (
													value &&
													value.format('DD/MM/YYYY')
														.length >= 10
												) {
													return Promise.resolve();
												} else {
													return Promise.reject();
												}
											},
										},
									]}
									validateTrigger={['onBlur']}
								>
									<DatePicker
										format={'DD/MM/YYYY'}
										placeholder={'ДД/ММ/ГГГГ'}
									/>
								</Form.Item>
							</>
						) : (
							<>
								<Form.Item
									name={'subject'}
									validateTrigger={['onBlur']}
								>
									<Radio.Group className="radio-custom">
										<Radio.Button
											value={EUserSubject.INDIVIDUAL}
										>
											Физ. лицо
										</Radio.Button>
										<Radio.Button
											value={EUserSubject.LEGAL}
										>
											Юр. лицо
										</Radio.Button>
									</Radio.Group>
								</Form.Item>
								{stateValueForm.subject ===
									EUserSubject.LEGAL ? (
									<>
										<Form.Item
											name="identifyingNumber"
											rules={[
												{
													required: true,
													message:
														'Пожалуйста, введите свой БИН',
													validator: (_, value) => {
														if (
															value &&
															value.trim()
																.length >= 2
														) {
															return Promise.resolve();
														} else {
															return Promise.reject();
														}
													},
												},
											]}
											validateTrigger={['onBlur']}
										>
											<Input placeholder="БИН" />
										</Form.Item>
									</>
								) : (
									<></>
								)}
							</>
						)}
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

						<Form.Item
							name="passwordConfirm"
							rules={[
								{
									required: true,
									message: 'Пожалуйста, подтвердите пароль!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (
											!value ||
											getFieldValue('password') === value
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('Пароли не совпадают')
										);
									},
								}),
							]}
							validateTrigger={['onBlur']}
						>
							<Input.Password placeholder="Подтвердите пароль" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
							>
								Регистрация
							</Button>
						</Form.Item>
					</Form>
				</Flex>
			</Space>
		</>
	);
};
