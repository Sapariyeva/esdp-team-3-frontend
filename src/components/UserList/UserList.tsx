import React, { useState } from 'react';
import { Avatar, List, Pagination } from 'antd';
import { IUser } from '@/interfaces/user.interface';
import './UserList.scss';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchUsersWithPaginationLink } from '@/app/userList.slice';
import { Link } from 'react-router-dom';
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
        <div className="user-list-container">
            <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={user => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={user.avatar || 'path-to-default-avatar.png'}
                                />
                            }
                            title={<Link to={`/user/${user.id}`}>{user.displayName}</Link>}
                            description={user.phone || 'N/A'}
                        />
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default UserList;
