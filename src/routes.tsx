import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

import MainPage from './pages/MainPage';
const CartPage = lazy(async () => await import('./pages/CartPage'));
const WishListPage = lazy(async () => await import('./pages/WishListPage'));

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
                path: 'wish-list',
                element: <WishListPage />
            }
        ]
    }
]);
