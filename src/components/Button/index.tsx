import { cl } from '@/utils/index';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface ButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: ReactNode;
    theme: 'primary' | 'white';
    fullWidth?: boolean;
    onClick: () => void;
    title?: string;
}

export default function Button({
    children,
    theme,
    fullWidth,
    onClick,
    title,
    ...props
}: ButtonProps) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={cl(
                'relative flex transition items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200 truncate',
                fullWidth === true ? 'w-full' : 'w-fit',
                theme === 'primary'
                    ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            )}
            {...props}
        >
            {children}
        </button>
    );
}
