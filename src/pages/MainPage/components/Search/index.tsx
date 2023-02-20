import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Search() {
    return (
        <div className="flex items-center w-full relative shadow-md rounded-lg gap-2 p-1 px-2 border">
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden />

            <input
                className="p-1 flex flex-grow"
                type="text"
                placeholder="Search"
            />

            <XMarkIcon className="w-5 h-5" aria-hidden />
        </div>
    );
}
