import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import CenterSpinner from '../../../../components/Spinner/CenterSpinner';
import { useGetProducts } from '../../../../features/products/productsService';
import {
    selectProducts,
    setCurrentPage
} from '../../../../features/products/productsSlice';
import ProductItem from './components/ProductItem';

export default function ProductsList() {
    const dispatch = useAppDispatch();
    const { currentPage } = useAppSelector(selectProducts);
    const { data, isLoading } = useGetProducts({ page: currentPage });

    const products = useMemo(() => data?.products, [data]);

    return (
        <section className="h-full grid grid-cols-3 grid-rows-3">
            {isLoading ? (
                <CenterSpinner />
            ) : (
                products?.map((product) => <ProductItem key={product.id} />)
            )}

            <button onClick={() => dispatch(setCurrentPage(2))}>2</button>
        </section>
    );
}
