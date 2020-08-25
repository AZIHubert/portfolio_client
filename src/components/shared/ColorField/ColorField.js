import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';

import FieldContainer from '#shared/FieldContainer';

import 'react-datepicker/dist/react-datepicker.css';
import ColorPicker from './ColorPicker';

const useStyles = makeStyles(theme => ({
    button: {
        padding: 0,
        borderRadius: '50%',
        width: 30,
        minWidth: 30,
        height: 30,
        cursor: 'pointer',
        border: `2px solid ${theme.palette.tertiaryColor}`,
        backgroundColor: props => props.color,
        '&:hover': {
            backgroundColor: props => props.color,
        },
        '&.disabled': {
            opacity: 0.5,
            cursor: 'auto'
        }
    },
}));

const ColorField = props => {

    const classes = useStyles(props);
    const { color, handleColor, resetColor, initialColor, disabled, label, minHeight } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => { if(!disabled) setOpen(true) };
    const handleClose = () => setOpen(false);

    return <FieldContainer disabled={disabled} label={`${label} (${color})`} minHeight={minHeight ? minHeight : 175}>
        <Box onClick={handleOpen} className={clsx(classes.button, {
            ['disabled']: disabled
        })} />
        {(open && !disabled) && <ColorPicker
            color={color}
            handleClose={handleClose}
            handleColor={handleColor}
            initialColor={initialColor}
            resetColor={resetColor}
        />}
    </FieldContainer>
};

export default ColorField;