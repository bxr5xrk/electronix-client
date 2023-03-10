import { useMemo } from 'react';
import FullScreenMessage from '../../../../components/FullScreenMessage';
import ProductList from '../../../../components/ProductList';
import ProductsSkeleton from '../../../../components/Skeleton/ProductsSkeleton';
import { useProducts } from '../../../../features/products/productsService';

export default function List() {
    const { data, isLoading, isFetching, isSuccess } = useProducts();

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
