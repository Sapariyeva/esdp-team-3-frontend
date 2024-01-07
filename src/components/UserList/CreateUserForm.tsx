import { useState, useEffect } from 'react';
import { Button, Input, Form, Radio, RadioChangeEvent } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ERole } from '@/enum/role.enum';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchUsers, signUpGhost } from '@/app/userList.slice';
import './CreateUserForm.scss';
import { EUserSubject } from '@/enum/user.enum';
import translateValue, { roleDictionary, subjectDictionary } from '@/helpers/translate.helper';

const CreateUserForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<ERole>(ERole.customer);
    const [phoneError, setPhoneError] = useState(false);
    const [subject, setSubject] = useState<EUserSubject | null>(null);
    const users = useAppSelector((state) => state.users.userList);

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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = e.target.value.replace(/\D/g, '');
        if (numericValue.length > 11) {
            numericValue = numericValue.slice(0, 11); 
            setPhoneError(true); 
        } else {
            setPhoneError(false); 
        }
        setPhone(numericValue);
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
        if (phone && firstName && lastName && subject) {
            const displayName = `${firstName} ${lastName}`;
            dispatch(signUpGhost({
                phone,
                displayName,
                role: ERole.customer, 
                subject
            }));
        } else {
            console.error('Не все поля формы заполнены или не выбран subject');
        }
    };
    



    const handleSubjectChange = (e: RadioChangeEvent) => {
        const subjectValue: string = e.target.value;
        if (Object.values(EUserSubject).includes(subjectValue as EUserSubject)) {
            setSubject(subjectValue as EUserSubject);
        } else {
            setSubject(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
                ← Назад
            </Button>
            <h1 style={{ marginBottom: '16px' }}>Добавить нового пользователя</h1>
            <Form.Item
                validateStatus={phoneError || (phone.length > 0 && phone.length < 10) ? 'error' : ''}
                help={phoneError ? 'Номер не должен превышать 11 цифр' : (phone.length > 0 && phone.length < 10 ? 'Номер телефона должен содержать 10 цифр' : '')}
            >
                <Input
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Телефон"
                />
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
                        >
                            {translateValue(roleValue, roleDictionary)}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Radio.Group
                    onChange={handleSubjectChange}
                    className="radio-group-custom separated-radio-button"
                    value={subject}
                >
                    {Object.values(EUserSubject).map((subjectValue) => (
                        <Radio.Button
                            key={subjectValue}
                            value={subjectValue}
                            className="radio-button-custom"
                        >
                            {translateValue(subjectValue, subjectDictionary)}
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