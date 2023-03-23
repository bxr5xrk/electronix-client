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
                    : 'opacity-50 translate-x-[105%]',
                'fixed transition-all top-2 sm:top-5 shadow-md rounded-lg border bg-white flex items-start justify-start space-x-4 p-2 max-w-xs sm:max-w-sm w-full right-2 sm:right-5'
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
                <p className="text-sm font-medium text-gray-900">
                    {notification
                        ? notification.status === 'success'
                            ? 'Success!'
                            : 'Error('
                        : ''}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    {notification ? notification.message : ''}
                </p>
            </div>

            <button
                onClick={() => dispatch(resetNotification())}
                type="button"
                className="flex-shrink-0 inline-flex rounded-md text-gray-500 hover:text-gray-500 focus:outline-none"
            >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );
}

export default memo(Notification);
