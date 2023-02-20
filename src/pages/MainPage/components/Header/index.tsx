import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <div className="flex items-center justify-between w-full">
            <p>count items</p>

            <Link
                className="flex items-center justify-center rounded-lg bg-primary-500 p-2"
                to="/watch-list"
            >
                <HeartIcon className="w-4 h-4 text-white" aria-hidden />
            </Link>
        </div>
    );
}
