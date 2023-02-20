import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function Layout() {
    return (
        <div className="font-montserrat p-3 w-screen h-screen grid grid-rows-autoFr gap-3 max-w-full max-h-screen">
            <Header />

            <Outlet />
        </div>
    );
}
