import { cl } from '@/utils/index';
import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    type: 'primary' | 'white';
    fullWidth?: boolean;
    rounded?: string;
    onClick: () => void;
    title?: string;
}

export default function Button({
    children,
    type,
    fullWidth,
    rounded,
    onClick,
    title
}: ButtonProps) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={cl(
                'flex uppercase items-center justify-center p-2 gap-2 cursor-pointer border truncate',
                fullWidth === true ? 'w-full' : 'w-fit',
                rounded,
                type === 'primary'
                    ? 'bg-indigo-500 border-indigo-500 text-white'
                    : 'bg-white text-black'
            )}
        >
            {children}
        </button>
    );
}
