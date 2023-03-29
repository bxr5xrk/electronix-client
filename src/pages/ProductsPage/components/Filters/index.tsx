import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import { cl } from '@/utils/index';
import { useState } from 'react';
import ClearFiltersButton from './components/ClearFiltersButton';
import FiltersList from './components/FiltersList';
import SideOverFilters from './components/SideOverSidebar';

export default function Filters() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <aside className="sticky h-sidebar top-2 left-2 bottom-2 flex flex-col gap-2 pt-2 z-10">
            {/* header */}
            <div
                className={cl(
                    'flex',
                    showFilters
                        ? 'items-center justify-between'
                        : 'flex-col gap-2 items-start'
                )}
            >
                {showFilters ? (
                    <p className="invisible w-0 lg:visible">Filters</p>
                ) : null}

                <button
                    className="flex items-center justify-center rounded-lg focus:ring-0 ring-0"
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

            {/* sidebar for small screens */}
            <SideOverFilters
                showFilters={showFilters}
                setShowFilters={setShowFilters}
            />

            {/* static sidebar */}
            <div
                className={cl(
                    showFilters
                        ? 'translate-x-0 w-0 lg:w-fit'
                        : '-translate-x-[20rem] w-0',
                    'invisible space-y-2 lg:visible ease-in-out duration-300 z-40 overflow-y-scroll border dark:border-normal-800 shadow rounded-lg'
                )}
            >
                <FiltersList />
                <ClearFiltersButton />
            </div>
        </aside>
    );
}
