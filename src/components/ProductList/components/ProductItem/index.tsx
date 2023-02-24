import type { IProduct } from '../../../../features/products/productsInterfaces';
import Carousel from '../../../Carousel';
import CartButton from '../CartButton';
import WatchListButton from '../WatchListButton';

interface ProductItemProps {
    product: IProduct;
}

export default function ProductItem({ product }: ProductItemProps) {
    const { title, rating, images, price } = product;

    return (
        <div className="grid rounded-lg shadow border w-full h-fit p-4 pt-2">
            <div className="flex items-center justify-center h-72 w-full">
                <Carousel
                    images={images.map((i) => ({ href: i, label: title }))}
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
                <WatchListButton product={product} />

                <CartButton product={product} />
            </div>
        </div>
    );
}
