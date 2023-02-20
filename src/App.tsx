import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { Suspense } from 'react';

function App() {
    return (
        <>
            <Suspense fallback={<></>}>
                <RouterProvider router={routes} />
            </Suspense>
        </>
    );
}

export default App;
