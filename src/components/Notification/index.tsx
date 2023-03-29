import { useAppDispatch, useAppSelector } from '@/app/store';
import {
    resetNotification,
    selectNotification
} from '@/features/notification/notificationSlice';
import { cl } from '@/utils/index';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { memo, useEffect } from 'react';

function Notification() {
    const dispatch = useAppDispatch();
    const { notification } = useAppSelector(selectNotification);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                dispatch(resetNotification());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div
            className={cl(
                notification
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-100 translate-x-[110%]',
                'fixed transition-all top-2 sm:top-5 shadow-md rounded-lg border dark:border-normal-800 bg-normal-50 dark:bg-normal-800 flex items-start justify-start space-x-4 p-2 max-w-xs sm:max-w-sm w-full right-2 sm:right-5'
            )}
        >
            <div className="flex-shrink-0 h-6 w-6 mt-0.5">
                {notification ? (
                    notification?.status === 'success' ? (
                        <CheckCircleIcon
                            className="h-6 w-6 text-green-400"
                            aria-hidden="true"
                        />
                    ) : (
                        <ExclamationCircleIcon
                            className="h-6 w-6 text-red-400"
                            aria-hidden="true"
                        />
                    )
                ) : null}
            </div>

            <div className="flex w-full flex-col h-10 flex-grow">
                <p className="text-sm font-medium text-normal-900 dark:text-normal-100">
                    {notification
                        ? notification.status === 'success'
                            ? 'Success!'
                            : 'Error('
                        : ''}
                </p>
                <p className="mt-1 text-sm text-normal-500 dark:text-normal-100">
                    {notification ? notification.message : ''}
                </p>
            </div>

            <button
                onClick={() => dispatch(resetNotification())}
                type="button"
                className="flex-shrink-0 inline-flex rounded-md text-normal-500 dark:text-normal-200 dark:hover:text-normal-600 hover:text-normal-800 focus:outline-none"
            >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );
}

export default memo(Notification);
