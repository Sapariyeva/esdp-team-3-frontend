import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../redux/slices/menuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    // другие редюсеры
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;