import  { useState, useEffect } from 'react';
import { fetchUsers } from '@/app/userList.slice';
import SearchBar from '@/components/UserList/SearchBar';
import { useAppDispatch, useAppSelector } from '@/app/store';
import UserTable from '@/components/UserList/UserTable';
import { IUser } from '@/interfaces/user.interface';

const UsersPageContainer = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.userList);
    const [searchField, setSearchField] = useState('displayName');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleSearch = (field: string, term: string) => {
        setSearchField(field);
        setSearchTerm(term);
    };

    const getFilteredUsers = (): IUser[] => {
        if (!searchTerm) return users;
        return users.filter((user) => {
            const key = searchField as keyof IUser; 
            const fieldValue = user[key]; 
            return fieldValue !== null && typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };
    const filteredUsers = getFilteredUsers();

    
   

    return (
        <div>
            <SearchBar onSearch={handleSearch} setSearchField={setSearchField} />
            <UserTable users={filteredUsers} />
        </div>
    );
};

export default UsersPageContainer;
