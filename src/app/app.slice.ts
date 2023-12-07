import { createSlice } from '@reduxjs/toolkit';
import { IAppState } from '@/interfaces/app.interface.ts';

const initialState: IAppState = {
	modal: false,
};
export const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		showModal(state) {
			state.modal = true;
		},
		closeModal(state) {
			state.modal = false;
		},
	},
	extraReducers: (builder) => {
		builder;
	},
});
export const { showModal, closeModal } = appSlice.actions;
