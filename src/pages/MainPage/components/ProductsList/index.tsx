/* eslint-disable indent */
import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import CenterSpinner from '../../../../components/Spinner/CenterSpinner';
import { useGetProducts } from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';
import {
    stringifyFiltersToParam,
    stringifyPriceToParam
} from '../../../../utils';
import ProductItem from './components/ProductItem';

export default function ProductsList() {
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
        return <CenterSpinner />;
    }

    if (query.length > 0 && isSuccess && products?.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl">Nothing found</h1>
                <h3>Try again</h3>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-3 gap-3 overflow-y-scroll flex-grow">
            {isSuccess
                ? products?.map((product) => (
                      <ProductItem product={product} key={product.id} />
                  ))
                : null}
        </section>
    );
}
