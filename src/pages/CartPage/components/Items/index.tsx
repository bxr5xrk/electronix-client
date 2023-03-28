import { useAppDispatch, useAppSelector } from '@/app/store';
import FullScreenMessage from '@/components/FullScreenMessage';
import { CART_LS_KEY } from '@/config';
import {
    decrementCartItem,
    incrementCartItem,
    removeItemFromCart,
    selectCart
} from '@/features/cart/cartSlice';
import { manageCartItems } from '@/utils/cartUtils';
import { setToLocalStorage } from '@/utils/index';
import {
    MinusCircleIcon,
    PlusCircleIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { memo } from 'react';
import { Link } from 'react-router-dom';

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

    const totalPrice = cartItems.reduce((acc, i) => acc + i.price * i.count, 0);

    const handleClickCartAction = (
        id: number,
        action: 'increment' | 'decrement' | 'remove'
    ) => {
        const newCartArr = manageCartItems(cartItems, action, id);

        if (action === 'increment') {
            dispatch(incrementCartItem(id));
        } else if (action === 'decrement') {
            dispatch(decrementCartItem(id));
        } else {
            dispatch(removeItemFromCart(id));
        }

        setToLocalStorage(CART_LS_KEY, newCartArr);
    };

    return cartItems.length ? (
        <div className="w-full flex flex-col h-full space-y-6">
            <h2 className="text-xl font-medium">Order summary</h2>

            <div className="mt-4 rounded-lg border dark:border-normal-700 shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul className="divide-y">
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
                                            <Link
                                                to={product.id.toString()}
                                                className="font-medium text-normal-700 hover:text-normal-800 dark:text-normal-300"
                                            >
                                                {product.title}
                                            </Link>
                                        </h4>
                                        <p className="capitalize mt-1 text-sm text-gray-500 dark:text-normal-400">
                                            {product.brand}
                                        </p>
                                        <p className="capitalize mt-1 text-sm text-gray-500 dark:text-normal-400">
                                            {product.category}
                                        </p>
                                    </div>

                                    <div className="ml-4 flow-root flex-shrink-0">
                                        <button
                                            onClick={() =>
                                                handleClickCartAction(
                                                    product.id,
                                                    'remove'
                                                )
                                            }
                                            type="button"
                                            className="-m-2.5 flex items-center justify-center p-2.5 text-gray-400 hover:text-gray-500"
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
                                    <p className="mt-1 text-sm font-medium">
                                        $ {product.price}
                                    </p>

                                    <div className="flex gap-3 items-center">
                                        <button
                                            onClick={() =>
                                                handleClickCartAction(
                                                    product.id,
                                                    'decrement'
                                                )
                                            }
                                            type="button"
                                        >
                                            <MinusCircleIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>

                                        <span className="w-5 text-center text-sm font-medium">
                                            {product.count}
                                        </span>

                                        <button
                                            onClick={() =>
                                                handleClickCartAction(
                                                    product.id,
                                                    'increment'
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

                <dl className="space-y-6 border-t dark:border-normal-700 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium">
                            $ {totalPrice}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    ) : null;
}

export default memo(Items);
