import { useRoutes } from 'react-router-dom';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from '../config';
import useGuard from '../hooks/useGuard';
import Loadable from '../components/Loadable';
import { lazy } from 'react';
const Page1 = Loadable(lazy(() => import('../pages/page1/page-example')));
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // call hook => check auth
    useGuard();
    const routes = MainRoutes.children;
    routes.push(
        {
            path: '/item32',
            element: <Page1 />
        }
    );
    return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
