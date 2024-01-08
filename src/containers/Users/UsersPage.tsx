import { useState, useEffect } from 'react';
import { fetchUsers, setFilterApplied } from '@/app/userList.slice';
import SearchBar from '@/components/UserList/SearchBar';
import { useAppDispatch, useAppSelector } from '@/app/store';
import UserList from '@/components/UserList/UserList';
import { ESearchFields, EUserStatus } from '@/enum/user.enum';
import { ERole } from '@/enum/role.enum';
interface Filters {
    offset: number;
    limit: number;
    phone?: string;
    email?: string;
    role?: string;
    status?: string;
    [key: string]: any;
}


const UsersPageContainer = () => {
    const dispatch = useAppDispatch();

    const { userList, totalItems } = useAppSelector((state) => state.users);
  
    const [filters, setFilters] = useState<Filters>({
        offset: 0,
        limit: 10,
        status: undefined,
        role: undefined, 
        searchField:undefined
    });
    const fetchUsersWithUrl = (url: any) => {
        console.log(`url`, url);
        setFilters(url)
        dispatch(fetchUsers(url));

    };
    useEffect(() => {
        console.log('useEffect filters:', filters);
        const requestFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = value;
            return acc;
        }, {} as Filters);

        dispatch(setFilterApplied(true));
        dispatch(fetchUsers(requestFilters));
    }, []);

    const handleSearch = (
        searchTerm: string,
        status?: EUserStatus | null, 
        role?: ERole | null, 
        searchField?: ESearchFields | null 
    ) => {
        const newFilters: Filters = {
            offset: 0,
            limit: 10,
            ...(searchField && searchTerm ? { [searchField]: searchTerm } : {}),
            ...(status ? { status: status } : {}),
            ...(role ? { role: role } : {}),
        };

        setFilters(newFilters);
        dispatch(setFilterApplied(true));
        dispatch(fetchUsers(newFilters));
    };


    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <UserList
                users={userList}
                totalItems={totalItems}

                pageSize={filters.limit}
                fetchUsers={fetchUsersWithUrl}
                currentFilters={filters}
            />
        </div>
    );

};

export default UsersPageContainer;
