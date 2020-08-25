import { Box } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ChromePicker } from 'react-color';

import Button from '#shared/Button';

const useStyles = makeStyles(theme => ({
    cover: {
        background: '#000',
        bottom: '0px',
        left: '0px',
        opacity: 0.5,
        position: 'fixed',
        right: '0px',
        top: '0px',
        zIndex: 1399,
    },
    pickerButtonContainer: {
        marginTop: theme.spacing(1),
    },
    popover: {
        left: '50%',
        position: 'fixed',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1400,
        '& .chrome-picker': {
            borderRadius: '0 !important',
            boxShadow: 'none !important',
        }
    },
}));

const ColorPicker = ({ color, handleClose, handleColor, initialColor, resetColor }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <Box className={classes.popover}>
                <ChromePicker
                    color={color}
                    disableAlpha
                    onChangeComplete={handleColor}
                />
                {initialColor !== color && <div className={classes.pickerButtonContainer}>
                    <Button onClick={resetColor}>
                        Reset color
                    </Button>
                </div>}
                <Box className={classes.pickerButtonContainer}>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Box>
            <div className={classes.cover} onClick={handleClose}></div>
        </>
    );
};

export default ColorPicker;