import { useAppDispatch, useAppSelector } from '@/app/store';
import FullScreenMessage from '@/components/FullScreenMessage';
import {
    decrementCartItem,
    incrementCartItem,
    removeItemFromCart,
    selectCart
} from '@/features/cart/cartSlice';
import {
    MinusCircleIcon,
    PlusCircleIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { memo, useMemo } from 'react';

const SHIPPING_PRICE = 5;

function Items() {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(selectCart);

    if (cartItems.length === 0) {
        return (
            <FullScreenMessage
                title="No items in your cart"
                description="Add one"
            />
        );
    }

    const subtotalPrice = useMemo(
        () => cartItems.reduce((acc, i) => acc + i.price * i.count, 0),
        [cartItems]
    );

    const totalPrice = useMemo(
        () => subtotalPrice + SHIPPING_PRICE,
        [subtotalPrice]
    );

    return (
        <div className="w-full flex flex-col h-full space-y-6">
            <h2 className="text-xl font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul className="divide-y divide-gray-200">
                    {cartItems.map((product) => (
                        <li key={product.id} className="flex py-6 px-4 sm:px-6">
                            <div className="flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-20 rounded-md"
                                />
                            </div>

                            <div className="ml-6 flex flex-1 flex-col">
                                <div className="flex">
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm">
                                            <a
                                                href={product.title}
                                                className="font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {product.title}
                                            </a>
                                        </h4>
                                        <p className="capitalize mt-1 text-sm text-gray-500">
                                            {product.brand}
                                        </p>
                                        <p className="capitalize mt-1 text-sm text-gray-500">
                                            {product.category}
                                        </p>
                                    </div>

                                    <div className="ml-4 flow-root flex-shrink-0">
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    removeItemFromCart(
                                                        product.id
                                                    )
                                                )
                                            }
                                            type="button"
                                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Remove
                                            </span>
                                            <TrashIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-1 items-end justify-between pt-2">
                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        $ {product.price}
                                    </p>

                                    <div className="flex gap-3 items-center">
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    decrementCartItem(
                                                        product.id
                                                    )
                                                )
                                            }
                                            type="button"
                                        >
                                            <MinusCircleIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>

                                        <span className="w-5 text-center text-sm font-medium text-gray-900">
                                            {product.count}
                                        </span>

                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    incrementCartItem(
                                                        product.id
                                                    )
                                                )
                                            }
                                            type="button"
                                        >
                                            <PlusCircleIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            $ {subtotalPrice}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            $ {SHIPPING_PRICE}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">
                            $ {totalPrice}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default memo(Items);
