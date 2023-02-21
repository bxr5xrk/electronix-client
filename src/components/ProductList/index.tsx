import React from 'react';
import type { IProduct } from '../../features/products/productsInterfaces';
import ProductItem from './components/ProductItem';

interface ProductListProps {
    items: IProduct[];
}

export default function ProductList({ items }: ProductListProps) {
    return (
        <section className="grid grid-cols-3 gap-3 overflow-y-scroll flex-grow">
            {items?.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </section>
    );
}
