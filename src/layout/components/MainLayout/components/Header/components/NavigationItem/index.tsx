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
                'relative flex items-center gap-2 hover:text-indigo-500 transition',
                pathname === link ? 'text-indigo-600' : 'text-gray-900',
                isMobileView
                    ? '-mx-3 w-full bloc  rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-gray-50'
                    : 'text-sm font-semibold leading-6 '
            )}
        >
            <span>{label}</span>
            {icon}

            {count !== undefined ? (
                <span
                    className={cl(
                        pathname === link
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-gray-100 text-gray-900',
                        'rounded-full p-0.5 w-6 h-6 flex items-center justify-center text-xs font-medium'
                    )}
                >
                    {count}
                </span>
            ) : null}
        </button>
    );
}

export default memo(NavigationItem);
