import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
// import { productsApi } from './productsService';

export interface productsState {
    currentPage: number;
    // totalItemsCount: number;
}

const initialState: productsState = {
    currentPage: 1
    // totalItemsCount: 1
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
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

export const { setCurrentPage } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
