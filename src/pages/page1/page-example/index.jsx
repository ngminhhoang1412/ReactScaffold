/* eslint-disable react/button-has-type */
import { useState, useEffect } from 'react';

// Form
import RoleForm from './components/RoleForm';
import PageWithPagination from '../../common/PageWithPagination';

import adminServices from '../../../services/adminServices';

function Role() {
    // =================================== STATE ===================================
    const [permissions, setPermissions] = useState([]);

    // =================================== HOOKS ===================================
    useEffect(() => {
        // eslint-disable-next-line no-use-before-define
        getPermissions().then(() => {});
    }, []);

    // =================================== FUNCTIONS ===================================
    const getRoles = async (queryParams) => adminServices.getRoles(queryParams);
    const onCreateRole = async (event) => adminServices.addRole(event);
    const onEditRole = (event) => adminServices.updateRole(event);
    const onDeleteRole = async (event) => adminServices.deleteRole(event);
    const getPermissions = async () => {
        adminServices
            .getPermissions()
            .then((response) => {
                if (response?.status.toString() !== 'success') throw new Error('Get permission list failed');
                setPermissions([...response?.data]);
            })
            .catch((error) => {
                console.log('error :>> ', error);
            })
            .finally(() => {});
    };
    const tableStructure = {
        columns: ['Role', 'Permission', 'Description', 'Users'],
        values: [
            {
                style: 'None',
                fieldName: 'name'
            },
            {
                style: 'List',
                fieldName: 'permissions',
                listItemFieldName: 'name'
            },
            {
                style: 'None',
                fieldName: 'description'
            },
            {
                style: 'None',
                fieldName: 'count_user'
            }
        ]
    };

    return (
        <PageWithPagination
            actionForm={RoleForm}
            formInitData={{
                permissions
            }}
            title="Role"
            onAdd={onCreateRole}
            onUpdate={onEditRole}
            onDestroy={onDeleteRole}
            getDataList={getRoles}
            tableStructure={tableStructure}
            formSize="sm"
        />
    );
}

export default Role;
