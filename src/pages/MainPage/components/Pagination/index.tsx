import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { memo, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { limit } from '../../../../data';
import { useGetProducts } from '../../../../features/products/productsService';
import {
    selectProducts,
    setAllFilters
} from '../../../../features/products/productsSlice';
import {
    getPagesArr,
    stringifyFiltersToParam,
    stringifyPriceToParam
} from '../../../../utils';
import { objToUrl, urlToObj } from '../../../../utils/queryUtils';
import PageItem from './components/PageItem';

function Pagination() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        currentPage,
        query,
        activeBrands,
        activeCategories,
        activePriceRange
    } = useAppSelector(selectProducts);
    const { data } = useGetProducts({
        page: currentPage,
        query,
        brands: stringifyFiltersToParam(activeBrands, 'brand'),
        categories: stringifyFiltersToParam(activeCategories, 'category'),
        priceRange: stringifyPriceToParam(activePriceRange)
    });
    const { search } = useLocation();

    useEffect(() => {
        if (search.length > 0) {
            const obj = urlToObj(search.slice(1));

            dispatch(setAllFilters(obj));
        }
    }, []);

    useEffect(() => {
        const { min, max } = activePriceRange;

        const obj = {
            categories: activeCategories,
            brands: activeBrands,
            page: currentPage,
            min_price: min,
            max_price: max
        };
        const url = objToUrl(obj);

        navigate('?' + url, { replace: true });
    }, [currentPage, activeBrands, activeCategories, activePriceRange]);

    const totalItems = useMemo(() => data?.totalCount, [data]);

    const pagesArr = useMemo(
        () => getPagesArr(totalItems ?? 1, limit),
        [totalItems]
    );

    return (
        <div className="w-full flex flex-wrap justify-center gap-2">
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
