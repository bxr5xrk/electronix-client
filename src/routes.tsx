import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';
import CartPage from './pages/Cart';
import MainPage from './pages/MainPage';
import WatchListPage from './pages/WatchListPage';

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
