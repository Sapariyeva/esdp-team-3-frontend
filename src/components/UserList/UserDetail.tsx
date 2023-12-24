import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchUserById } from '@/app/userList.slice';
import { Avatar, Button, Card, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserDetail: React.FC = () => {
    const dispatch = useAppDispatch();
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card
                style={{ maxWidth: 300, width: '100%', margin: 'auto' }}
                cover={
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
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
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Телефон:</strong> {user.phone || 'Не указан'}</p>
                            <p><strong>Email:</strong> {user.email || 'Не указан'}</p>
                            <p><strong>Дата рождения:</strong> {user.birthday || 'Не указана'}</p>
                            <p><strong>Роль:</strong> {user.role}</p>
                            <p><strong>Средний рейтинг:</strong> {user.avgRating || 'Не указан'}</p>
                            <p><strong>Количество оценок:</strong> {user.ratingCount || 'Не указано'}</p>
                            <p><strong>Последнее местоположение:</strong> {user.lastPosition || 'Не указано'}</p>
                            <p><strong>Идентификационный номер:</strong> {user.identifyingNumber || 'Не указан'}</p>
                            <Tag color={user.status === 'ACTIVE' ? 'green' : 'volcano'}>{user.status}</Tag>
                        </>
                    )}
                />
            </Card>
        </div>
    ); 
};

export default UserDetail;
