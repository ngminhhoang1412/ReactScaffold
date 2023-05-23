/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { MenuItem, FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';

function SelectField({ name, label, control, selectData, nameField, valueField }) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={selectData[0]}
            render={({ field, formState }) => {
                const { errors } = formState;

                return (
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            id="input_designationselected"
                            style={{ backgroundColor: 'white', paddingRight: '8px', fontWeight: 'bold' }}
                        >
                            {label}
                        </InputLabel>
                        <Select
                            defaultValue={[]}
                            value={field.value}
                            onChange={(data) => field.onChange(data)}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            MenuProps={MenuProps}
                        >
                            {selectData.map((item, index) => (
                                <MenuItem key={index} value={valueField ? item[valueField] : item}>
                                    {nameField ? item[nameField] : item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            }}
        />
    );
}

export default SelectField;
