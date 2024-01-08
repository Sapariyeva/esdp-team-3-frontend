import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchUserById } from '@/app/userList.slice';
import { Avatar, Button, Card, Tag } from 'antd';

import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { displayFormatPhone } from '@/helpers/displayFormatPhone.helper';


const UserDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const user = useAppSelector((state) => state.users.currentUser);
    const isLoading = useAppSelector((state) => state.users.loading);
    const error = useAppSelector((state) => state.users.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [dispatch, id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    const formattedBirthday = new Date(user.birthday!).toLocaleDateString();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',

            overflow: 'auto',
            position: 'relative'
        }}>
            <Card
                style={{
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    position: 'relative', 
                    width: '90%', 
                    maxWidth: '600px', 
                }}
                cover={
                    <div style={{ padding: '20px', background: '#f0f2f5', borderBottom: '1px solid #f0f0f0' }}>

                        <Avatar
                            size={128}
                            src={user.avatar}
                            icon={!user.avatar && <UserOutlined />}
                        />
                    </div>
                }
                actions={[
                    <Button type="primary" danger>
                        Изменить статус
                    </Button>
                ]}
            >
                <Card.Meta
                    title={user.displayName}
                    description={(
                        <>
                            <p>Телефон:{user.phone ? displayFormatPhone(user.phone) : 'Не указан'}</p>
                            <p>Email: {user.email || 'Не указан'}</p>
                            <p>Дата рождения: {user.birthday ? formattedBirthday : 'Не указана'}</p>
                            <p>Роль: {user.role}</p>
                            <p>Средний рейтинг: {user.avgRating || 'Не указан'}</p>
                            <p>Количество оценок: {user.ratingCount || 'Не указано'}</p>
                            <p>Последнее местоположение: {user.lastPosition || 'Не указано'}</p>
                            <p>Идентификационный номер: {user.identifyingNumber || 'Не указан'}</p>
                            <Tag color={user.status === 'ACTIVE' ? 'green' : 'volcano'}>{user.status}</Tag>
                        </>
                    )}
                />
            </Card>

            {/* Кнопка закрытия в верхнем правом углу */}
            <Button
                onClick={() => navigate(-1)}
                icon={<CloseOutlined />}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    border: 'none',
                    background: 'transparent', 
                    color: 'rgba(0, 0, 0, 0.65)', 
                    boxShadow: 'none', 
                }}
            />
        </div>
    );
};

export default UserDetail;