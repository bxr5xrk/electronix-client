import { useAppSelector } from '@/app/store';
import FullScreenMessage from '@/components/FullScreenMessage';
import Spinner from '@/components/Spinner';
import { selectAuth } from '@/features/auth/authSlice';
import type { Status } from '@/features/order/orderInterfaces';
import { useGetOrders } from '@/features/order/orderService';
import { cl, formatDate, formatPrice } from '@/utils/index';
import { Link } from 'react-router-dom';

const getStep = (status: Status) => {
    switch (status) {
        case 'processing':
            return 1;
        case 'shipped':
            return 2;
        case 'delivered':
            return 3;
    }
};

export default function History() {
    const { user } = useAppSelector(selectAuth);
    const {
        data: orders,
        isSuccess,
        isLoading
    } = useGetOrders({}, { skip: !user });

    if (isLoading) {
        return (
            <div className="w-full flex justify-center">
                <Spinner />
            </div>
        );
    }

    if (isSuccess && orders.length === 0) {
        return (
            <FullScreenMessage
                title="No orders yet"
                description="Order something ;)"
            />
        );
    }

    const sortedOrders = orders
        ? [...orders].sort((a, b) => b.datetime.localeCompare(a.datetime))
        : [];

    return (
        <section className="space-y-16 px-4">
            {sortedOrders.map((order) => (
                <div key={order.id}>
                    {/* header */}
                    <div className="rounded-lg bg-gray-50 dark:bg-normal-700 px-4 flex flex-col divide-y md:grid md:grid-cols-4 text-sm md:space-x-3 md:divide-y-0">
                        <div className="font-medium flex justify-between md:block py-5">
                            <h3> Order date</h3>
                            <p className="text-gray-600 dark:text-normal-300 whitespace-nowrap">
                                {formatDate(order.datetime)}
                            </p>
                        </div>
                        <div className="font-medium flex justify-between md:block py-5">
                            <h3>Total amount</h3>
                            <p className="text-gray-600 dark:text-normal-300">
                                {formatPrice(order.totalprice)}
                            </p>
                        </div>
                        <div className="font-medium flex justify-between md:block py-5">
                            <h3>City</h3>
                            <p
                                title={order.city}
                                className="text-gray-600 dark:text-normal-300 truncate"
                            >
                                {order.city}
                            </p>
                        </div>
                        <div className="font-medium flex justify-between md:block py-5">
                            <h3>Address</h3>
                            <p
                                title={order.address}
                                className="text-gray-600 dark:text-normal-300 truncate"
                            >
                                {order.address}
                            </p>
                        </div>
                    </div>

                    {/* status */}
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <h4 className="sr-only">Status</h4>

                        <div className="mt-6" aria-hidden="true">
                            <div className="overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-indigo-600"
                                    style={{
                                        width: `calc((${getStep(
                                            order.status
                                        )} * 2 + 1) / 8 * 100%)`
                                    }}
                                />
                            </div>
                            <div className="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-500 sm:grid">
                                <div className="text-primary-500">
                                    Processing
                                </div>
                                <div
                                    className={cl(
                                        getStep(order.status) > 1
                                            ? 'text-primary-500'
                                            : '',
                                        'text-center'
                                    )}
                                >
                                    Shipped
                                </div>
                                <div
                                    className={cl(
                                        getStep(order.status) > 2
                                            ? 'text-primary-500'
                                            : '',
                                        'text-right'
                                    )}
                                >
                                    Delivered
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* table */}
                    <div className="flex flex-col w-full divide-y dark:divide-normal-700 dark:border-normal-700 border-b pt-10">
                        <div className="grid grid-cols-4 md:grid-cols-7 text-left text-sm text-gray-500 dark:text-normal-300 pb-4">
                            <p className="pl-2 font-normal pr-8 col-span-3">
                                Product
                            </p>
                            <p className="hidden font-normal px-5 md:block">
                                Price
                            </p>
                            <p className="hidden font-normal px-5 md:block">
                                Category
                            </p>
                            <p className="hidden font-normal px-5 md:block">
                                Brand
                            </p>
                            <p className="font-normal px-5">Count</p>
                        </div>

                        {order.products.map((product) => (
                            <div
                                key={product.id}
                                className="text-left text-sm text-gray-500 dark:text-normal-300 grid grid-cols-4 md:grid-cols-7 items-center"
                            >
                                <div className="pl-2 flex items-center md:gap-5 font-medium pr-8 py-5 col-span-3">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-0 rounded md:w-16"
                                    />
                                    <div className="flex flex-col gap-2 truncate">
                                        <Link
                                            to={`/products/${product.id}`}
                                            title={product.title}
                                            className="truncate underline"
                                        >
                                            {product.title}
                                        </Link>
                                        <span className="font-normal text-sm text-gray-500 dark:text-normal-300 md:hidden">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                </div>
                                <p className="font-normal hidden py-5 px-5 whitespace-nowrap md:block">
                                    {formatPrice(product.price)}
                                </p>
                                <p className="hidden py-5 px-5 md:block capitalize">
                                    {product.category}
                                </p>
                                <p className="hidden py-5 px-5 md:block capitalize">
                                    {product.brand}
                                </p>
                                <p className="px-5 py-5">{product.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
