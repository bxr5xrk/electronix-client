import { formatDate } from '@/utils/index';

interface HeaderProps {
    id: number;
    datetime: string;
}

export default function Header({ id, datetime }: HeaderProps) {
    return (
        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Order #{id}
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-500">
                Order placed{' '}
                <time dateTime="2021-03-22" className="font-medium">
                    {formatDate(datetime)}
                </time>
            </p>
        </div>
    );
}
