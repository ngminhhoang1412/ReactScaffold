/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, Checkbox, ListItemText } from '@mui/material';
import { Controller } from 'react-hook-form';
import { dataNull } from '../../../store/constant';

function SelectMultiField({ name, label, control, selectData, defaultValues }) {
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
            defaultValue={defaultValues}
            render={({ field, formState }) => {
                const { errors } = formState;

                return (
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            id="mutiple-select-label"
                            style={{ backgroundColor: 'white', paddingRight: '8px', paddingLeft: '8px', fontWeight: 'bold' }}
                        >
                            {label}
                        </InputLabel>
                        <Select
                            {...field}
                            label={name}
                            labelId={name}
                            multiple
                            defaultValue={[]}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e);
                            }}
                            renderValue={(selected) => selected?.map((item) => (item.name === null ? 'null' : item.name)).join(', ')}
                            MenuProps={MenuProps}
                        >
                            {selectData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                    <ListItemIcon>
                                        <Checkbox checked={field.value.indexOf(option) > -1} />
                                    </ListItemIcon>
                                    <ListItemText primary={option.name ? option.name : `${dataNull}`} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            }}
        />
    );
}

export default SelectMultiField;
