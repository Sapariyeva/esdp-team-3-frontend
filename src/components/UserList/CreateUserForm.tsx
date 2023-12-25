import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';


const CreateUserForm = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const userTypes = [
        { label: 'Заказчик', value: 'customer' },
        { label: 'Исполнитель', value: 'performer' },
        { label: 'Менеджер', value: 'manager' },
    ];

    const handleSubmit = () => {
        console.log({ userType, phone, firstName, lastName });
        // код на добавление пользователя
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
                ← Назад
            </Button>
            <h1 style={{ marginBottom: '16px' }}>Добавить нового пользователя</h1>

            <div style={{ marginBottom: '16px' }}>
                <span style={{ marginRight: '8px' }}>Категория:</span>
                <div style={{ display: 'flex', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {userTypes.map((type) => (
                        <Button
                            key={type.value}
                            type={userType === type.value ? 'primary' : 'default'}
                            onClick={() => setUserType(type.value)}
                            style={{
                                backgroundColor: userType === type.value ? undefined : '#F5F4F2',
                                border: userType === type.value ? undefined : 'none',
                                marginRight: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            {type.label}
                        </Button>
                    ))}
                </div>
            </div>

            <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ marginBottom: '16px' }}
                placeholder="Номер телефона"
            />

            <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ marginBottom: '16px' }}
                placeholder="Имя"
            />

            <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ marginBottom: '16px' }}
                placeholder="Фамилия"
            />

            <div style={{ textAlign: 'center' }}>
                <Button onClick={handleSubmit} type="primary">Сохранить</Button>
            </div>
        </div>
    );
};

export default CreateUserForm;