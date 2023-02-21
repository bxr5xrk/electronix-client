import { useCallback, useEffect, useState, useRef, memo } from 'react';
import type { IPriceRange } from '../../features/products/productsInterfaces';
import { useDebounce } from '../../hooks/useDebounce';
import '../../styles/multiRangeSlider.css';

interface MultiRangeSliderProps {
    min: number;
    max: number;
    step: number;
    onChange: ({ min, max }: IPriceRange) => void;
    savedValues: IPriceRange;
}

function MultiRangeSlider({
    min,
    max,
    step,
    onChange,
    savedValues
}: MultiRangeSliderProps) {
    const { min: minSaved, max: maxSaved } = savedValues;

    const [minVal, setMinVal] = useState(minSaved ?? min);
    const [maxVal, setMaxVal] = useState(maxSaved ?? max);
    const minValRef = useRef<number>(minSaved ?? min);
    const maxValRef = useRef<number>(maxSaved ?? max);
    const debouncedMin = useDebounce(minVal, 500);
    const debouncedMax = useDebounce(maxVal, 500);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (minVal !== minSaved) {
            setMinVal(minSaved);
            minValRef.current = minSaved;
        }

        if (maxVal !== maxSaved) {
            setMaxVal(maxSaved);
            maxValRef.current = maxSaved;
        }
    }, [minSaved, maxSaved]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current !== null) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current !== null) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: debouncedMin, max: debouncedMax });
    }, [onChange, debouncedMax, debouncedMin]);

    return (
        <div className="relative flex w-full justify-center p-5">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(
                        Number(event.target.value),
                        maxVal - 1
                    );
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? '5' : undefined }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(
                        Number(event.target.value),
                        minVal + 1
                    );
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="relative w-50">
                <div className="slider__track" />
                <div ref={range} className="slider__range  bg-primary-500" />
                <div className="slider__left-value text-black font-medium">
                    {minVal}
                </div>
                <div className="slider__right-value text-black font-medium">
                    {maxVal}
                </div>
            </div>
        </div>
    );
}

export default memo(MultiRangeSlider);
