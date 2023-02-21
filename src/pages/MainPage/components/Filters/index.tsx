import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cl } from '../../../../utils';
import ClearFiltersButton from './components/ClearFiltersButton';
import FiltersList from './components/FiltersList';

export default function Filters() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <aside className="sticky inset-0 top-2 left-0 h-sidebar flex flex-col gap-2 pt-2">
            {/* header */}
            <div
                className={cl(
                    'flex',
                    showFilters
                        ? 'items-center justify-between'
                        : 'flex-col gap-2 items-start'
                )}
            >
                {showFilters ? <p>Filters</p> : null}

                <button
                    className="flex items-center justify-center rounded-lg text-black bg-white focus:ring-0 ring-0"
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

            {showFilters ? (
                <>
                    <FiltersList />
                    <ClearFiltersButton />
                </>
            ) : null}
        </aside>
    );
}
