import Notification from '@/components/Notification';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function Layout() {
    return (
        <div className="font-montserrat p-3 pt-0 h-screen w-full flex flex-col gap-3 touch-pan-y overflow-x-hidden overflow-y-scroll bg-white dark:bg-slate-900">
            <Header />

            <Outlet />

            <Notification />
        </div>
    );
}
