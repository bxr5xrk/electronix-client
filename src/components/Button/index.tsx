import type { ReactNode } from 'react';
import { cl } from '../../utils/cl';

interface ButtonProps {
    children: ReactNode;
    type: 'primary' | 'white';
    fullWidth?: boolean;
    rounded?: 'full' | 'r' | 'l' | 'bl' | 'br';
    onClick: () => void;
}

export default function Button({
    children,
    type,
    fullWidth,
    rounded,
    onClick
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cl(
                'flex uppercase items-center justify-center p-2 gap-2 cursor-pointer border truncate',
                fullWidth === true ? 'w-full' : 'w-fit',
                typeof rounded === 'string'
                    ? `rounded-${rounded}-lg`
                    : 'rounded-lg',
                type === 'primary'
                    ? 'bg-indigo-500 border-indigo-500 text-white'
                    : 'bg-white text-black'
            )}
        >
            {children}
        </button>
    );
}
