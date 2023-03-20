import { memo, useMemo } from 'react';
import { useProducts } from '../../../../features/products/productsService';

function Header() {
    const { data } = useProducts();

    const totalItems = useMemo(() => data?.totalCount, [data]);

    return (
        <div className="w-full pt-2 h-6">
            {data !== undefined ? (
                <p className="font-medium">{totalItems} items</p>
            ) : null}
        </div>
    );
}

export default memo(Header);
