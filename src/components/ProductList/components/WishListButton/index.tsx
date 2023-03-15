import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import type { IProduct } from '../../../../features/products/productsInterfaces';
import {
    selectWishList,
    setWishListItems
} from '../../../../features/wishlist/wishListSlice';
import { addOrRemoveItemFromArr, setToLocalStorage } from '../../../../utils';
import Button from '../../../Button';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import HeartIconSolid from '@heroicons/react/24/solid/HeartIcon';

interface WishListButtonProps {
    product: IProduct;
}

function WishListButton({ product }: WishListButtonProps) {
    const dispatch = useAppDispatch();
    const { wishListItems } = useAppSelector(selectWishList);

    const { id } = product;

    const isItemInWishList = useMemo(
        () => wishListItems.map((i) => i.id).includes(id),
        [wishListItems]
    );

    const handleClickWishList = useCallback(
        (product: IProduct) => {
            const newWishListArr = addOrRemoveItemFromArr(
                wishListItems,
                product
            );

            dispatch(setWishListItems(newWishListArr));

            setToLocalStorage('wishList', newWishListArr);
        },
        [product, wishListItems]
    );

    return (
        <Button
            title="Add to wish list"
            onClick={() => handleClickWishList(product)}
            theme="white"
            fullWidth
        >
            {isItemInWishList ? (
                <HeartIconSolid className="w-5 h-5" aria-hidden />
            ) : (
                <HeartIcon className="w-5 h-5" aria-hidden />
            )}
        </Button>
    );
}

export default memo(WishListButton);
