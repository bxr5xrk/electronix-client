import { useCallback } from 'react';
import { useAppDispatch } from '../../../../../../app/store';
import MultiRangeSlider from '../../../../../../components/MultiRangeSlider';
import { MAX, MIN, STEP } from '../../../../../../data';
import type { IPriceRange } from '../../../../../../features/products/productsInterfaces';
import { setPriceRange } from '../../../../../../features/products/productsSlice';

export default function PriceRange() {
    const dispatch = useAppDispatch();

    const handleChange = useCallback(({ min, max }: IPriceRange) => {
        dispatch(setPriceRange({ min, max }));
    }, []);

    return (
        <MultiRangeSlider
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={handleChange}
        />
    );
}
