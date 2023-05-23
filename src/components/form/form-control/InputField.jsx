/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

function InputField({ name, label, control, defaultValues, disabled, isPassword }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValues}
            render={({ field, formState }) => {
                const { errors } = formState;
                return (
                    <>
                        <TextField
                            fullWidth
                            autoComplete={isPassword ? 'new-password' : 'fullName'}
                            type={isPassword ? 'password' : 'text'}
                            label={label}
                            onChange={(data) => field.onChange(data)}
                            value={field.value}
                            disabled={disabled}
                            error={Boolean(errors[name])}
                            helperText={Boolean(errors[name]) && errors[name].message}
                        />
                    </>
                );
            }}
        />
    );
}

export default InputField;
