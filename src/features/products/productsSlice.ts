import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { MAX, MIN } from '../../config';
import type { IPriceRange } from './productsInterfaces';
import type { IParamsObj } from '../../utils/queryUtils';

export interface productsState {
    currentPage: number;
    query: string;
    activeBrands: string[];
    activeCategories: string[];
    activePriceRange: IPriceRange;
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
            state.activePriceRange = { min: MIN, max: MAX };

            productsSlice.caseReducers.setDefaultPage(state);
        },
        setPriceRange: (state, action: PayloadAction<IPriceRange>) => {
            state.activePriceRange = action.payload;

            productsSlice.caseReducers.setDefaultPage(state);
        },
        setAllFilters: (state, action: PayloadAction<IParamsObj>) => {
            const {
                page,
                categories,
                brands,
                max_price: max,
                min_price: min
            } = action.payload;

            state.currentPage = page;
            state.activeBrands = brands;
            state.activeCategories = categories;
            state.activePriceRange = { min, max };
        },
        resetAllFilters: () => initialState
    }
});

export const {
    setCurrentPage,
    setQuery,
    setActiveBrands,
    setActiveCategories,
    setClearFilters,
    setPriceRange,
    setAllFilters,
    resetAllFilters
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
