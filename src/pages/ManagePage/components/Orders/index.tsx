/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/app/store';
import Select from '@/components/Select';
import CenterSpinner from '@/components/Spinner/CenterSpinner';
import { setNotification } from '@/features/notification/notificationSlice';
import type { Status } from '@/features/order/orderInterfaces';
import { useGetOrders, useUpdateStatus } from '@/features/order/orderService';
import { formatDate, formatPrice } from '@/utils/index';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const statusList: Status[] = ['processing', 'shipped', 'delivered'];

const pollingInterval = 60000; // 1m

export default function ManageOrders() {
    const dispatch = useAppDispatch();
    const { data, isFetching } = useGetOrders({}, { pollingInterval });
    const [onUpdate, { isLoading }] = useUpdateStatus({});
    const [orderIdToUpdate, setOrderIdToUpdate] = useState<null | number>();

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

    const handleChangeStatus = async (orderId: number, status: string) => {
        setOrderIdToUpdate(orderId);

        const updateStatus = await onUpdate({
            orderId,
            status: status as Status
        });

        if (updateStatus) {
            dispatch(
                setNotification({
                    status: 'success',
                    message: 'Status updated!'
                })
            );
        }
    };

    return (
        <main className="w-full flex justify-center pb-24 pt-8 sm:px-6 sm:pt-16 lg:px-8 ">
            <div className="space-y-20 w-full sm:w-fit">
                {shortedOrders.map((order) => (
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
                                    <dd className="dark:text-gray-400 text-gray-600">
                                        {order.address}
                                    </dd>
                                </div>
                                <div className="text-center gap-2 flex sm:flex-col">
                                    <dt className="font-medium white">
                                        Shipping city
                                    </dt>
                                    <dd className="dark:text-gray-400 text-gray-600">
                                        {order.city}
                                    </dd>
                                </div>
                                <div className="text-center gap-2 flex sm:flex-col">
                                    <dt className="font-medium">Total price</dt>
                                    <dd className="dark:text-gray-400 text-gray-600">
                                        {formatPrice(order.totalprice)}
                                    </dd>
                                </div>

                                <Select
                                    id="product-category"
                                    value={order.status}
                                    setValue={async (i) =>
                                        await handleChangeStatus(order.id, i)
                                    }
                                    values={statusList}
                                    hideLabel
                                    isLoading={
                                        orderIdToUpdate === order.id
                                            ? isLoading || isFetching
                                            : false
                                    }
                                />
                            </section>
                            <section className="space-y-5 col-span-2">
                                {order.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="relative transition hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-3 rounded-lg border dark:border-gray-700 px-6 py-5 shadow-sm"
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
                                                <p className="truncate text-sm dark:text-gray-400 text-gray-600">
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
