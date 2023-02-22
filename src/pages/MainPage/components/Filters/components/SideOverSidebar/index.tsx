/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { XMarkIcon } from '@heroicons/react/24/outline';
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
            if (document.body.style.overflow === 'hidden') {
                document.body.style.removeProperty('overflow');
            }
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
                    showFilters ? 'translate-x-0' : '-translate-x-[150%]',
                    'visible lg:invisible fixed h-fit w-fit bottom-0 left-0 m-1.5 p-2 sm:p-4 space-y-4 bg-white border rounded-lg ease-in-out z-10 duration-300'
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
