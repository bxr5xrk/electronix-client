import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Button from '../../../../../../components/Button';
import type { IProduct } from '../../../../../../features/products/products.interfaces';

interface ProductItemProps
    extends Pick<IProduct, 'title' | 'images' | 'price' | 'rating'> {}

export default function ProductItem({
    title,
    images,
    price,
    rating
}: ProductItemProps) {
    return (
        <div className="grid rounded-lg shadow border w-full h-fit p-4 pt-2">
            <div className="flex items-center justify-center bg-center bg-contain h-72 bg-clip-content w-full">
                <img
                    src={images[0]}
                    alt={title + ' image'}
                    width={300}
                    height={300}
                />
            </div>

            <div className="flex justify-between w-full">
                <h3>${price}</h3>
                <h3>{rating}</h3>
            </div>

            <h2 className="truncate" title={title}>
                {title}
            </h2>

            <div className="grid grid-cols-2 w-full h-12 place-items-end">
                <Button
                    title="Add to watchList"
                    onClick={() => ({})}
                    type="white"
                    fullWidth
                    rounded="rounded-bl-lg"
                >
                    <HeartIcon className="w-5 h-5" aria-hidden />
                </Button>
                <Button
                    title="Add to cart"
                    onClick={() => ({})}
                    type="primary"
                    fullWidth
                    rounded="rounded-br-lg"
                >
                    <ShoppingBagIcon className="w-5 h-5" aria-hidden />
                </Button>
            </div>
        </div>
    );
}
