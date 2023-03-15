import Carousel from '@/components/Carousel';
import CartButton from '@/components/ProductList/components/CartButton';
import WishListButton from '@/components/ProductList/components/WishListButton';
import type { IProduct } from '@/features/products/productsInterfaces';
import { arrayFromNumber, cl } from '@/utils/index';
import { StarIcon } from '@heroicons/react/24/solid';

interface DetailsProps {
    product: IProduct;
}

export default function Details({ product }: DetailsProps) {
    const { images, title, price, rating } = product;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
            <div className="w-full h-72 lg:h-full">
                <Carousel
                    images={images.map((i) => ({
                        href: i,
                        label: title
                    }))}
                />
            </div>

            <div className="flex flex-col gap-3">
                <h1
                    title={title}
                    className="text-2xl font-bold tracking-tight text-gray-900 truncate"
                >
                    {title}
                </h1>

                <p className="text-2xl tracking-tight text-gray-900">
                    $ {price}
                </p>

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

                <p className="text-base text-gray-700">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eligendi incidunt odio quis sit, nam aperiam earum maxime
                    velit. In repudiandae rem dicta, saepe numquam culpa
                    doloribus quidem voluptatibus necessitatibus consectetur!
                    Iste illum quam dolore magni reprehenderit.
                </p>

                <div className="flex items-center gap-4 mt-8">
                    <CartButton product={product} />
                    <WishListButton product={product} />
                </div>
            </div>
        </div>
    );
}
