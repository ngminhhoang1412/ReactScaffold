/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */

import axiosClient from './axiosClient';
import { tokenKeyLocalStorage } from '../store/constant';

const authServices = {
    async login(data) {
        const response = await axiosClient.post(`users/login`, { email: data.email, password: data.password }).catch((error) => {
            return error;
        });
        localStorage.setItem(tokenKeyLocalStorage, response.token);
        return response;
    },
    logout() {
        localStorage.removeItem(tokenKeyLocalStorage);
    }
};

export default authServices;
