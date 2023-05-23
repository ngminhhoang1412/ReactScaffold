import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from '../components/Loadable';

const RegisterPage = Loadable(lazy(() => import('../pages/auth/register')));
const LoginPage = Loadable(lazy(() => import('../pages/auth/login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            path: '/auth/login',
            element: <LoginPage />
        },
        {
            path: '/auth/register',
            element: <RegisterPage />
        }
    ]
};

export default AuthenticationRoutes;
