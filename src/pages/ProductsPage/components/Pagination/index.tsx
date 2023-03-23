import { getPagesArr } from '@/utils/index';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import { LIMIT_ITEMS } from '../../../../data';
import { useProducts } from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';
import PageItem from './components/PageItem';

function Pagination() {
    const { currentPage } = useAppSelector(selectProducts);

    const { data } = useProducts();

    const totalItems = useMemo(() => data?.totalCount, [data]);

    const pagesArr = useMemo(
        () => getPagesArr(totalItems ?? 1, LIMIT_ITEMS),
        [totalItems]
    );

    return (
        <div className="w-full flex flex-wrap justify-center gap-2 pb-2">
            {pagesArr.length > 1 ? (
                <>
                    {/* previous */}
                    <PageItem
                        isDisabled={currentPage === 1}
                        toPrevious
                        icon={
                            <ChevronLeftIcon className="w-5 h-5" aria-hidden />
                        }
                    />

                    {/* numbers */}
                    <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full">
                        {pagesArr.map((page) => (
                            <PageItem
                                key={page}
                                page={page}
                                isActive={page === currentPage}
                            />
                        ))}
                    </div>

                    {/* next */}
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
