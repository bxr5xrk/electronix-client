import { XMarkIcon } from '@heroicons/react/24/outline';
import { cl } from '@/utils/index';
import ClearFiltersButton from '../ClearFiltersButton';
import FiltersList from '../FiltersList';

interface SideOverFiltersProps {
    showFilters: boolean;
    setShowFilters: (i: boolean) => void;
}

export default function SideOverFilters({
    showFilters,
    setShowFilters
}: SideOverFiltersProps) {
    return (
        <>
            <div
                className={cl(
                    'lg:invisible fixed inset-0 bg-black opacity-50 z-40 duration-300 ease-in-out',
                    showFilters ? 'visible' : 'invisible'
                )}
                onClick={() => setShowFilters(false)}
            />

            <div
                className={cl(
                    showFilters ? 'translate-x-0' : '-translate-x-[110%]',
                    'visible overflow-y-scroll lg:invisible fixed inset-0 w-fit bottom-2 top-2 left-2 p-2 sm:p-4 space-y-2 border bg-normal-50 dark:bg-normal-900 dark:border-normal-700 rounded-lg ease-in-out z-50 duration-300'
                )}
            >
                <button className="p-2" onClick={() => setShowFilters(false)}>
                    <XMarkIcon className="w-5 h-5" aria-hidden />
                </button>

                <FiltersList />

                <ClearFiltersButton />
            </div>
        </>
    );
}
