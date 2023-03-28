/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from '@/app/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { SHIPPING_LS_KEY, CART_LS_KEY } from '@/config';
import { selectAuth, setShippingAddress } from '@/features/auth/authSlice';
import { selectCart, resetCart } from '@/features/cart/cartSlice';
import { setNotification } from '@/features/notification/notificationSlice';
import { useCreateOrder } from '@/features/order/orderService';
import { createArrayFromProductIds, setToLocalStorage } from '@/utils/index';
import { memo, useEffect, useRef } from 'react';

function Form() {
    const dispatch = useAppDispatch();
    const saveAddressRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const [onCreate, { isLoading, isError }] = useCreateOrder({});
    const { cartItems } = useAppSelector(selectCart);
    const { shippingAddress } = useAppSelector(selectAuth);

    useEffect(() => {
        if (
            shippingAddress &&
            saveAddressRef.current &&
            addressRef.current &&
            cityRef.current
        ) {
            const { address, city } = shippingAddress;

            cityRef.current.value = city;
            addressRef.current.value = address;
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (addressRef.current && cityRef.current && saveAddressRef.current) {
            const address = addressRef.current.value;
            const city = cityRef.current.value;

            if (saveAddressRef.current.checked) {
                dispatch(setShippingAddress({ address, city }));

                setToLocalStorage(SHIPPING_LS_KEY, { address, city });
            }

            const productIds = createArrayFromProductIds(cartItems);

            const data = await onCreate({ city, address, productIds });

            if ('data' in data) {
                dispatch(resetCart());
                dispatch(
                    setNotification({
                        status: 'success',
                        message: 'Your order completed!'
                    })
                );
                setToLocalStorage(CART_LS_KEY, []);
            } else if ('error' in data) {
                dispatch(
                    setNotification({
                        status: 'error',
                        message: 'Server error. Please try again later.'
                    })
                );
            }
        }
    };

    return cartItems.length ? (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-10"
        >
            <section className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">
                    Shipping address
                </h2>
                <Input
                    type="text"
                    ref={addressRef}
                    id="shipping-address"
                    label="Address"
                    autoComplete="shipping-address"
                    minLength={2}
                    required
                />

                <Input
                    type="text"
                    ref={cityRef}
                    id="shipping-city"
                    label="City"
                    autoComplete="shipping-city"
                    minLength={2}
                    required
                />

                <div className="flex items-center justify-end gap-2">
                    <input
                        defaultChecked
                        ref={saveAddressRef}
                        id="save-shipping-info"
                        type="checkbox"
                        className="h-4 w-4 border rounded cursor-pointer checked:bg-primary-500"
                    />
                    <label
                        className="text-sm text-gray-700"
                        htmlFor="save-shipping-info"
                    >
                        Save Shipping address
                    </label>
                </div>
            </section>

            <div className="pt-6 mt-6 border-t flex flex-col items-end gap-6">
                <Button theme="primary" type="submit">
                    {isLoading ? 'Loading...' : 'Confirm order'}
                </Button>

                {isError ? (
                    <p className="text-sm text-red-600 text-center px-1">
                        An error occurred, please try again later.
                    </p>
                ) : null}
            </div>
        </form>
    ) : null;
}

export default memo(Form);
