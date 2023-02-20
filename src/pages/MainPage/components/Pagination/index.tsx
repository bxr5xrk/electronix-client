import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import {
    limit,
    useGetProducts
} from '../../../../features/products/productsService';
import {
    selectProducts,
    setCurrentPage
} from '../../../../features/products/productsSlice';
import { cl } from '../../../../utils/cl';

const getPagesArr = (totalItems: number, limit: number) => {
    const pagesCount = Math.floor(totalItems / limit);

    const pagesArr = [...Array(pagesCount)].map((_, index) => index + 1);

    return pagesArr;
};

interface PageProps {
    isActive?: boolean;
    page?: number;
    toPrevious?: boolean;
    toNext?: boolean;
    isDisabled?: boolean;
    icon?: JSX.Element;
}

function PageItem({
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
            dispatch(setCurrentPage(page));
        } else if (toPrevious !== undefined && !!toPrevious) {
            dispatch(setCurrentPage(currentPage - 1));
        } else if (toNext !== undefined && !!toNext) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        <button
            disabled={isDisabled}
            type="button"
            className={cl(
                'flex items-center justify-center p-2 rounded-full cursor-pointer font-medium hover:z-10',
                isDisabled !== undefined && !!isDisabled && 'opacity-75',
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

export default function Pagination() {
    const { currentPage } = useAppSelector(selectProducts);
    const { data } = useGetProducts({ page: currentPage });

    const totalItems = useMemo(() => data?.totalCount, [data]);

    const pagesArr = useMemo(
        () => getPagesArr(totalItems ?? 1, limit),
        [totalItems]
    );

    return (
        <div className="flex w-full justify-center items-center">
            <PageItem
                toPrevious
                icon={<ChevronLeftIcon className="w-5 h-5" aria-hidden />}
            />

            <div className="flex items-center gap-2 bg-gray-100">
                {pagesArr.map((page) => (
                    <PageItem
                        key={page}
                        page={page}
                        isActive={page === currentPage}
                    />
                ))}
            </div>

            <PageItem
                toNext
                icon={<ChevronRightIcon className="w-5 h-5" aria-hidden />}
            />
        </div>
    );
}
