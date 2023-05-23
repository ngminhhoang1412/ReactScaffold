import axiosClient from './axiosClient';
import { tokenKeyLocalStorage } from '../store/constant';

const SetupInterceptors = (navigate) => {
    axiosClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(tokenKeyLocalStorage);
            if (!token) {
                localStorage.removeItem(tokenKeyLocalStorage);
                navigate(`/auth/login`);
            } else {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                };
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosClient.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error?.response?.status === 401) {
                localStorage.removeItem(tokenKeyLocalStorage);
                navigate(`/auth/login`);
            }
            return Promise.reject(error.response.data);
        }
    );
};

export default SetupInterceptors;
