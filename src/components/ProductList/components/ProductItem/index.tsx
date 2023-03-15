import { arrayFromNumber, cl } from '@/utils/index';
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import type { IProduct } from '../../../../features/products/productsInterfaces';
import Carousel from '../../../Carousel';
import CartButton from '../CartButton';
import WishListButton from '../WishListButton';

interface ProductItemProps {
    product: IProduct;
}

export default function ProductItem({ product }: ProductItemProps) {
    const { title, rating, images, price, id } = product;

    return (
        <div className="grid gap-2 rounded-lg border border-white hover:border-primary-400 w-full h-fit p-4 pt-2 transition">
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
                                    : 'text-gray-200',
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
