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
    onClick?: () => void;
    title?: string;
}

export default function Button({
    children,
    theme,
    fullWidth,
    onClick = () => ({}),
    title,
    ...props
}: ButtonProps) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={cl(
                'relative flex transition items-center justify-center rounded-md border border-transparent py-2 px-8 text-sm font-medium whitespace-nowrap',
                fullWidth === true ? 'w-full' : 'w-fit',
                theme === 'primary'
                    ? 'bg-primary-100 dark:bg-primary-300 dark:text-primary-800 dark:hover:bg-primary-400 text-primary-800 hover:bg-primary-200'
                    : 'bg-normal-100 text-normal-800 hover:bg-normal-200 dark:bg-normal-300 dark:text-normal-800 dark:hover:bg-normal-400'
            )}
            {...props}
        >
            {children}
        </button>
    );
}
