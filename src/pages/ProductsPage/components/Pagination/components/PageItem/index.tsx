import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import {
    selectProducts,
    setCurrentPage
} from '../../../../../../features/products/productsSlice';
import { useScroll } from '../../../../../../hooks/useScroll';
import { cl } from '../../../../../../utils';

interface PageProps {
    isActive?: boolean;
    page?: number;
    toPrevious?: boolean;
    toNext?: boolean;
    isDisabled?: boolean;
    icon?: JSX.Element;
}

export default function PageItem({
    page,
    isActive,
    toPrevious,
    toNext,
    isDisabled,
    icon
}: PageProps) {
    const dispatch = useAppDispatch();
    const { currentPage } = useAppSelector(selectProducts);
    const { scrollTo } = useScroll();

    const handleClick = () => {
        if (page !== undefined) {
            // if it's page number
            dispatch(setCurrentPage(page));
        } else if (toPrevious !== undefined && !!toPrevious) {
            // if previous
            dispatch(setCurrentPage(currentPage - 1));
        } else if (toNext !== undefined && !!toNext) {
            // if next
            dispatch(setCurrentPage(currentPage + 1));
        }

        scrollTo('header');
    };

    return (
        <button
            disabled={isDisabled}
            type="button"
            className={cl(
                'flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full cursor-pointer text-xs font-medium hover:z-10',
                isDisabled && 'opacity-50 text-opacity-50',
                isActive
                    ? 'bg-primary-500 text-normal-50 hover:bg-primary-600'
                    : 'bg-normal-100 dark:bg-normal-800 dark:hover:bg-normal-700 hover:bg-normal-200'
            )}
            onClick={handleClick}
        >
            {page ?? icon}
        </button>
    );
}
