import React, { memo, useMemo } from 'react';
import { useProducts } from '../../../../features/products/productsService';

function Header() {
    const { data } = useProducts();

    const totalItems = useMemo(() => data?.totalCount, [data]);

    return (
        <div className="w-full pt-2">
            <p>{totalItems} results found</p>
        </div>
    );
}

export default memo(Header);
