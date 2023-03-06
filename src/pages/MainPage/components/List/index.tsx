import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import FullScreenMessage from '../../../../components/FullScreenMessage';
import ProductList from '../../../../components/ProductList';
import ProductsSkeleton from '../../../../components/Skeleton/ProductsSkeleton';
import { useGetProducts } from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';
import {
    stringifyFiltersToParam,
    stringifyPriceToParam
} from '../../../../utils';

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
        return <ProductsSkeleton />;
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
