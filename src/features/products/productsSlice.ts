import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface productsState {
    currentPage: number;
    query: string;
    activeBrands: string[];
    activeCategories: string[];
}

const initialState: productsState = {
    currentPage: 1,
    query: '',
    activeBrands: [],
    activeCategories: []
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

            if (state.currentPage !== 1) {
                state.currentPage = 1;
            }
        },
        setActiveBrands: (state, action: PayloadAction<string[]>) => {
            state.activeBrands = action.payload;
        },
        setActiveCategories: (state, action: PayloadAction<string[]>) => {
            state.activeCategories = action.payload;
        },
        setClearFilters: (state) => {
            state.activeBrands = [];
            state.activeCategories = [];
        }
    }
});

export const {
    setCurrentPage,
    setQuery,
    setActiveBrands,
    setActiveCategories,
    setClearFilters
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
