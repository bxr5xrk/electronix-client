/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from '@/app/store';
import Select from '@/components/Select';
import { setNotification } from '@/features/notification/notificationSlice';
import { type Status } from '@/features/order/orderInterfaces';
import { useGetOrders, useUpdateStatus } from '@/features/order/orderService';
import { formatPrice } from '@/utils/index';
import { useState } from 'react';

interface StatsProps {
    address: string;
    city: string;
    totalPrice: number;
    status: Status;
    orderId: number;
}

const pollingInterval = 60000; // 1m

const statusList: Status[] = ['processing', 'shipped', 'delivered'];

export default function Stats({
    address,
    city,
    totalPrice,
    orderId,
    status
}: StatsProps) {
    const dispatch = useAppDispatch();
    const { isFetching } = useGetOrders({}, { pollingInterval });
    const [onUpdate, { isLoading }] = useUpdateStatus({});
    const [orderIdToUpdate, setOrderIdToUpdate] = useState<null | number>();

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
        <section className="flex gap-4 sm:flex-row flex-col justify-between text-sm">
            <div className="text-center gap-2 flex sm:flex-col">
                <dt className="font-medium">Delivery address</dt>
                <dd className="dark:text-gray-400 text-gray-600">{address}</dd>
            </div>
            <div className="text-center gap-2 flex sm:flex-col">
                <dt className="font-medium white">Shipping city</dt>
                <dd className="dark:text-gray-400 text-gray-600">{city}</dd>
            </div>
            <div className="text-center gap-2 flex sm:flex-col">
                <dt className="font-medium">Total price</dt>
                <dd className="dark:text-gray-400 text-gray-600">
                    {formatPrice(totalPrice)}
                </dd>
            </div>

            <Select
                id="order-status"
                value={status}
                setValue={async (i) => await handleChangeStatus(orderId, i)}
                values={statusList}
                hideLabel
                isLoading={
                    orderIdToUpdate === orderId
                        ? isLoading || isFetching
                        : false
                }
            />
        </section>
    );
}
