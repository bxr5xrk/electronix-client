import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function Layout() {
    return (
        <div className="font-montserrat p-3 min-w-full min-h-full w-full h-full flex flex-col gap-3">
            <Header />

            <Outlet />
        </div>
    );
}
