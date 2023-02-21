import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { MAX, MIN } from '../../data';

export interface productsState {
    currentPage: number;
    query: string;
    activeBrands: string[];
    activeCategories: string[];
    activePriceRange: { min: number; max: number };
}

const initialState: productsState = {
    currentPage: 1,
    query: '',
    activeBrands: [],
    activeCategories: [],
    activePriceRange: { min: MIN, max: MAX }
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setDefaultPage: (state) => {
            if (state.currentPage !== 1) {
                state.currentPage = 1;
            }
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;

            productsSlice.caseReducers.setDefaultPage(state);
        },
        setActiveBrands: (state, action: PayloadAction<string[]>) => {
            state.activeBrands = action.payload;

            productsSlice.caseReducers.setDefaultPage(state);
        },
        setActiveCategories: (state, action: PayloadAction<string[]>) => {
            state.activeCategories = action.payload;

            productsSlice.caseReducers.setDefaultPage(state);
        },
        setClearFilters: (state) => {
            state.activeBrands = [];
            state.activeCategories = [];

            productsSlice.caseReducers.setDefaultPage(state);
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
