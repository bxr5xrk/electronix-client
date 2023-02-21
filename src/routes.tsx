import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

const MainPage = lazy(async () => await import('./pages/MainPage'));
const CartPage = lazy(async () => await import('./pages/Cart'));
const WatchListPage = lazy(async () => await import('./pages/WatchListPage'));

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <MainPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'watch-list',
                element: <WatchListPage />
            }
        ]
    }
]);
