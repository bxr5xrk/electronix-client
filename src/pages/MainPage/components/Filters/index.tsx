import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cl } from '../../../../utils/cl';
import FiltersList from './components/FiltersList';

export default function Filters() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <aside className="flex flex-col gap-2 h-full">
            {/* header */}
            <div
                className={cl(
                    'flex',
                    showFilters
                        ? 'items-center justify-between'
                        : 'flex-col gap-2'
                )}
            >
                <p>Filters</p>

                <button
                    className="flex items-center justify-center p-2 rounded-lg text-black bg-white"
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    {showFilters ? (
                        <ChevronDoubleLeftIcon
                            className="w-5 h-5"
                            aria-hidden
                        />
                    ) : (
                        <ChevronDoubleRightIcon
                            className="w-5 h-5"
                            aria-hidden
                        />
                    )}
                </button>
            </div>

            {showFilters ? <FiltersList /> : null}
        </aside>
    );
}
