import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import {
    limit,
    useGetProducts
} from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';
import { arrToSearchParams, getPagesArr } from '../../../../utils';
import PageItem from './components/PageItem';

function Pagination() {
    const { currentPage, query, activeBrands, activeCategories } =
        useAppSelector(selectProducts);
    const { data } = useGetProducts({
        page: currentPage,
        query,
        brands: arrToSearchParams(activeBrands, 'brand'),
        categories: arrToSearchParams(activeCategories, 'category')
    });

    const totalItems = useMemo(() => data?.totalCount, [data]);

    const pagesArr = useMemo(
        () => getPagesArr(totalItems ?? 1, limit),
        [totalItems]
    );

    return (
        <div className="w-full flex justify-center gap-2">
            {pagesArr.length > 1 ? (
                <>
                    <PageItem
                        isDisabled={currentPage === 1}
                        toPrevious
                        icon={
                            <ChevronLeftIcon className="w-5 h-5" aria-hidden />
                        }
                    />

                    <div className="flex items-center gap-2 bg-gray-100 rounded-full">
                        {pagesArr.map((page) => (
                            <PageItem
                                key={page}
                                page={page}
                                isActive={page === currentPage}
                            />
                        ))}
                    </div>

                    <PageItem
                        isDisabled={currentPage === totalItems}
                        toNext
                        icon={
                            <ChevronRightIcon className="w-5 h-5" aria-hidden />
                        }
                    />
                </>
            ) : null}
        </div>
    );
}

export default memo(Pagination);
