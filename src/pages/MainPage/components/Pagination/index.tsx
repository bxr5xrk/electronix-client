import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/store';
import { useGetProducts } from '../../../../features/products/productsService';
import { selectProducts } from '../../../../features/products/productsSlice';

export default function Pagination() {
    const { currentPage } = useAppSelector(selectProducts);
    const { data } = useGetProducts({ page: currentPage });

    const totalPages = useMemo(() => data?.totalCount, [data]);

    return (
        <div className="flex w-full justify-center items-center">
            <p>{totalPages}</p>
        </div>
    );
}
