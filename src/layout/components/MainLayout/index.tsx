import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function Layout() {
    return (
        <div className="font-montserrat p-3 pt-0 w-screen h-screen flex flex-col gap-3 touch-pan-y overflow-x-hidden overflow-y-scroll">
            <Header />

            <Outlet />
        </div>
    );
}
