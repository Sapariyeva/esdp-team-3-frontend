import { useState, useEffect } from 'react';
import { Button, Input, Form, Radio, RadioChangeEvent } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ERole } from '@/enum/role.enum';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchUsers, signUpGhost } from '@/app/userList.slice';
import './CreateUserForm.scss';
import InputMask from 'react-input-mask';

import translateValue, { roleDictionary } from '@/helpers/translate.helper';
import { UserListHeader } from '../navigation';

const CreateUserForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<ERole | null>(null);
    const [phoneError, setPhoneError] = useState(false);
    const [disabledRoles, setDisabledRoles] = useState<ERole[]>([]);
    const users = useAppSelector((state) => state.users.userList);
    useEffect(() => {
        const takenRoles = users.map(user => user.role);
        setDisabledRoles(takenRoles);
    }, [users]);

    useEffect(() => {
        if (users && users.length > 0) {
            const [user] = users;
            const nameParts = user.displayName.split(' ');
            setFirstName(nameParts[0]);
            setLastName(nameParts.slice(1).join(' '));
           
        } else {
            setFirstName('');
            setLastName('');

        }
    }, [users]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (phone.length === 10) {
                dispatch(fetchUsers({ phone }));
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [phone, dispatch]);

    useEffect(() => {
        setFirstName('');
        setLastName('');
    }, []);
    const goBack = () => {
        navigate(-1); // Вернуться назад в истории браузера
    };
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const numericValue = input.replace(/\D/g, ''); 
        
        const cleanValue = numericValue.startsWith('7') ? numericValue.substring(1) : numericValue;

       
        if (cleanValue.length > 10) {
            setPhoneError(true); 
        } else {
            setPhoneError(false); 
            setPhone(cleanValue); 
        }
    };

    const handleRoleChange = (e: RadioChangeEvent) => {
        setRole(e.target.value as ERole);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleSubmit = () => {
        if (phone && firstName && lastName && role !== null) {
            const displayName = `${firstName} ${lastName}`;
            dispatch(signUpGhost({
                phone,
                displayName,
                role 
            }));
        } else {
            console.error('Не все поля формы заполнены ');
        }
    };
    




    return (
        <div style={{ padding: '20px' }}>
            <UserListHeader title={'Добавление пользователя'}/>
            <Form.Item
                validateStatus={phoneError || (phone.length > 0 && phone.length < 10) ? 'error' : ''}
                help={phoneError || (phone.length > 0 && phone.length < 10) ? 'Введите корректный номер телефона' : ''}
            >
                
                <InputMask
                    mask="+7 (999) 999-99-99"
                    maskChar={null}
                    value={'+7' + phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (___) ___-__-__"
                    
                >
                    
                    {(inputProps: any) => <Input {...inputProps} />}
                </InputMask>
            </Form.Item>
            <Input
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="Имя"
                style={{ marginBottom: '16px' }}
            />
            <Input
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Фамилия"
                style={{ marginBottom: '16px' }}
            />
            <Form.Item>
                <Radio.Group
                    onChange={handleRoleChange}
                    className="radio-group-custom separated-radio-button"
                    value={role}
                >
                    {Object.values(ERole).map((roleValue) => (
                        <Radio.Button
                            key={roleValue}
                            value={roleValue}
                            className="radio-button-custom"
                            disabled={disabledRoles.includes(roleValue)} // Делает кнопку недоступной, если роль занята
                        >
                            {translateValue(roleValue, roleDictionary)}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
           
            <Button onClick={handleSubmit} type="primary" style={{ marginTop: '16px' }}>
                ЗАРЕГИСТРИРОВАТЬ
            </Button>
        </div>
    );
};

export default CreateUserForm;