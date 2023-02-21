import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import type { IProduct } from '../../../../features/products/productsInterfaces';
import {
    selectWatchList,
    setWatchListItems
} from '../../../../features/watchList/watchListSlice';
import { addOrRemoveItemFromArr, setToLocalStorage } from '../../../../utils';
import Button from '../../../Button';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import HeartIconSolid from '@heroicons/react/24/solid/HeartIcon';

interface WatchListButtonProps {
    product: IProduct;
}

function WatchListButton({ product }: WatchListButtonProps) {
    const dispatch = useAppDispatch();
    const { watchListItems } = useAppSelector(selectWatchList);

    const { id } = product;

    const isItemInWatchList = useMemo(
        () => watchListItems.map((i) => i.id).includes(id),
        [watchListItems]
    );

    const handleClickWatchList = useCallback(
        (product: IProduct) => {
            const newWatchListArr = addOrRemoveItemFromArr(
                watchListItems,
                product
            );

            dispatch(setWatchListItems(newWatchListArr));

            setToLocalStorage('watchList', newWatchListArr);
        },
        [product]
    );

    return (
        <Button
            title="Add to watchList"
            onClick={() => handleClickWatchList(product)}
            type="white"
            fullWidth
            rounded="rounded-bl-lg"
        >
            {isItemInWatchList ? (
                <HeartIconSolid className="w-5 h-5" aria-hidden />
            ) : (
                <HeartIcon className="w-5 h-5" aria-hidden />
            )}
        </Button>
    );
}

export default memo(WatchListButton);
