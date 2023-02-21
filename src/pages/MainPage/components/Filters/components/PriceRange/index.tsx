import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import MultiRangeSlider from '../../../../../../components/MultiRangeSlider';
import { STEP } from '../../../../../../data';
import type { IPriceRange } from '../../../../../../features/products/products.interfaces';
import {
    selectProducts,
    setPriceRange
} from '../../../../../../features/products/productsSlice';

export default function PriceRange() {
    const dispatch = useAppDispatch();
    const { activePriceRange } = useAppSelector(selectProducts);

    const { min, max } = activePriceRange;

    const handleChange = useCallback(({ min, max }: IPriceRange) => {
        dispatch(setPriceRange({ min, max }));
    }, []);

    return (
        <MultiRangeSlider
            min={min}
            max={max}
            step={STEP}
            onChange={handleChange}
        />
    );
}
