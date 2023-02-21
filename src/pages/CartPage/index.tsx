import React from 'react';
import { useAppSelector } from '../../app/store';
import FullScreenMessage from '../../components/FullScreenMessage';
import PageTitle from '../../components/PageTitle';
import ProductList from '../../components/ProductList';
import { selectCart } from '../../features/cart/cartSlice';

export default function CartPage() {
    const { cartItems } = useAppSelector(selectCart);

    if (cartItems.length === 0) {
        return (
            <FullScreenMessage
                title="No items in your cart"
                description="Add one"
            />
        );
    }

    return (
        <>
            <PageTitle title="Cart" />
            {cartItems !== undefined ? <ProductList items={cartItems} /> : null}
        </>
    );
}
