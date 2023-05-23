import { useLocation, useNavigate } from 'react-router-dom';
import { tokenKeyLocalStorage } from '../store/constant';

const useGuard = () => {
    const token = localStorage.getItem(tokenKeyLocalStorage);
    const navigate = useNavigate();
    const location = useLocation();
    const URLS = ['/auth/login'];
    if (!token) {
        if (!URLS.includes(location.pathname)) {
            localStorage.removeItem(tokenKeyLocalStorage);
            navigate(`/auth/login`);
        }
    }
};

export default useGuard;
