import { useAppDispatch, useAppSelector } from '../../../../../../app/store';
import {
    selectProducts,
    setCurrentPage
} from '../../../../../../features/products/productsSlice';
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
    };

    return (
        <button
            disabled={isDisabled}
            type="button"
            className={cl(
                'flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full cursor-pointer text-xs font-medium hover:z-10',
                isDisabled !== undefined &&
                    !!isDisabled &&
                    'opacity-50 text-opacity-50',
                isActive !== undefined && !!isActive
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
            )}
            onClick={handleClick}
        >
            {page ?? icon}
        </button>
    );
}
