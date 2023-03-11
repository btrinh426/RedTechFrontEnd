import React from 'react';
import { FieldProps } from 'formik';
import { TextField } from '@mui/material';

interface Props extends FieldProps {
    label: string;
    placeholder: string;
}

export const MyField: React.FC<Props> = ({ label, placeholder, field }) => {
    return (
        <TextField 
            label={label}
            placeholder={placeholder}
            {...field}
        />
    );
};

export default MyField;