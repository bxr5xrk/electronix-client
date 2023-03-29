import { forwardRef, memo } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';

interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    id: string;
    label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, id, ...props }, ref: Ref<HTMLInputElement>) => {
        return (
            <div>
                <label htmlFor={id} className="block text-sm font-medium mb-1">
                    {label}
                </label>

                <input
                    ref={ref}
                    {...props}
                    id={id}
                    className="block w-full dark:border-normal-700 dark:bg-normal-900 border-2 rounded-md shadow-sm p-2 dark:focus:border-primary-500 focus:border-primary-500 text-sm outline-none"
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default memo(Input);
