/* eslint-disable @typescript-eslint/no-misused-promises */
import FullScreenMessage from '@/components/FullScreenMessage';
import ProductItem from '@/components/ProductList/components/ProductItem';
import ProductsSkeleton from '@/components/Skeleton/ProductsSkeleton';
import {
    useDeleteProduct,
    useProducts
} from '@/features/products/productsService';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Products() {
    const { data, isLoading, isFetching, isSuccess } = useProducts();
    const products = data?.products;

    const [onDelete] = useDeleteProduct();

    return (
        <>
            {isLoading || isFetching ? <ProductsSkeleton /> : null}

            {isSuccess && products?.length === 0 ? (
                <FullScreenMessage
                    title="Nothing found"
                    description="Try again"
                />
            ) : null}

            <section className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {products?.map((product) => (
                    <ProductItem product={product} key={product.id}>
                        <button
                            onClick={async () =>
                                await onDelete({ id: product.id })
                            }
                            type="button"
                            className="absolute top-3 right-3 p-1 z-10 text-gray-500 cursor-pointer hover:text-gray-600"
                        >
                            <TrashIcon
                                className="h-6 w-6 "
                                aria-hidden="true"
                            />
                        </button>
                    </ProductItem>
                ))}
            </section>
        </>
    );
}
