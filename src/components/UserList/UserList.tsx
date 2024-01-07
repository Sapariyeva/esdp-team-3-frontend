import React, { useCallback, useRef} from 'react';
import { Avatar, Button, List, Tag } from 'antd';
import { IUser } from '@/interfaces/user.interface';
import './UserList.scss';
import { Link, useNavigate } from 'react-router-dom';
import translateValue, { roleDictionary, statusDictionary } from '@/helpers/translate.helper';
import { ERole } from '@/enum/role.enum';
interface UserListProps {
    users: IUser[];
    totalItems: number;
    pageSize: number;
    currentFilters: any;
    fetchUsers: (filters: any) => void; 
}

const UserList: React.FC<UserListProps> = ({
    users,
    totalItems,
    pageSize,
    fetchUsers,
    currentFilters
}) => {
    if (!users) {
        return <div>Пользователи не найдены</div>;
    }

    const observer = useRef<IntersectionObserver | null>(null);
    const lastUserElementRef = useCallback((node: Element | null) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && users.length < totalItems) {
                loadMoreUsers();
            }
        });
        if (node) observer.current.observe(node);
    }, [users.length, totalItems]);

    const navigate = useNavigate();

    const goToCreateUser = () => {
        navigate('/createUserForm');
    };


    const loadMoreUsers = () => {
        console.log(`users`, users);
        console.log(`users.length`, users.length);
        const newOffset = currentFilters.offset + pageSize;
        if (users.length < totalItems && newOffset < totalItems) {
            console.log(`currentFilters`, currentFilters );
            console.log(`offset`, currentFilters.offset);
            fetchUsers({
                ...currentFilters,
                offset: newOffset,
                limit: pageSize,
            });
        }
    };
    const formatPhone = (phone:string) => {
        const match = phone.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
        }
        return 'N/A'; 
    };
    return (
        <div className="UserList" style={{ padding: '0 20px' }}>
            <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={(user, index) => {
                    const isLastElement = index === users.length - 1;
                    const ref = isLastElement ? lastUserElementRef : null;
                    const getRoleTagColor = (role:ERole) => {
                        switch (role) {
                            case 'manager':
                                return 'red';
                            case 'customer':
                                return 'blue';
                            case 'performer':
                                return 'green';
                            default:
                                return 'default';
                        }
                    };
                  
                    const translatedRole = translateValue(user.role, roleDictionary);
                    const translatedStatus = translateValue(user.status, statusDictionary);
                    return (
                        <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }} ref={ref}>
                            <List.Item
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s ease',
                                    display: 'block',
                                    backgroundColor: '#ffffff'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
                                    e.currentTarget.style.transform = 'scale(1.01)';
                                    e.currentTarget.style.backgroundColor = '#f7f7f7';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.boxShadow = '';
                                    e.currentTarget.style.transform = '';
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                }}
                                onMouseDown={e => {
                                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                                    e.currentTarget.style.transform = 'scale(0.99)';
                                }}
                                onMouseUp={e => {
                                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
                                    e.currentTarget.style.transform = 'scale(1.01)';
                                }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={user.avatar || 'path-to-default-avatar.png'}
                                            style={{
                                                width: '80px', 
                                                height: '80px', 
                                                borderRadius: '5px',
                                                overflow: 'hidden'
                                            }}
                                        />
                                    }
                                    title={<div>{user.displayName}</div>}
                                    description={
                                        <div>
                                            <div>{formatPhone(user.phone) || 'N/A'}</div>
                                            <Tag color={getRoleTagColor(user.role)}>
                                                {translatedRole}
                                            </Tag>
                                            {/* Отображение статуса рядом с ролью */}
                                            <Tag color={user.status === 'ACTIVE' ? 'green' : 'volcano'}>
                                                {translatedStatus}
                                            </Tag>
                                        </div>
                                    }
                                />
                            </List.Item>
                        </Link>
                    );
                }}
            />
            <div style={{ padding: '0 20px' }}>
                <Button type="primary" onClick={goToCreateUser} style={{ marginBottom: '16px' }}>
                    Добавить пользователя
                </Button>
            </div>
        </div>
    );;
};

export default UserList;