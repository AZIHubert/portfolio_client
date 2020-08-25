import { Checkbox } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import FieldContainer from '#shared/FieldContainer';

const useStyles = makeStyles(theme => ({
    checkbox: {
        '&.MuiCheckbox-colorPrimary': {
            '&.Mui-checked:hover': {
                backgroundColor: 'transparent'
            },
            '&.Mui-disabled': {
                opacity: 0.5
            },
        },
        '&.MuiButtonBase-root': {
            padding: theme.spacing(0),
        },
    }
}));

const CheckField = ({ checked, disabled, label, minHeight, name, onChange, ...rest }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <FieldContainer
        {...rest}
        disabled={disabled}
        label={label}
        minHeight={minHeight ? minHeight : 175}
    >
        <div>
            <Checkbox
                checked={checked}
                className={classes.checkbox}
                color='primary'
                disabled={disabled}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                name={name}
                onChange={onChange}
            />
        </div>
    </FieldContainer>
};

export default CheckField;