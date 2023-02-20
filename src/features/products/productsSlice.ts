import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
// import { productsApi } from './productsService';

export interface productsState {
    currentPage: number;
    query: string;
}

const initialState: productsState = {
    currentPage: 1,
    query: ''
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        }
    }

    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         productsApi.endpoints.getPaginatedProducts.matchFulfilled,
    //         (state, { payload }) => {
    //             state.totalItemsCount = payload.totalCount;
    //         }
    //     );
    // }
});

export const { setCurrentPage, setQuery } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
