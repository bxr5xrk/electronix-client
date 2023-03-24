import type { IProduct } from '../../features/products/productsInterfaces';
import ProductItem from './components/ProductItem';

interface ProductListProps {
    items: IProduct[];
}

export default function ProductList({ items }: ProductListProps) {
    return (
        <section className="flex-grow grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {items?.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </section>
    );
}
