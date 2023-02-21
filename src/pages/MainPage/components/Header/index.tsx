import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../../app/store';
import { selectProducts } from '../../../../features/products/productsSlice';
import { useGetProducts } from '../../../../features/products/productsService';
import { arrToSearchParams } from '../../../../utils';

function Header() {
    const { currentPage, query, activeBrands, activeCategories } =
        useAppSelector(selectProducts);
    const { data } = useGetProducts({
        page: currentPage,
        query,
        brands: arrToSearchParams(activeBrands, 'brand'),
        categories: arrToSearchParams(activeCategories, 'category')
    });

    const totalItems = useMemo(() => data?.totalCount, [data]);

    return (
        <div className="flex items-end justify-between w-full">
            <p>{totalItems} results found</p>

            <Link
                className="flex items-center justify-center rounded-lg bg-primary-500 p-2"
                to="/watch-list"
            >
                <HeartIcon className="w-4 h-4 text-white" aria-hidden />
            </Link>
        </div>
    );
}

export default memo(Header);
