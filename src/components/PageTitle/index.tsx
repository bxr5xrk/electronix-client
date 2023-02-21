import React from 'react';

interface PageTitleProps {
    title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <h1 className="w-full text-center p-3 text-black font-semibold text-3xl">
            {title}
        </h1>
    );
}
