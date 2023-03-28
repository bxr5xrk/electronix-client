import { arrayFromNumber, cl } from '@/utils/index';
import { StarIcon } from '@heroicons/react/24/solid';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { IProduct } from '../../../../features/products/productsInterfaces';
import Carousel from '../../../Carousel';
import CartButton from '../CartButton';
import WishListButton from '../WishListButton';

interface ProductItemProps {
    product: IProduct;
    children?: ReactNode;
}

export default function ProductItem({ product, children }: ProductItemProps) {
    const { title, rating, images, price, id } = product;

    return (
        <div className="relative grid gap-2 rounded-lg border border-normal-50 dark:border-normal-900 dark:hover:border-primary-400 hover:border-primary-400 w-full h-fit p-4 pt-2 transition">
            {children}

            <div className="flex items-center justify-center h-72 w-full">
                <Carousel
                    images={images.map((i) => ({ href: i, label: title }))}
                />
            </div>

            <div className="flex justify-between items-center w-full">
                <p className="mt-1">$ {price}</p>
                <div className="flex items-center">
                    {arrayFromNumber(5).map((i) => (
                        <StarIcon
                            key={i}
                            className={cl(
                                rating > i
                                    ? 'text-primary-500'
                                    : 'text-normal-200 dark:text-normal-700',
                                'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden
                        />
                    ))}
                </div>
            </div>

            <Link
                to={`products/${id}`}
                className="truncate font-medium hover:underline"
                title={title}
            >
                {title}
            </Link>

            <div className="grid grid-cols-2 w-full gap-3 h-12 place-items-end">
                <WishListButton product={product} />

                <CartButton product={product} />
            </div>
        </div>
    );
}
