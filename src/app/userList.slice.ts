import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@/api/api.ts';
import axios from 'axios';
import { IUser } from '@/interfaces/user.interface';

interface UserState {
    userList: IUser[]; 
    filter: string;
    searchQuery: string;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userList: [],
    filter: '',
    searchQuery: '',
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get('/user');
            return response.data.users;
        } catch (error) {
            console.error('Error during fetchUsers:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'An unknown axios error occurred';
                console.error('Axios error message:', errorMessage);
                return rejectWithValue(errorMessage);
            }

            console.error('An unknown error occurred:', error);
            return rejectWithValue('An unknown error occurred.');
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
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.userList = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});


