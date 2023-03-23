import { memo, useCallback, useMemo } from 'react';
import Button from '../../../Button';
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon';
import ShoppingBagIconSolid from '@heroicons/react/24/solid/ShoppingBagIcon';
import {
    addItemToCart,
    CART_LS_KEY,
    removeItemFromCart,
    selectCart
} from '../../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';
import type { IProduct } from '@/features/products/productsInterfaces';
import { setToLocalStorage } from '@/utils/index';
import { manageCartItems } from '@/utils/cartUtils';

interface CartButtonProps {
    product: IProduct;
}

function CartButton({ product }: CartButtonProps) {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(selectCart);

    const { id } = product;

    const isItemInCart = useMemo(
        () => cartItems.map((i) => i.id).includes(id),
        [cartItems]
    );

    const handleClickCart = useCallback(
        (product: IProduct) => {
            const newCartArr = manageCartItems(
                cartItems,
                isItemInCart ? 'remove' : 'add',
                id,
                isItemInCart ? undefined : product
            );

            if (isItemInCart) {
                dispatch(removeItemFromCart(product.id));
            } else {
                dispatch(addItemToCart(product));
            }

            setToLocalStorage(CART_LS_KEY, newCartArr);
        },
        [product, cartItems]
    );

    return (
        <Button
            title="Add to cart"
            onClick={() => handleClickCart(product)}
            theme="primary"
            fullWidth
        >
            {isItemInCart ? (
                <ShoppingBagIconSolid className="w-5 h-5" aria-hidden />
            ) : (
                <ShoppingBagIcon className="w-5 h-5" aria-hidden />
            )}
        </Button>
    );
}

export default memo(CartButton);
