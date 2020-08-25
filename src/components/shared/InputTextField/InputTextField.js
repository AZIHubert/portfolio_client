import { useTheme } from '@material-ui/core/styles';
import React from 'react';

import FieldContainer from '#shared/FieldContainer';
import TextField from '#shared/TextField';

const InputTextField = ({
    autoFocus,
    error,
    helperText,
    disabled,
    label,
    minHeight,
    multiline,
    name,
    onChange,
    rows,
    value,
}) => {
    const theme = useTheme();
    
    return <FieldContainer disabled={disabled} label={label} minHeight={minHeight ? minHeight : 0}>
        <TextField
            autoFocus={autoFocus}
            backgroundColor={theme.palette.primaryColor}
            disabled={disabled}
            error={error}
            helperText={helperText}
            multiline={multiline}
            name={name}
            onChange={onChange}
            rows={multiline && rows ? rows : 8}
            value={value}
        />
    </FieldContainer>
};

export default InputTextField;