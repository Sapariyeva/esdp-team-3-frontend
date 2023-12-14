import React, { useState, useEffect } from 'react';
import { fetchUsers } from '@/app/userList.slice';
import UserList from '@/components/UserList/UserList';
import SearchBar from '@/components/UserList/SearchBar';
import { useAppDispatch, useAppSelector } from '@/app/store';

const UsersPageContainer = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.userList);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const filteredUsers = users.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearch = (term: string) => {
        setSearchTerm(term)
        console.log(`filteredUsers`, filteredUsers);
        console.log(`users`, users);
    };

   

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <UserList users={filteredUsers} />
        </div>
    );
};

export default UsersPageContainer;
