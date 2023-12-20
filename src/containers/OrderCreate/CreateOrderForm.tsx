import { useState, useEffect } from 'react';
import { Modal, Input, Radio, Select, Button, DatePicker } from 'antd';
import { fetchManagers, fetchUserByPhone } from '@/app/user.slice';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { createOrder } from '@/app/order.slice';

const { Option } = Select;

const CreateOrderForm = () => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector((state: RootState) => state.user.managers);
    const user = useAppSelector((state: RootState) => state.user.user);

    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [managerId, setManagerId] = useState<number | string>('');
    const [isDisplayNameManuallyChanged, setIsDisplayNameManuallyChanged] = useState(false);

    useEffect(() => {
        dispatch(fetchManagers());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(user) && user.length > 0 && user[0].displayName && !isDisplayNameManuallyChanged) {
            setDisplayName(user[0].displayName);
        }
        else if (user && 'displayName' in user && !isDisplayNameManuallyChanged) {
            setDisplayName(user.displayName);
        }
    }, [user, isDisplayNameManuallyChanged]);


    const handleSubmit = () => {
        const orderData = {
            serviceId: serviceType === 'loader' ? 1 : 2,
            orderData: date,
            address,
            description,
            performersQuantity: parseInt(quantity),
            phone,
            displayName,
            managerId,
            lat: 5,
            lng: 5
        };

        dispatch(createOrder(orderData));

        console.log(orderData);

    };

    const handleDateChange = (_value: any, dateString: string) => {
        setDate(dateString);
    };

    const handleManagerChange = (value: string) => {
        const selectedManager = managers.find(manager => manager.displayName === value);
        if (selectedManager) {
            setManagerId(selectedManager.id);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setPhone(newPhone);

        if (newPhone.length === 10) {
            dispatch(fetchUserByPhone(newPhone));
            setIsDisplayNameManuallyChanged(false);
        }
    };

    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
        setIsDisplayNameManuallyChanged(true);
    };

    return (
        <Modal
            open={true}
            title="Создать заказ"
            footer={null}
        >
            <DatePicker
                showTime
                onChange={handleDateChange}
                style={{ marginBottom: '16px', width: '100%' }}
                placeholder="Дата и время"
            />

            <Input onChange={(e) => setAddress(e.target.value)} style={{ marginBottom: '16px' }} placeholder="Куда?" />

            <Radio.Group onChange={(e) => setServiceType(e.target.value)} style={{ marginBottom: '16px' }}>
                <Radio value="loader">Грузчик</Radio>
                <Radio value="transport">Грузовой транспорт</Radio>
            </Radio.Group>

            <Input onChange={(e) => setQuantity(e.target.value)} style={{ marginBottom: '16px' }} type="number" placeholder="Количество грузчиков" />

            <Input onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: '16px' }} placeholder="Краткое описание" />

            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>Ответственный менеджер:</span>
                <Select onChange={handleManagerChange} style={{ flex: 1 }} placeholder="Выберите менеджера">
                    {managers.map((manager) => (
                        <Option key={manager.id} value={manager.displayName}>
                            {manager.displayName}
                        </Option>
                    ))}
                </Select>
            </div>

            <Input onChange={handlePhoneChange} style={{ marginBottom: '16px' }} placeholder="Номер телефона" />

            <Input
                value={displayName}
                onChange={handleDisplayNameChange}
                style={{ marginBottom: '16px' }}
                placeholder="Имя Фамилия"
            />

            <div style={{ textAlign: 'center' }}>
                <Button onClick={handleSubmit} type="primary">Сохранить</Button>
            </div>
        </Modal>
    );
};

export default CreateOrderForm;
