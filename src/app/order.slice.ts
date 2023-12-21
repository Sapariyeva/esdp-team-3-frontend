import {
	IOrder,
	IOrderList,
	IOrderState,
	IResponseManagerList,
	IResponseOrder,
	IResponseOrders,
	IToken,
	IUserOrder,
} from '@/interfaces/order.interface.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { order } from '@/api/api.ts';

const initialState: IOrderState = {
	orderData: {
		orders: [],
		totalItems: 0,
		totalPages: 0,
		links: {},
	},
	filterOrder: {
		listManager: [],
		listCustomer: [],
	},
	modalFilterOrder: false,
	modalOrderDetails: false,
	orderDetails: {
		details: null,
	},
};

export const getOrders = createAsyncThunk('getOrders', async (_, thunkApi) => {
	const { rejectWithValue, getState } = thunkApi;
	try {
		const token = getState() as IToken;
		const { data }: IResponseOrders = await order.get(`/order`, {
			headers: {
				Authorization: `Bearer ${token?.user.user.accessToken}`,
			},
		});
		return data;
	} catch (e) {
		return rejectWithValue('HTTP error post request');
	}
});
export const getOrder = createAsyncThunk(
	'getOrder',
	async (id: string, thunkApi) => {
		const { rejectWithValue, getState } = thunkApi;
		try {
			const token = getState() as IToken;
			const { data }: IResponseOrder = await order.get(`/order/${id}`, {
				headers: {
					Authorization: `Bearer ${token?.user.user.accessToken}`,
				},
			});
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);
export const getPageData = createAsyncThunk(
	'getPageData',
	async (page: string, { rejectWithValue, getState }) => {
		try {
			const token = getState() as IToken;
			const { data }: IResponseOrders = await order.get(page, {
				headers: {
					Authorization: `Bearer ${token?.user.user.accessToken}`,
				},
			});
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);
export const getUserList = createAsyncThunk(
	'getUserList',
	async (role: string, { rejectWithValue, getState }) => {
		try {
			const token = getState() as IToken;
			const { data }: IResponseManagerList = await order.get(
				`/user?role=${role}`,
				{
					headers: {
						Authorization: `Bearer ${token?.user.user.accessToken}`,
					},
				}
			);
			const userList = data.users.map(({ id, displayName }) => ({
				id,
				displayName,
			}));
			return {
				role,
				userList,
			};
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);

export const getFilterOrders = createAsyncThunk(
	'getFilterOrders',
	async (queryParameter: string, { rejectWithValue, getState }) => {
		try {
			const token = getState() as IToken;
			const { data }: IResponseOrders = await order.get(
				`/order?${queryParameter}`,
				{
					headers: {
						Authorization: `Bearer ${token?.user.user.accessToken}`,
					},
				}
			);
			return data;
		} catch (e) {
			return rejectWithValue('');
		}
	}
);

export const orderSlice = createSlice({
	name: 'orderSlice',
	initialState,
	reducers: {
		setIsModalFilterOpen(state) {
			state.modalFilterOrder = true;
		},
		setIsModalFilterClose(state) {
			state.modalFilterOrder = false;
		},
		setIsModalDetailsOpen(state) {
			state.modalOrderDetails = true;
		},
		setIsModalDetailsClose(state) {
			state.modalOrderDetails = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.pending, () => {})
			.addCase(
				getOrders.fulfilled,
				(state, action: PayloadAction<IOrderList>) => {
					state.orderData = action.payload;
				}
			)
			.addCase(getOrders.rejected, () => {})

			.addCase(getOrder.pending, () => {})
			.addCase(
				getOrder.fulfilled,
				(state, action: PayloadAction<IOrder>) => {
					state.orderDetails!.details = action.payload;
				}
			)
			.addCase(getOrder.rejected, (state) => {
				state.orderDetails = {
					details: null,
				};
			})

			.addCase(getPageData.pending, () => {})
			.addCase(
				getPageData.fulfilled,
				(state, action: PayloadAction<IOrderList>) => {
					state.orderData = action.payload;
				}
			)
			.addCase(getPageData.rejected, () => {})

			.addCase(getUserList.pending, () => {})
			.addCase(
				getUserList.fulfilled,
				(
					state,
					action: PayloadAction<{
						role: string;
						userList: IUserOrder[];
					}>
				) => {
					if (action.payload.role === 'manager') {
						state.filterOrder.listManager = action.payload.userList;
					} else if (action.payload.role === 'customer') {
						state.filterOrder.listCustomer =
							action.payload.userList;
					}
				}
			)
			.addCase(getUserList.rejected, () => {})

			.addCase(getFilterOrders.pending, () => {})
			.addCase(
				getFilterOrders.fulfilled,
				(state, action: PayloadAction<IOrderList>) => {
					state.orderData = action.payload;
				}
			)
			.addCase(getFilterOrders.rejected, (state) => {
				state.orderData = {
					orders: [],
					totalItems: 0,
					totalPages: 0,
					links: {},
				};
			});
	},
});

export const {
	setIsModalFilterOpen,
	setIsModalFilterClose,
	setIsModalDetailsOpen,
	setIsModalDetailsClose,
} = orderSlice.actions;
