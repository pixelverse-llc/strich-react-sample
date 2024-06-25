import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home.tsx';
import Single from './pages/single.tsx';
import Repeated from './pages/repeated.tsx';
import Multiple from './pages/multiple.tsx';

import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/single',
        element: <Single/>
    },
    {
        path: '/repeated',
        element: <Repeated/>
    },
    {
        path: '/multiple',
        element: <Multiple/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
