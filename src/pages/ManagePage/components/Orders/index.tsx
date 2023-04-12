import CenterSpinner from '@/components/Spinner/CenterSpinner';
import { useGetOrders } from '@/features/order/orderService';
import { useMemo } from 'react';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import Stats from './components/Stats';

export default function ManageOrders() {
    const { data } = useGetOrders({});

    const shortedOrders = useMemo(
        () =>
            data
                ? [...data].sort((i) => (i.status === 'processing' ? -1 : 1))
                : [],
        [data]
    );

    if (!data) {
        return <CenterSpinner />;
    }

    return (
        <main className="w-full flex justify-center pb-24 pt-8 sm:px-6 sm:pt-16 lg:px-8 ">
            <div className="space-y-20 w-full sm:w-fit">
                {shortedOrders.map((order) => (
                    <div key={order.id}>
                        <Header id={order.id} datetime={order.datetime} />

                        <div className="mt-6 space-y-10 p-4 border-b border-t dark:border-gray-500 shadow-sm sm:rounded-lg sm:border">
                            <Stats
                                status={order.status}
                                address={order.address}
                                totalPrice={order.totalprice}
                                city={order.city}
                                orderId={order.id}
                            />

                            <ProductsList products={order.products} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
