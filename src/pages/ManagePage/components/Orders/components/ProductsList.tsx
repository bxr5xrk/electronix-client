import type { IProduct } from '@/features/products/productsInterfaces';
import { Link } from 'react-router-dom';

interface ProductWithCount extends IProduct {
    count: number;
}

interface ProductsListProps {
    products: ProductWithCount[];
}

export default function ProductsList({ products }: ProductsListProps) {
    return (
        <section className="space-y-5 col-span-2">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="relative transition hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-3 rounded-lg border dark:border-gray-700 px-6 py-5 shadow-sm"
                >
                    <div className="flex-shrink-0">
                        <img className="h-10" src={product.images[0]} alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <Link
                            to={`/products/${product.id}`}
                            className="focus:outline-none space-y-2"
                        >
                            <p className="truncate text-sm font-medium">
                                {product.title}
                            </p>
                            <p className="truncate text-sm dark:text-gray-400 text-gray-600">
                                {product.count}{' '}
                                {product.count === 1 ? 'item' : 'items'}
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}
