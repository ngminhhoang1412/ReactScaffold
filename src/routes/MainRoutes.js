import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../components/Loadable';
// project imports
import MainLayout from '../components/layout/MainLayout';
const PageExample = Loadable(lazy(() => import('../pages/page1/page-example')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Navigate to="/index" replace />
        },
        {
            path: '/index',
            element: <PageExample />
        }
    ]
};

export default MainRoutes;
