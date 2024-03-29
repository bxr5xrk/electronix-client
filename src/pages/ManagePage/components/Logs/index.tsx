import CenterSpinner from '@/components/Spinner/CenterSpinner';
import { useGetLogs } from '@/features/users/usersService';
import { cl, formatDate } from '@/utils/index';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function LogsPage() {
    const { data, isLoading, isFetching } = useGetLogs({});

    return (
        <section className="px-4 py-10 w-full h-full flex justify-center">
            <div className="w-full max-w-5xl space-y-12">
                {isLoading || isFetching ? <CenterSpinner /> : null}

                {data?.map((log) => (
                    <div key={log.id} className="w-full">
                        <div className="rounded-lg bg-gray-50 dark:bg-normal-700 px-4 text-sm font-medium py-5 flex justify-between items-center">
                            <p className="text-gray-600 dark:text-normal-300 whitespace-nowrap">
                                {formatDate(log.datetime)}
                            </p>
                            <span
                                className={cl(
                                    log.action === 'add'
                                        ? 'text-green-800 bg-green-100'
                                        : 'text-red-800 bg-red-100',
                                    'md:hidden flex justify-center items-center rounded-full w-7 h-7 text-xs font-medium'
                                )}
                            >
                                {log.action === 'add' ? (
                                    <PlusIcon className="w-5 h-5" />
                                ) : (
                                    <MinusIcon className="w-5 h-5" />
                                )}
                            </span>
                        </div>

                        <div className="flex flex-col w-full dark:divide-gray-500 dark:border-gray-500 divide-y border-b pt-5">
                            <div className="md:grid hidden grid-cols-5 text-left text-sm text-gray-500 dark:text-normal-300 pb-4">
                                <p className="pl-2 font-normal px-3 col-span-2">
                                    User
                                </p>
                                <p className="font-normal px-3 col-span-2">
                                    Product
                                </p>
                                <p className="font-normal px-3">Action</p>
                            </div>

                            <div className="text-left text-sm text-gray-500 dark:text-normal-300 grid grid-rows-2 md:grid-rows-1 md:grid-cols-5 items-center">
                                <p className="py-3 px-3 truncate text-primary-500 capitalize font-semibold col-span-2">
                                    {log.user_name}
                                </p>
                                <p className="font-normal py-3 px-3 truncate col-span-2">
                                    {log.product_name}
                                </p>
                                <p className="hidden md:block py-3 px-3 capitalize">
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
