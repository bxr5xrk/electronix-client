import { useAppDispatch, useAppSelector } from '@/app/store';
import MultiRangeSlider from '@/components/MultiRangeSlider';
import type { IPriceRange } from '@/features/products/productsInterfaces';
import {
    selectProducts,
    setPriceRange
} from '@/features/products/productsSlice';
import { useCallback } from 'react';
import { MAX, MIN, STEP } from '../../../../../../data';

export default function PriceRange() {
    const dispatch = useAppDispatch();
    const { activePriceRange } = useAppSelector(selectProducts);

    const { min, max } = activePriceRange;

    const handleChange = useCallback(({ min, max }: IPriceRange) => {
        dispatch(setPriceRange({ min, max }));
    }, []);

    return (
        <MultiRangeSlider
            savedValues={{ min, max }}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={handleChange}
        />
    );
}
