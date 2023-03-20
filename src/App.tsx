import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { Suspense } from 'react';
import CenterSpinner from './components/Spinner/CenterSpinner';
import { useAppSelector } from './app/store';
import { selectAuth } from './features/auth/authSlice';

function App() {
    const { user } = useAppSelector(selectAuth);

    return (
        <>
            <Suspense fallback={<CenterSpinner />}>
                <RouterProvider router={routes(user)} />
            </Suspense>
        </>
    );
}

export default App;
