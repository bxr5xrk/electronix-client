import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function GoBackLink() {
    return (
        <Link
            className="text-normal-600 dark:text-normal-300 dark:hover:text-normal-500 transition hover:text-gray-800"
            to="/"
        >
            <ArrowLeftIcon className="h-5 w-5 flex-shrink-0" aria-hidden />
        </Link>
    );
}
