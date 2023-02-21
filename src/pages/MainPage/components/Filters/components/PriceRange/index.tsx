import { useCallback } from 'react';
import { useAppSelector } from '../../../../../../app/store';
import MultiRangeSlider from '../../../../../../components/MultiRangeSlider';
import { STEP } from '../../../../../../data';
import { selectProducts } from '../../../../../../features/products/productsSlice';

export default function PriceRange() {
    const { activePriceRange } = useAppSelector(selectProducts);

    const { min, max } = activePriceRange;

    const handleChange = useCallback(
        ({ min, max }: { min: number; max: number }) => {
            console.log(min, max);
        },
        []
    );

    return (
        <MultiRangeSlider
            min={min}
            max={max}
            step={STEP}
            onChange={handleChange}
        />
    );
}
