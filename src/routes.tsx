import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { type IUser } from './features/auth/authInterfaces';
import Layout from './layout/components/MainLayout';
import UnauthenticatedLayout from './layout/components/UnauthenticatedLayout';

import ProductsPage from './pages/ProductsPage';
const CartPage = lazy(async () => await import('./pages/CartPage'));
const WishListPage = lazy(async () => await import('./pages/WishListPage'));
const ProductPage = lazy(async () => await import('./pages/ProductPage'));
const LoginPage = lazy(async () => await import('./pages/AuthPage/Login'));
const RegisterPage = lazy(
    async () => await import('./pages/AuthPage/Register')
);
const ManagePage = lazy(async () => await import('./pages/ManagePage'));
const ManageProducts = lazy(
    async () => await import('./pages/ManagePage/components/Products')
);
const ManageUsers = lazy(
    async () => await import('./pages/ManagePage/components/Users')
);
const Page404 = lazy(async () => await import('./pages/Page404'));
const OrderHistoryPage = lazy(
    async () => await import('./pages/OrderHistoryPage')
);

export const routes = (user: IUser | null) =>
    createBrowserRouter([
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
                },
                {
                    path: 'history',
                    element: (
                        // user ? (
                        <OrderHistoryPage />
                    )
                    // ) : (
                    // <Navigate to="/auth/login" />
                    // )
                },
                {
                    path: 'manage',
                    element: user ? (
                        <ManagePage />
                    ) : (
                        <Navigate to="/auth/login" />
                    ),
                    children: [
                        {
                            path: '',
                            element: <ManageProducts />
                        },
                        {
                            path: 'users',
                            element:
                                user?.role === 'admin' ? (
                                    <ManageUsers />
                                ) : (
                                    <Navigate to="/manage" />
                                )
                        }
                    ]
                },
                {
                    path: 'auth',
                    element:
                        user === null ? (
                            <UnauthenticatedLayout />
                        ) : (
                            <Navigate to="/" />
                        ),
                    children: [
                        { path: 'login', element: <LoginPage /> },
                        { path: 'register', element: <RegisterPage /> }
                    ]
                },
                {
                    path: '*',
                    element: <Page404 />
                }
            ]
        }
    ]);
