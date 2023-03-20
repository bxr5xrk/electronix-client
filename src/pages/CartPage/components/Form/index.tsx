/* eslint-disable no-console */
import Button from '@/components/Button';
import Input from '@/components/Input';
import { memo, useRef } from 'react';

function Form() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            nameRef.current &&
            emailRef.current &&
            addressRef.current &&
            cityRef.current &&
            postalCodeRef.current
        ) {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const address = addressRef.current.value;
            const city = emailRef.current.value;
            const postalCode = postalCodeRef.current.value;

            console.log({ name, email, address, city, postalCode });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-10"
        >
            <section
                className="space-y-6"
                aria-labelledby="contact-info-heading"
            >
                <h2
                    id="contact-info-heading"
                    className="text-xl font-medium text-gray-900"
                >
                    Contact information
                </h2>
                <Input
                    type="text"
                    ref={nameRef}
                    id="name"
                    label="Name"
                    autoComplete="name"
                    minLength={2}
                    required
                />

                <Input
                    type="email"
                    ref={emailRef}
                    id="name"
                    label="Email address"
                    autoComplete="email"
                    required
                />
            </section>

            <section aria-labelledby="shipping-heading" className="mt-10">
                <h2
                    id="shipping-heading"
                    className="text-xl font-medium text-gray-900"
                >
                    Shipping address
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <Input
                        type="text"
                        ref={addressRef}
                        id="address"
                        label="Address"
                        autoComplete="address"
                        minLength={2}
                        required
                    />

                    <Input
                        type="text"
                        ref={cityRef}
                        id="city"
                        label="City"
                        autoComplete="city"
                        minLength={2}
                        required
                    />

                    <Input
                        type="text"
                        ref={postalCodeRef}
                        id="postal-code"
                        label="Postal code"
                        autoComplete="postal-code"
                        minLength={2}
                        min={2}
                        required
                    />
                </div>
            </section>

            <div className="pt-10 mt-10 border-t flex justify-end">
                <Button theme="primary" type="submit">
                    Confirm order
                </Button>
            </div>
        </form>
    );
}

export default memo(Form);
