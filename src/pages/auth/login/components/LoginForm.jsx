import { useState } from 'react';

// material-ui
import { Box, Button, CircularProgress, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// third party
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../../components/form/form-control/InputField';
import PasswordField from '../../../../components/form/form-control/PasswordField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authServices from '../../../../services/authServices';
import {toast} from "react-toastify";

// ============================|| FIREBASE - LOGIN ||============================ //
const GridItem = styled(Grid)({
    '& .MuiFormControl-root ': {
        marginTop: '2rem'
    }
});
const FirebaseLogin = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    //   ---------------------- setup hook form ----------------------
    const validationSchema = Yup.object().shape({
        // formData
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string().required('Password is required')
    });
    const defaultValues = {
        email: '',
        password: ''
    };
    const formOptions = {
        defaultValues: { ...defaultValues },
        resolver: yupResolver(validationSchema)
    };
    const { handleSubmit, control } = useForm(formOptions);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await authServices.login(data);
            if (response.status.toString() !== 'success') throw new Error(response?.errors?.msg.toString() || 'Login failed');
            toast.success('Login success');
            navigate("/index");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsSubmitting(false);
    }
    //   -------------------------------------------------------------

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        textAlign: 'center',
                        '& .Mui-disabled': {
                            backgroundColor: '#2196f3 !important',
                            color: '#fff'
                        }
                    }}
                >
                    <Stack spacing={3}>
                        <Grid container spacing={2}>
                            <GridItem item xs={12} sm={12}>
                                <InputField name="email" label="Email" control={control} />
                            </GridItem>
                            <GridItem item xs={12} sm={12}>
                                <PasswordField name="password" label="Password" control={control} />
                            </GridItem>
                        </Grid>
                    </Stack>
                    <Button
                        variant="contained"
                        sx={{ marginTop: '1.5rem', marginBottom: '1rem', width: '200px', borderRadius: '12px' }}
                        fullWidth
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                Submit <CircularProgress color="inherit" size={16} sx={{ marginLeft: '5px' }} />
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default FirebaseLogin;
