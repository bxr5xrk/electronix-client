import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function ManagePage() {
    return (
        <main className="flex flex-col w-full h-full">
            <Header />

            <Outlet />
        </main>
    );
}
