import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../../app/store';
import { selectProducts } from '../../../../features/products/productsSlice';
import { useGetProducts } from '../../../../features/products/productsService';
import {
    stringifyFiltersToParam,
    stringifyPriceToParam
} from '../../../../utils';

function Header() {
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

    const totalItems = useMemo(() => data?.totalCount, [data]);

    return (
        <div className="w-full pt-2">
            <p>{totalItems} results found</p>
        </div>
    );
}

export default memo(Header);
