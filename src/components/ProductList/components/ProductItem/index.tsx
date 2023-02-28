import { StarIcon } from '@heroicons/react/24/solid';
import type { IProduct } from '../../../../features/products/productsInterfaces';
import Carousel from '../../../Carousel';
import CartButton from '../CartButton';
import WishListButton from '../WishListButton';

interface ProductItemProps {
    product: IProduct;
}

const arrayFromNumber = (number: number) =>
    [...Array(Math.round(number))].map((_, i) => i);

export default function ProductItem({ product }: ProductItemProps) {
    const { title, rating, images, price } = product;

    return (
        <div className="grid gap-2 rounded-lg shadow border w-full h-fit p-4 pt-2">
            <div className="flex items-center justify-center h-72 w-full">
                <Carousel
                    images={images.map((i) => ({ href: i, label: title }))}
                />
            </div>

            <div className="flex justify-between items-center w-full">
                <p className="mt-1">$ {price}</p>
                <div className="flex items-center">
                    {arrayFromNumber(rating).map((i) => (
                        <StarIcon
                            key={i}
                            className="w-5 h-5 text-primary-500"
                            aria-hidden
                        />
                    ))}
                </div>
            </div>

            <h2 className="truncate font-medium" title={title}>
                {title}
            </h2>

            <div className="grid grid-cols-2 w-full h-12 place-items-end">
                <WishListButton product={product} />

                <CartButton product={product} />
            </div>
        </div>
    );
}
