import React from 'react';

export default function Pagination() {
    return (
        <div className="flex w-full justify-center items-center">
            {[1, 2, 3, 4, 5].map((page) => (
                <div className="flex items-center justify-center" key={page}>
                    {page}
                </div>
            ))}
        </div>
    );
}
