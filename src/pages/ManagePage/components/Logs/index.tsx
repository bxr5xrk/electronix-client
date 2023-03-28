import CenterSpinner from '@/components/Spinner/CenterSpinner';
import { useGetLogs } from '@/features/users/usersService';
import { cl, formatDate } from '@/utils/index';

export default function LogsPage() {
    const { data, isLoading, isFetching } = useGetLogs({});

    return (
        <section className="px-4 w-full h-full flex justify-center">
            <div className="w-full max-w-5xl space-y-12">
                {isLoading || isFetching ? <CenterSpinner /> : null}

                {data?.map((log) => (
                    <div key={log.id} className="w-full">
                        <div className="rounded-lg bg-gray-50 px-4 flex text-sm font-medium text-gray-900 flex-col justify-between py-5">
                            <h3>Log date</h3>
                            <p className="text-gray-600 whitespace-nowrap">
                                {formatDate(log.datetime)}
                            </p>
                        </div>

                        <div className="flex flex-col w-full divide-y border-b pt-5">
                            <div className="md:grid hidden grid-cols-5 text-left text-sm text-gray-500 pb-4">
                                <p className="pl-2 font-normal px-3 col-span-2">
                                    User
                                </p>
                                <p className="font-normal px-3 col-span-2">
                                    Product
                                </p>
                                <p className="font-normal px-3">Action</p>
                            </div>

                            <div className="text-left text-sm text-gray-500 grid grid-rows-3 md:grid-rows-1 md:grid-cols-5 items-center">
                                <p className="py-3 px-3 truncate text-primary-500 capitalize font-semibold col-span-2">
                                    {log.user_name}
                                </p>
                                <p className="font-normal py-3 px-3 truncate col-span-2">
                                    {log.product_name}
                                </p>
                                <p className="py-3 px-3 capitalize">
                                    <span
                                        className={cl(
                                            log.action === 'add'
                                                ? 'text-green-800 bg-green-100'
                                                : 'text-red-800 bg-red-100',
                                            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium'
                                        )}
                                    >
                                        {log.action}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
