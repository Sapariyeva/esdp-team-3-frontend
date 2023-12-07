import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IUser,
	IUserSignInRequest,
	IUserSignInResponse,
	IUserSignUpRequest,
	IUserState,
} from '@/interfaces/user.interface.ts';
import { ERole } from '@/enum/role.enum.ts';
import { EUserStatus } from '@/enum/user.enum.ts';
import {
	userSignIn,
	userSignInConfirmRole,
	userSignOut,
	userSignUp,
} from '@/api/user.api.ts';

const initialState: IUserState = {
	user: {
		id: 0,
		phone: '',
		password: '',
		displayName: '',
		email: '',
		birthday: '',
		avatar: '',
		role: ERole.customer,
		avgRating: 0,
		ratingCount: 0,
		lastPosition: '',
		identifyingNumber: 0,
		status: EUserStatus.ACTIVE,
		token: '',
	},
	multiRoleSuccess: false,
};
export const signUp = createAsyncThunk(
	'signUp',
	async (user: IUserSignUpRequest, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		const request = Object.fromEntries(
			Object.entries(user).filter(([_, value]) => value !== null)
		);
		try {
			const { data } = await userSignUp.post('', request);
			return data.success;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);

export const signIn = createAsyncThunk(
	'signIn',
	async (user: IUserSignInRequest, { rejectWithValue }) => {
		try {
			const request = Object.fromEntries(
				Object.entries(user).filter(([_, value]) => value !== null)
			);
			const { data }: IUserSignInResponse = await userSignIn.post(
				'',
				request
			);
			if (data.payload.token) {
				return data.payload;
			} else {
				return Object.values(data.payload);
			}
		} catch (e) {
			return rejectWithValue('HTTP error signIn');
		}
	}
);
export const signInConfirmRole = createAsyncThunk(
	'signInConfirmRole',
	async (user: IUserSignInRequest, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		try {
			const { data }: IUserSignInResponse =
				await userSignInConfirmRole.post('', user);
			return data.payload;
		} catch (e) {
			return rejectWithValue('HTTP error signInConfirmRole');
		}
	}
);
export const signOut = createAsyncThunk(
	'signOut',
	async (token: string, { rejectWithValue }) => {
		try {
			await userSignOut.post('', null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (e) {
			return rejectWithValue('HTTP error signOut');
		}
	}
);

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, () => {})
			.addCase(
				signIn.fulfilled,
				(state, action: PayloadAction<IUser | IUser[]>) => {
					const { payload } = action;
					if (Array.isArray(payload)) {
						state.user = payload;
						state.multiRoleSuccess = true;
					} else {
						state.user = payload;
					}
				}
			)
			.addCase(signIn.rejected, () => {})

			.addCase(signUp.pending, () => {})
			.addCase(signUp.fulfilled, () => {})
			.addCase(signUp.rejected, () => {})

			.addCase(signInConfirmRole.pending, () => {})
			.addCase(
				signInConfirmRole.fulfilled,
				(state, action: PayloadAction<IUser | IUser[]>) => {
					const { payload } = action;
					state.user = payload;
				}
			)
			.addCase(signInConfirmRole.rejected, () => {})

			.addCase(signOut.pending, () => {})
			.addCase(signOut.fulfilled, (state) => {
				state.user = {
					id: 0,
					phone: '',
					password: '',
					displayName: '',
					email: '',
					birthday: '',
					avatar: '',
					role: ERole.customer,
					avgRating: 0,
					ratingCount: 0,
					lastPosition: '',
					identifyingNumber: 0,
					status: EUserStatus.ACTIVE,
				};
			})
			.addCase(signOut.rejected, () => {});
	},
});
