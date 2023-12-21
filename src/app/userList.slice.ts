import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@/api/api.ts';
import axios from 'axios';
import { IUser } from '@/interfaces/user.interface';
interface PaginationLinks {
    next: string | null;
    prev: string | null;
    first: string | null;
    last: string | null;
    [key: string]: string | null;
}
interface UsersResponse {
    users: IUser[];
    totalItems: number;
    totalPages: number;
    links: PaginationLinks;
}
interface UserState {
    userList: IUser[];
    filter: string;
    searchQuery: string;
    loading: boolean;
    error: string | null;
    totalItems: number;
    totalPages: number;
    paginationLinks: PaginationLinks;
}

interface FetchUsersParams {
    offset?: number;
    limit?: number;
    phone?: string;
    email?: string;
    role?: string;
    status?: string;
}


const initialState: UserState = {
    userList: [],
    filter: '',
    searchQuery: '',
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 0,
    paginationLinks: {
        next: null,
        prev: null,
        first: null,
        last: null,
    },
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: FetchUsersParams, { rejectWithValue }) => {
        try {
            const response = await $api.get('/user', {
                params,
            });
            console.log('Response data search:', response.data);
            return {
                users: response.data.users,
                totalItems: response.data.totalItems,
                totalPages: response.data.totalPages,
                links: response.data.links,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);

export const fetchUsersWithPaginationLink = createAsyncThunk(
    'users/fetchUsersWithPaginationLink',
    async (paginationUrl: string, { rejectWithValue }) => {
        try {
            const response = await $api.get(paginationUrl);
            console.log('Response data url:', response.data);
            return {
                users: response.data.users,
                totalItems: response.data.totalItems,
                totalPages: response.data.totalPages,
                links: response.data.links,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);








export const userListSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserListFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        searchUserInList(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // обработчики для fetchUsers
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
                const { users, totalItems, totalPages, links } = action.payload;
                state.userList = users;
                state.totalItems = totalItems;
                state.totalPages = totalPages;
                state.paginationLinks = links;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            })
            // обработчики для fetchUsersWithPaginationLink
            .addCase(fetchUsersWithPaginationLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersWithPaginationLink.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
                const { users, totalItems, totalPages, links } = action.payload;
                state.userList = users;
                state.totalItems = totalItems;
                state.totalPages = totalPages;
                state.paginationLinks = links;
                state.loading = false;
            })
            .addCase(fetchUsersWithPaginationLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });
    },
});


