import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

import ProductsPage from './pages/ProductsPage';
const CartPage = lazy(async () => await import('./pages/CartPage'));
const WishListPage = lazy(async () => await import('./pages/WishListPage'));
const ProductPage = lazy(async () => await import('./pages/ProductPage'));

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <ProductsPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'wish-list',
                element: <WishListPage />
            },
            {
                path: 'products/:id',
                element: <ProductPage />
            }
        ]
    }
]);
