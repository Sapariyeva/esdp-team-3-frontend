import React from 'react';
import { IUser } from '@/interfaces/user.interface'; 

interface UserListProps {
    users: IUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.id}>{user.displayName}</li> 
        ))}
    </ul>
);

export default UserList;
