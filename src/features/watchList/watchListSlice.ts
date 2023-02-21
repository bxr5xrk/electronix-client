import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IProduct } from '../products/productsInterfaces';

const watchListItemsFromLS = JSON.parse(
    localStorage.getItem('watchList') ?? '[]'
);

export interface watchListState {
    watchListItems: IProduct[];
}

const initialState: watchListState = {
    watchListItems: watchListItemsFromLS
};

export const watchListSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        setWatchListItems: (state, action: PayloadAction<IProduct[]>) => {
            state.watchListItems = [...action.payload];
        }
    }
});

export const { setWatchListItems } = watchListSlice.actions;

export const selectWatchList = (state: RootState) => state.watchList;

export default watchListSlice.reducer;
