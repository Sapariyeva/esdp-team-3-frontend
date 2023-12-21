import { useState, useEffect } from 'react';
import { fetchUsers } from '@/app/userList.slice';
import SearchBar from '@/components/UserList/SearchBar';
import { useAppDispatch, useAppSelector } from '@/app/store';
import UserTable from '@/components/UserList/UserTable';
import { EUserStatus } from '@/enum/user.enum';
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

    const { userList, totalItems, totalPages, paginationLinks: links } = useAppSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const pagLinks = useAppSelector((state) => state.users.paginationLinks);
    const users = useAppSelector((state) => state.users.userList);
    const [filters, setFilters] = useState<Filters>({
        offset: 0,
        limit: 10,
        role: undefined,
        status: undefined, 
    });
   
    
  
    const fetchUsersWithUrl = (url: any) => {
        dispatch(fetchUsers(url));

    };
    useEffect(() => {
        const requestFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = value;
            return acc;
        }, {} as Filters);
       
        dispatch(fetchUsers(requestFilters));
      
    }, [dispatch, filters, currentPage]);
   

    


    const handleSearch = (searchField?: string, searchTerm?: string, status?: EUserStatus, role?: ERole) => {
        const newFilters: Filters = {
            ...filters,
            offset: 0, // Сброс пагинации на первую страницу при новом поиске
        };

        
        delete newFilters.displayName;
        delete newFilters.email;
        delete newFilters.phone;
        delete newFilters.identifyingNumber;

        if (searchTerm && searchField) {
            
            newFilters[searchField] = searchTerm;
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

        console.log(``, newFilters);
        setFilters(newFilters);

    };


    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <UserTable
                users={userList}
                totalItems={totalItems}
                totalPages={totalPages}
                currentPage={currentPage}
                links={{
                    next: links.next,
                    prev: links.prev,
                    first: links.first,
                    last: links.last,
                }}
                pageSize={filters.limit}
                fetchUsers={fetchUsersWithUrl}
            />
        </div>
    );

};

export default UsersPageContainer;
