import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { type ShippingAddress, type IUserAuth } from './authInterfaces';
import { SHIPPING_LS_KEY, TOKEN_LS_KEY, USER_LS_KEY } from '@/config';

const userFromLS = JSON.parse(
    localStorage.getItem(USER_LS_KEY) ?? 'null'
) as IUserAuth;
const accessTokenFromLS = JSON.parse(
    localStorage.getItem(TOKEN_LS_KEY) ?? 'null'
) as string;
const shippingAddressFromLS = JSON.parse(
    localStorage.getItem(SHIPPING_LS_KEY) ?? 'null'
) as ShippingAddress;

interface authState {
    user: IUserAuth | null;
    accessToken: string | null;
    shippingAddress: ShippingAddress | null;
}

const initialState: authState = {
    user: userFromLS,
    accessToken: accessTokenFromLS,
    shippingAddress: shippingAddressFromLS
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: IUserAuth; accessToken: string }>
        ) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    }
});

export const { setCredentials, logout, setShippingAddress } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
