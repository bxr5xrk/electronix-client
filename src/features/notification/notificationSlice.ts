import { type RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    status: 'success' | 'error';
    message: string;
}

interface notificationState {
    notification: Notification | null;
}

const initialState: notificationState = {
    notification: null
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<Notification>) => {
            state.notification = action.payload;
        },
        resetNotification: (state) => {
            state.notification = null;
        }
    }
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
