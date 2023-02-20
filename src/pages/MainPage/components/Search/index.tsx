import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import {
    selectProducts,
    setCurrentPage,
    setQuery
} from '../../../../features/products/productsSlice';
import { useDebounce } from '../../../../hooks/useDebounce';

function Search() {
    const dispatch = useAppDispatch();
    const { currentPage } = useAppSelector(selectProducts);
    const [searchValue, setSearchValue] = useState('');

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const query = debouncedValue.trim();

        dispatch(setQuery(query));

        if (currentPage !== 1) {
            dispatch(setCurrentPage(1));
        }
    }, [debouncedValue]);

    return (
        <div className="flex items-center w-full relative shadow-md rounded-lg gap-2 p-1 px-2 border">
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden />

            <input
                className="p-1 flex flex-grow"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            <XMarkIcon className="w-5 h-5" aria-hidden />
        </div>
    );
}

export default memo(Search);
