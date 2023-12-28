import {
	IOrder,
	IOrderList,
	IOrderState,
	IResponseManagerList,
	IResponseOrder,
	IResponseOrders,
	IUserOrder,
} from '@/interfaces/order.interface.ts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@/api/api.ts';
import { IOrderRequest } from '@/interfaces/IOrderRequest.interface';
import { getCurrentDate } from '@/helpers/getCurrentDate.helper';
import { downloadFile } from '@/helpers/downloadFile.helpers';

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
	modalOrderPerformers: false,
	orderDetails: {
		details: null,
	},
};

export const getOrders = createAsyncThunk('getOrders', async (_, { rejectWithValue }) => {
	try {
		const { data }: IResponseOrders = await $api.get(`/order`);
		return data;
	} catch (e) {
		return rejectWithValue('HTTP error post request');
	}
});

export const getOrder = createAsyncThunk(
	'getOrder',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data }: IResponseOrder = await $api.get(`/order/${id}`);
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);

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
			const { data }: IResponseManagerList = await $api.get(`/user?role=${role}`);
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
			return response.data;
		} catch (e) {
			console.error('Error while creating order:', e);
			return rejectWithValue('HTTP error createOrder');
		}
	}
);

export const exportOrderListToCSV = createAsyncThunk(
	'exportOrderListToCSV',
	async (_, { rejectWithValue }) => {
		try {
			const response = await $api.get(`/order/export-csv`,
				{ responseType: 'blob' }
			);

			const blobURL = URL.createObjectURL(response.data);
			const formattedDateTime = getCurrentDate();

			await downloadFile(blobURL, `orders_${formattedDateTime}.csv`);
			URL.revokeObjectURL(blobURL);
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
			state.modalOrderPerformers = false;
		},
		setIsModalOrderPerformers(state) {
			state.modalOrderPerformers = !state.modalOrderPerformers;
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

			.addCase(getOrder.pending, () => { })
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

export const {
	setIsModalFilterOpen,
	setIsModalFilterClose,
	setIsModalDetailsOpen,
	setIsModalDetailsClose,
	setIsModalOrderPerformers
} = orderSlice.actions;
