import React, { useState } from 'react';
import { Avatar, Button, List, Pagination } from 'antd';
import { IUser } from '@/interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchUsersWithPaginationLink } from '@/app/userList.slice';
import { Link, useNavigate } from 'react-router-dom';
import { displayFormatPhone } from '@/helpers/displayFormatPhone.helper';
import './UserList.scss';

interface UserListProps {
    users: IUser[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    fetchUsers: (url: string) => void;
}

const UserList: React.FC<UserListProps> = ({
    users,
    totalItems,
    pageSize,
}) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const paginationLinks = useAppSelector((state) => state.users.paginationLinks);
    const navigate = useNavigate();

    const goToCreateUser = () => {
        navigate('/createUserForm');
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const pageKey = `page${pageNumber}`;
        const pageLink = paginationLinks[pageKey];

        if (pageLink) {
            dispatch(fetchUsersWithPaginationLink(pageLink));
        } else {
            console.error(`No link available for ${pageKey}`);
        }
    };

    return (
        <div style={{ padding: '0 20px' }}>
            <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={user => (
                    <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
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
                                    />
                                }
                                title={user.displayName}
                                description={user.phone ? displayFormatPhone(user.phone) : 'N/A'}
                            />
                        </List.Item>
                    </Link>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                style={{
                    marginTop: '20px',
                }}
            />
            <div style={{ padding: '0 20px' }}>
                <Button type="primary" onClick={goToCreateUser} style={{ marginBottom: '16px' }}>
                    Добавить пользователя
                </Button>
            </div>
        </div>
    );
};

export default UserList;
