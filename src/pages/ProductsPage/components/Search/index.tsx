import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { memo, useCallback, useRef } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { setQuery } from '../../../../features/products/productsSlice';
import { useThrottle } from '../../../../hooks/useThrottle';

function Search() {
    const dispatch = useAppDispatch();
    const searchRef = useRef<HTMLInputElement>(null);
    const xMarkIconRef = useRef<SVGSVGElement>(null);

    const handleChange = useCallback(
        useThrottle(() => {
            if (searchRef.current !== null && xMarkIconRef.current !== null) {
                const query = searchRef.current.value.trim();

                if (query.length >= 3 || query.length === 0) {
                    dispatch(setQuery(query));
                }

                xMarkIconRef.current.style.opacity =
                    query.length > 0 ? '100' : '0';
            }
        }, 700),
        []
    );

    const handleClickXMark = useCallback(() => {
        if (searchRef.current !== null) {
            searchRef.current.value = '';

            dispatch(setQuery(''));
        }
    }, []);

    return (
        <div className="flex items-center w-full relative shadow rounded-lg gap-2 p-1 px-2 border dark:border-normal-700">
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden />

            <input
                className="p-1 flex flex-grow outline-none focus:ring-0 dark:bg-normal-900"
                type="text"
                placeholder="Enter at least 3 characters"
                ref={searchRef}
                onChange={handleChange}
            />

            <XMarkIcon
                ref={xMarkIconRef}
                onClick={handleClickXMark}
                className="w-5 h-5 cursor-pointer opacity-0"
                aria-hidden
            />
        </div>
    );
}

export default memo(Search);
