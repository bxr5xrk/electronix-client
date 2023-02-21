import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import HeartIconSolid from '@heroicons/react/24/solid/HeartIcon';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import type { IProduct } from '../../../../features/products/products.interfaces';
import {
    selectWatchList,
    setWatchListItems
} from '../../../../features/watchList/watchListSlice';
import { addOrRemoveItemFromArr } from '../../../../utils';
import Button from '../../../Button';

interface ProductItemProps {
    product: IProduct;
}

export default function ProductItem({ product }: ProductItemProps) {
    const dispatch = useAppDispatch();
    const { watchListItems } = useAppSelector(selectWatchList);

    const { id, title, rating, images, price } = product;

    const itemInWatchList = useMemo(
        () => watchListItems.map((i) => i.id).includes(id),
        [watchListItems]
    );

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
                    onClick={() =>
                        dispatch(
                            setWatchListItems(
                                addOrRemoveItemFromArr(watchListItems, product)
                            )
                        )
                    }
                    type="white"
                    fullWidth
                    rounded="rounded-bl-lg"
                >
                    {itemInWatchList ? (
                        <HeartIconSolid className="w-5 h-5" aria-hidden />
                    ) : (
                        <HeartIcon className="w-5 h-5" aria-hidden />
                    )}
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
