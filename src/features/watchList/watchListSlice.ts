import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IProduct } from '../products/products.interfaces';

export interface watchListState {
    watchListItems: IProduct[];
}

const initialState: watchListState = {
    watchListItems: []
};

export const watchListSlice = createSlice({
    name: 'watch-list',
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
