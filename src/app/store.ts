import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/app/user.slice.ts';
import { appSlice } from '@/app/app.slice.ts';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		app: appSlice.reducer,
	},
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
