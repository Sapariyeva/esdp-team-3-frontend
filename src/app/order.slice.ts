import {
	IOrderList,
	IOrderState,
	IResponseManagerList,
	IResponseOrders,
	IUserOrder,
} from '@/interfaces/order.interface.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@/api/api.ts';
import { IOrderRequest } from '@/interfaces/IOrderRequest.interface';

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
};

export const getOrders = createAsyncThunk('getOrders', async (_, thunkApi) => {
	const { rejectWithValue } = thunkApi;
	try {
		const { data }: IResponseOrders = await $api.get(`/order`);
		return data;
	} catch (e) {
		return rejectWithValue('HTTP error post request');
	}
});

export const getPageData = createAsyncThunk(
	'getPageData',
	async (page: string, { rejectWithValue }) => {
		try {
			const { data }: IResponseOrders = await $api.get(page);
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);
export const getUserList = createAsyncThunk(
	'getUserList',
	async (role: string, { rejectWithValue }) => {
		try {
			const { data }: IResponseManagerList = await $api.get(
				`/user?role=${role}`
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
	async (queryParameter: string, { rejectWithValue }) => {
		try {
			const { data }: IResponseOrders = await $api.get(
				`/order?${queryParameter}`
			);
			return data;
		} catch (e) {
			return rejectWithValue('');
		}
	}
);

export const createOrder = createAsyncThunk(
	'createOrder',
	async (order: IOrderRequest, { rejectWithValue }) => {
		try {
			const response = await $api.post('/order', order);
			console.log(response);

			return response.data;
		} catch (e) {
			console.error('Error while creating order:', e);
			return rejectWithValue('HTTP error createOrder');
		}
	}
);

export const orderSlice = createSlice({
	name: 'orderSlice',
	initialState,
	reducers: {
		setIsModalOpen(state) {
			state.modalFilterOrder = true;
		},
		setIsModalClose(state) {
			state.modalFilterOrder = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.pending, () => { })
			.addCase(
				getOrders.fulfilled,
				(state, action: PayloadAction<IOrderList>) => {
					state.orderData = action.payload;
				}
			)
			.addCase(getOrders.rejected, () => { })

			.addCase(getPageData.pending, () => { })
			.addCase(
				getPageData.fulfilled,
				(state, action: PayloadAction<IOrderList>) => {
					state.orderData = action.payload;
				}
			)
			.addCase(getPageData.rejected, () => { })

			.addCase(getUserList.pending, () => { })
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
			.addCase(getUserList.rejected, () => { })

			.addCase(getFilterOrders.pending, () => { })
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

export const { setIsModalOpen, setIsModalClose } = orderSlice.actions;
