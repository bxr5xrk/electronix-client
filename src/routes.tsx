import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { type IUserAuth } from './features/auth/authInterfaces';
import Layout from './layout/components/MainLayout';
import UnauthenticatedLayout from './layout/components/UnauthenticatedLayout';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import Page404 from './pages/Page404';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/AuthPage/Login';
import RegisterPage from './pages/AuthPage/Register';
import WishlistPage from './pages/WishListPage';
const ManagePage = lazy(async () => await import('./pages/ManagePage'));
const ManageProducts = lazy(
    async () => await import('./pages/ManagePage/components/Products')
);
const ManageOrders = lazy(
    async () => await import('./pages/ManagePage/components/Orders')
);
const ManageUsers = lazy(
    async () => await import('./pages/ManagePage/components/Users')
);
const LogsPage = lazy(
    async () => await import('./pages/ManagePage/components/Logs')
);

export const routes = (user: IUserAuth | null) =>
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
                    element: <WishlistPage />
                },
                {
                    path: 'products/:id',
                    element: <ProductPage />
                },
                {
                    path: 'history',
                    element: <HistoryPage />
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
                            path: 'orders',
                            element:
                                user?.role !== 'client' ? (
                                    <ManageOrders />
                                ) : (
                                    <Navigate to="/manage" />
                                )
                        },
                        {
                            path: 'users',
                            element:
                                user?.role === 'admin' ? (
                                    <ManageUsers />
                                ) : (
                                    <Navigate to="/manage" />
                                )
                        },
                        {
                            path: 'logs',
                            element:
                                user?.role === 'admin' ? (
                                    <LogsPage />
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
