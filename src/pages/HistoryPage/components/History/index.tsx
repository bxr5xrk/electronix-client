import { useAppSelector } from '@/app/store';
import FullScreenMessage from '@/components/FullScreenMessage';
import Spinner from '@/components/Spinner';
import { selectAuth } from '@/features/auth/authSlice';
import { useGetOrders } from '@/features/order/orderService';
import { formatDate, formatPrice } from '@/utils/index';
import { Link } from 'react-router-dom';

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

    if (isSuccess && !orders.length) {
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
        <>
            <section className="space-y-16 px-4">
                {sortedOrders.map((order) => (
                    <div key={order.id}>
                        {/* header */}
                        <div className="rounded-lg bg-gray-50 px-4 flex flex-col divide-y md:grid md:grid-cols-4 text-sm md:space-x-3 md:divide-y-0">
                            <div className="font-medium text-gray-900 flex justify-between md:block py-5">
                                <h3> Order date</h3>
                                <p className="text-gray-600 whitespace-nowrap">
                                    {formatDate(order.datetime)}
                                </p>
                            </div>
                            <div className="font-medium text-gray-900 flex justify-between md:block py-5">
                                <h3>Total amount</h3>
                                <p className="text-gray-600">
                                    {formatPrice(order.totalprice)}
                                </p>
                            </div>
                            <div className="font-medium text-gray-900 flex justify-between md:block py-5">
                                <h3>City</h3>
                                <p
                                    title={order.city}
                                    className="text-gray-600 truncate"
                                >
                                    {order.city}
                                </p>
                            </div>
                            <div className="font-medium text-gray-900 flex justify-between md:block py-5">
                                <h3>Address</h3>
                                <p
                                    title={order.address}
                                    className="text-gray-600 truncate"
                                >
                                    {order.address}
                                </p>
                            </div>
                        </div>

                        {/* table */}
                        <div className="flex flex-col w-full divide-y border-b pt-10">
                            <div className="grid grid-cols-4 md:grid-cols-7 text-left text-sm text-gray-500 pb-4">
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
                                    className="text-left text-sm text-gray-500 grid grid-cols-4 md:grid-cols-7 items-center"
                                >
                                    <div className="pl-2 flex items-center gap-5 font-medium text-gray-900 pr-8 py-5 col-span-3">
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-16 rounded"
                                        />
                                        <div className="flex flex-col gap-2 truncate underline">
                                            <Link
                                                to={`/products/${product.id}`}
                                                title={product.title}
                                                className="truncate"
                                            >
                                                {product.title}
                                            </Link>
                                            <span className="font-normal text-sm text-gray-500 md:hidden">
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
        </>
    );
}
