import { useGetOrders } from '@/features/order/orderService';
import { formatDate, formatPrice } from '@/utils/index';
import { Link } from 'react-router-dom';

export default function ManageOrders() {
    const { data } = useGetOrders({});

    if (!data) {
        return <></>;
    }

    return (
        <main className="w-full flex justify-center pb-24 pt-8 sm:px-6 sm:pt-16 lg:px-8 ">
            <div className="space-y-10 w-full sm:w-fit">
                {data.map((order) => (
                    <div key={order.id}>
                        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Order #{order.id}
                            </h1>

                            <p className="text-sm text-gray-600 dark:text-gray-500">
                                Order placed{' '}
                                <time
                                    dateTime="2021-03-22"
                                    className="font-medium"
                                >
                                    {formatDate(order.datetime)}
                                </time>
                            </p>
                        </div>

                        <div className="mt-6 space-y-10 p-4 border-b border-t dark:border-gray-500 shadow-sm sm:rounded-lg sm:border">
                            <section className="flex gap-4 sm:flex-row flex-col justify-between text-sm">
                                <div className="text-center gap-2 flex sm:flex-col">
                                    <dt className="font-medium">
                                        Delivery address
                                    </dt>
                                    <dd className="text-gray-400">
                                        <span className="block">
                                            {order.address}
                                        </span>
                                    </dd>
                                </div>
                                <div className="text-center gap-2 flex sm:flex-col">
                                    <dt className="font-medium white">
                                        Shipping city
                                    </dt>
                                    <dd className="space-y-3 text-gray-400">
                                        <p>{order.city}</p>

                                        {/* <button
                                        type="button"
                                        className="font-medium text-primary-400 hover:text-indigo-500"
                                    >
                                        Edit
                                    </button> */}
                                    </dd>
                                </div>
                                <div className="text-center gap-2 flex sm:flex-col">
                                    <dt className="font-medium">Total price</dt>
                                    <dd className="text-gray-400">
                                        <span className="block">
                                            {formatPrice(order.totalprice)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="text-center gap-2 flex sm:flex-col">
                                    <dt className="font-medium">
                                        Order status
                                    </dt>
                                    <dd className="text-gray-400">
                                        <span className="block">
                                            {order.status}
                                        </span>
                                    </dd>
                                </div>
                            </section>
                            <section className="space-y-5 col-span-2">
                                {data[0].products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="relative flex items-center space-x-3 rounded-lg border dark:border-gray-700 px-6 py-5 shadow-sm"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10"
                                                src={product.images[0]}
                                                alt=""
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="focus:outline-none space-y-2"
                                            >
                                                <p className="truncate text-sm font-medium">
                                                    {product.title}
                                                </p>
                                                <p className="truncate text-sm text-gray-400">
                                                    {product.count}{' '}
                                                    {product.count === 1
                                                        ? 'item'
                                                        : 'items'}
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
