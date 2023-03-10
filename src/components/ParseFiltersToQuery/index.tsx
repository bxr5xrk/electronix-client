import { objToUrl, urlToObj } from '@/utils/queryUtils';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import {
    selectProducts,
    setAllFilters
} from '../../features/products/productsSlice';

export function ParseFiltersFromQuery() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { currentPage, activeBrands, activeCategories, activePriceRange } =
        useAppSelector(selectProducts);

    const { search } = useLocation();

    useEffect(() => {
        if (search.length > 0) {
            const obj = urlToObj(search.slice(1));

            dispatch(setAllFilters(obj));
        }
    }, []);

    useEffect(() => {
        const { min, max } = activePriceRange;

        const obj = {
            categories: activeCategories,
            brands: activeBrands,
            page: currentPage,
            min_price: min,
            max_price: max
        };
        const url = objToUrl(obj);

        navigate('?' + String(url), { replace: true });
    }, [currentPage, activeBrands, activeCategories, activePriceRange]);

    return null;
}
