/* eslint-disable indent */
import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import CenterSpinner from '../../../../components/Spinner/CenterSpinner';
import { useGetProducts } from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';
import ProductItem from './components/ProductItem';

export default function ProductsList() {
    const { currentPage } = useAppSelector(selectProducts);
    const { data, isLoading, isSuccess } = useGetProducts({
        page: currentPage
    });

    const products = useMemo(() => data?.products, [data]);

    return (
        <section className="grid grid-cols-3 gap-3 h-1/2 overflow-y-scroll flex-grow">
            {isLoading ? <CenterSpinner /> : null}

            {isSuccess
                ? products?.map((product) => (
                      <ProductItem
                          images={product.images}
                          title={product.title}
                          price={product.price}
                          rating={product.rating}
                          key={product.id}
                      />
                  ))
                : null}
        </section>
    );
}
