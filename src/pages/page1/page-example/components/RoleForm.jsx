/* eslint-disable react/prop-types */
import { useState } from 'react';
// material
import { Stack, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// form controls
import InputField from '../../../../components/form/form-control/InputField';
import SelectMultiField from '../../../../components/form/form-control/SelectMultiField';

// ----------------------------------------------------------------------

export default function RoleForm({ onFormSubmit, selectedData, initData }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    //   ---------------------- setup hook form ----------------------
    const getInitPermissions = () => {
        if (selectedData && selectedData.permissions) {
            const initPermissions = [];
            const permissionsOfSelected = [];
            selectedData.permissions.map((item) => permissionsOfSelected.push(item.id));
            permissionsOfSelected?.map((x) =>
                initData.permissions.map((y, index) => {
                    if (y.id === x) {
                        initPermissions.push(initData.permissions[index]);
                    }
                    return 0;
                })
            );
            return initPermissions;
        }
        return [];
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required')
    });
    const defaultValues = {
        name: selectedData ? selectedData.name : '',
        description: selectedData ? selectedData.description : '',
        permissions: getInitPermissions()?.map((item) => item)
    };
    const formOptions = {
        defaultValues: { ...defaultValues },
        resolver: yupResolver(validationSchema)
    };
    const { handleSubmit, control } = useForm(formOptions);

    async function onSubmit(data) {
        if (selectedData) {
            data.id = selectedData.id;
        }
        data.permission = data.permission.map((item) => item.id);
        setIsSubmitting(true);
        onFormSubmit(data);
    }
    //   -------------------------------------------------------------

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="name" label="Name" control={control} />
                <InputField name="description" label="Description" control={control} />
                <SelectMultiField
                    name="permission"
                    label="Permission"
                    control={control}
                    selectData={initData.permissions}
                    defaultValues={defaultValues.permissions}
                />
            </Stack>

            <LoadingButton
                sx={{ marginTop: '1rem' }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator={<CircularProgress color="inherit" size={16} />}
            >
                Submit
            </LoadingButton>
        </form>
    );
}
