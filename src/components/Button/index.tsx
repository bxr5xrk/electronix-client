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
    rounded?: string;
    onClick: () => void;
    title?: string;
}

export default function Button({
    children,
    theme,
    fullWidth,
    rounded,
    onClick,
    title,
    ...props
}: ButtonProps) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={cl(
                'flex uppercase items-center justify-center p-2 gap-2 cursor-pointer border truncate',
                fullWidth === true ? 'w-full' : 'w-fit',
                rounded,
                theme === 'primary'
                    ? 'bg-indigo-500 border-indigo-500 text-white'
                    : 'bg-white text-black'
            )}
            {...props}
        >
            {children}
        </button>
    );
}
