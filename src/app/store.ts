import { authApi } from '@/features/auth/authService';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { productsApi } from '@/features/products/productsService';
import productsSlice from '@/features/products/productsSlice';
import wishListSlice from '../features/wishlist/wishListSlice';
import cartSlice from '../features/cart/cartSlice';
import authSlice from '@/features/auth/authSlice';
import { orderApi } from '@/features/order/orderService';
import notificationSlice from '@/features/notification/notificationSlice';

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        products: productsSlice,
        wishList: wishListSlice,
        cart: cartSlice,
        auth: authSlice,
        notification: notificationSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            productsApi.middleware,
            authApi.middleware,
            orderApi.middleware
        ])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
