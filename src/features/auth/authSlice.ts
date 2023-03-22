import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { type IUser } from './authInterfaces';

const userFromLS = JSON.parse(localStorage.getItem('user') ?? 'null') as IUser;
const accessTokenFromLS = JSON.parse(
    localStorage.getItem('accessToken') ?? 'null'
) as string;

interface authState {
    user: IUser | null;
    accessToken: string | null;
}

const initialState: authState = {
    user: userFromLS,
    accessToken: accessTokenFromLS
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<authState>) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
