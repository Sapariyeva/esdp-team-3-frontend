import { useState, useEffect } from 'react';
import { fetchUsers } from '@/app/userList.slice';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<Filters>({
        offset: 0,
        limit: 10,
        status: undefined,
        role: undefined,
    });



    const fetchUsersWithUrl = (url: any) => {
        dispatch(fetchUsers(url));

    };
    useEffect(() => {
        const requestFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = value;
            return acc;
        }, {} as Filters);
        console.log(`filters`, filters);
console.log(`requestFilters`, requestFilters);
        dispatch(fetchUsers(requestFilters));

    }, [dispatch, filters, currentPage]);





    const handleSearch = (searchTerm: string, status?: EUserStatus, role?: ERole, selectedSearchField?: ESearchFields) => {
        const newFilters: Filters = {
            ...filters,
            offset: 0, 
        };

      
        delete newFilters.displayName;
        delete newFilters.email;
        delete newFilters.phone;
        delete newFilters.identifyingNumber;

        
        if (searchTerm && selectedSearchField) {
            newFilters[selectedSearchField] = searchTerm;
        }

        if (role) {
            newFilters.role = role;
        } else {
            delete newFilters.role;
        }

        if (status) {
            newFilters.status = status;
        } else {
            delete newFilters.status;
        }

        setFilters(newFilters);
    };


    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <UserList
                users={userList}
                totalItems={totalItems}
                currentPage={currentPage}
                pageSize={filters.limit}
                fetchUsers={fetchUsersWithUrl}
            />
        </div>
    );

};

export default UsersPageContainer;
