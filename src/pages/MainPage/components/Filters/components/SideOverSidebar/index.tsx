/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */ import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { cl } from '../../../../../../utils';
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
    useEffect(() => {
        const isSmallScreen = window.innerWidth <= 1024;

        if (isSmallScreen && showFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }, [showFilters]);

    return (
        <>
            <div
                className={cl(
                    'lg:invisible fixed inset-0 bg-black opacity-50 z-1 duration-300 ease-in-out',
                    showFilters ? 'visible' : 'invisible'
                )}
                onClick={() => setShowFilters(false)}
            />

            <div
                className={cl(
                    showFilters
                        ? 'translate-x-0 w-fit'
                        : '-translate-x-[20rem]',
                    'visible lg:invisible absolute top-0 p-4 space-y-4 left-0 bg-white border rounded-lg ease-in-out z-10 duration-300'
                )}
            >
                <button onClick={() => setShowFilters(false)}>
                    <XMarkIcon className="w-5 h-5" aria-hidden />
                </button>
                <FiltersList />
                <ClearFiltersButton />
            </div>
        </>
    );
}
