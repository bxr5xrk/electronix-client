import { cl } from '@/utils/index';
import Spinner from '../Spinner';

interface SelectProps {
    label?: string;
    values?: string[];
    value: string;
    setValue: (i: string) => void;
    id: string;
    hideLabel?: boolean;
    isLoading?: boolean;
}

export default function Select({
    values,
    label,
    value,
    setValue,
    id,
    hideLabel,
    isLoading
}: SelectProps) {
    return (
        <div className="relative w-fit">
            {!hideLabel ? (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium leading-6"
                >
                    {label}
                </label>
            ) : null}

            {isLoading ? (
                <div className="absolute bottom-1 flex justify-center items-center h-8 bg-normal-900 right-1 left-1">
                    <Spinner />
                </div>
            ) : null}

            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id={id}
                name={id}
                className={cl(
                    hideLabel ? 'pr-4' : 'pr-10',
                    'capitalize cursor-pointer bg-white dark:bg-normal-900 dark:border-normal-700 outline-none h-10 border-2 rounded-md shadow-sm mt-2 block w-full py-1.5 pl-3 text-gray-90 sm:text-sm'
                )}
            >
                {values?.map((option) => (
                    <option className="capitalize" key={option} value={option}>
                        {option.replaceAll('_', ' ')}
                    </option>
                ))}
            </select>
        </div>
    );
}
