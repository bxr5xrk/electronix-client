import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { Suspense } from 'react';
import CenterSpinner from './components/Spinner/CenterSpinner';

function App() {
    return (
        <>
            <Suspense fallback={<CenterSpinner />}>
                <RouterProvider router={routes} />
            </Suspense>
        </>
    );
}

export default App;
