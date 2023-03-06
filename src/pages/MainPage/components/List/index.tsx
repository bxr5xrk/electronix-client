import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import FullScreenMessage from '../../../../components/FullScreenMessage';
import ProductList from '../../../../components/ProductList';
// import CenterSpinner from '../../../../components/Spinner/CenterSpinner';
import { useGetProducts } from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';
import {
    stringifyFiltersToParam,
    stringifyPriceToParam
} from '../../../../utils';

function Skeleton() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 animate-pulse">
            {[...Array(9)]
                .map((_, index) => index)
                .map((i) => (
                    <div
                        key={i}
                        className="grid gap-2 rounded-lg shadow border w-full h-fit p-4 pt-2 bg-gray-50"
                    >
                        <div className="flex items-center justify-center h-72 w-full bg-gray-200 rounded-md"></div>

                        <div className="flex justify-between items-center w-full">
                            <span className="mt-1 bg-gray-200 h-5 w-16 rounded-md"></span>
                            <span className="flex items-center bg-gray-200 h-5 w-20 rounded-md"></span>
                        </div>

                        <span className="truncate font-medium bg-gray-200 rounded-md w-full h-6"></span>

                        <span className="grid grid-cols-2 w-full h-12 place-items-end bg-gray-200 rounded-md"></span>
                    </div>
                ))}
        </section>
    );
}

export default function List() {
    const {
        currentPage,
        query,
        activeBrands,
        activeCategories,
        activePriceRange
    } = useAppSelector(selectProducts);

    const { data, isLoading, isFetching, isSuccess } = useGetProducts({
        page: currentPage,
        query,
        brands: stringifyFiltersToParam(activeBrands, 'brand'),
        categories: stringifyFiltersToParam(activeCategories, 'category'),
        priceRange: stringifyPriceToParam(activePriceRange)
    });

    const products = useMemo(() => data?.products, [data]);

    if (isLoading || isFetching) {
        // return <CenterSpinner />;
        return <Skeleton />;
    }

    if (isSuccess && products?.length === 0) {
        return (
            <FullScreenMessage title="Nothing found" description="Try again" />
        );
    }

    return isSuccess && products !== undefined ? (
        <ProductList items={products} />
    ) : null;
}
