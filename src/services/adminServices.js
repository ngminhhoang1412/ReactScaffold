/* eslint-disable spaced-comment */
import axiosClient from './axiosClient';

const dashboardServices = {
    getListUser(params) {
        if (!params) {
            return axiosClient.get('users');
        }
        const paramString = {};
        Object.keys(params).forEach((item) => {
            paramString[item] = params[item];
        });
        const qs = Object.keys(paramString)
            // eslint-disable-next-line arrow-body-style
            .map((key) => {
                return `${key}=${paramString[key]}`;
            })
            .join('&');
        return axiosClient.get(`users?${qs}`);
    },
    createUserAccount(data) {
        return axiosClient.post('users/register', {
            email: data.email,
            name: data.name,
            password: data.password,
            role_id: data.role
        });
    },
    updateUserAccount(data) {
        return axiosClient.put(`users/${data.id}`, {
            email: data.email,
            name: data.name,
            password: data.password,
            role_id: data.role
        });
    },
    deleteUser(data) {
        return axiosClient.delete(`users/${data.id}`);
    },
    getPermissions() {
        return axiosClient.get('permissions');
    },
    updateRole(data) {
        return axiosClient.put(`roles/${data.id}`, {
            name: data.name,
            description: data.description,
            permission_ids: data.permission
        });
    },
    getRoles(params) {
        if (!params) {
            return axiosClient.get('roles');
        }
        const paramString = {};
        Object.keys(params).forEach((item) => {
            paramString[item] = params[item];
        });
        const qs = Object.keys(paramString)
            // eslint-disable-next-line arrow-body-style
            .map((key) => {
                return `${key}=${paramString[key]}`;
            })
            .join('&');
        return axiosClient.get(`roles?${qs}`);
    },
    deleteRole(data) {
        return axiosClient.delete(`roles/${data.id}`);
    },
    addRole(data) {
        return axiosClient.post('roles', {
            name: data.name,
            description: data.description,
            permission_ids: data.permission
        });
    }
};

export default dashboardServices;
