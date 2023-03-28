import { cl } from '@/utils/index';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationItemProps {
    link: string;
    label: string;
    onClick: (i: string) => void;
    count?: number;
    isMobileView?: boolean;
    icon?: JSX.Element;
}

function NavigationItem({
    link,
    label,
    count,
    isMobileView,
    icon,
    onClick
}: NavigationItemProps) {
    const { pathname } = useLocation();

    return (
        <button
            onClick={() => onClick(link)}
            className={cl(
                'relative flex items-center gap-2 hover:text-primary-500 transition text-normal-900 dark:text-normal-200 whitespace-nowrap',
                pathname === link
                    ? 'text-primary-600 dark:text-primary-600'
                    : 'hover:text-primary-600 dark:hover:text-primary-600',
                isMobileView
                    ? '-mx-3 w-full rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-normal-100 dark:hover:bg-normal-800'
                    : 'text-sm font-semibold leading-6'
            )}
        >
            <span>{label}</span>
            {icon}

            {count !== undefined ? (
                <span
                    className={cl(
                        pathname === link
                            ? 'dark:bg-normal-700 bg-normal-200'
                            : 'bg-normal-200 dark:bg-normal-700',
                        'rounded-full p-0.5 w-6 h-6 flex items-center justify-center text-xs font-medium dark:text-normal-200 text-normal-800'
                    )}
                >
                    {count}
                </span>
            ) : null}
        </button>
    );
}

export default memo(NavigationItem);
