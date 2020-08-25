import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
    disabled: {
        opacity: 0.5,
    },
    errorText: {
        color: '#de2618',
        fontSize: '0.8rem',
        '&::selection': {
            backgroundColor: '#de2618',
            color: theme.palette.primaryColor,
        },
    },
    label: {
        color: theme.palette.tertiaryColor,
        fontSize: '1rem',
        transition: '0.5s ease',
        '&::selection': {
            backgroundColor: theme.palette.tertiaryColor,
            color: theme.palette.primaryColor,
        },
        '&.active': {
            color: theme.palette.secondaryColor,
            '&::selection': {
                backgroundColor: theme.palette.secondaryColor,
                color: theme.palette.primaryColor,
            }
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
    },
    textField: {
        backgroundColor: props =>( !!props.backgroundColor && props.backgroundColor.trim() !== undefined) ?
            props.backgroundColor :
            'transparent',
        borderBottom: `1px solid ${theme.palette.tertiaryColor}`,
        borderLeft: `1px solid ${theme.palette.tertiaryColor}`,
        borderRight: `1px solid ${theme.palette.tertiaryColor}`,
        borderTop: `1px solid ${theme.palette.tertiaryColor}`,
        borderRadius: 0,
        boxSizing: 'boderBox',
        color: theme.palette.tertiaryColor,
        fontFamily: 'FedraSansStdBold',
        fontSize: '1rem',
        padding: theme.spacing(1.65, 1.3),
        resize: 'none',
        transition: '0.3s ease',
        '&:focus': {
            borderBottom: `1px solid ${theme.palette.secondaryColor}`,
            borderLeft: `5px solid ${theme.palette.secondaryColor}`,
            borderRight: `1px solid ${theme.palette.secondaryColor}`,
            borderTop: `1px solid ${theme.palette.secondaryColor}`,
            borderRadius: 0,
            color: theme.palette.secondaryColor,
            outline: 0,
            '&::selection': {
                backgroundColor: theme.palette.secondaryColor,
                color: theme.palette.primaryColor,
            },
        },
        '&::selection': {
            backgroundColor: theme.palette.tertiaryColor,
            color: theme.palette.primaryColor,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
            padding: theme.spacing(1, 1),
        },
    },
}));

const TextField = props => {
    const classes = useStyles(props);

    const {
        backgroundColor,
        disabled,
        error,
        helperText,
        label,
        labelJustification,
        marginBottom,
        marginTop,
        multiline,
        name,
        onChange,
        rows,
        value,
        type,
        ...rest
    } = props;

    const [focused, setFocused] = useState(false);
    const handleBlur = () => setFocused(false);
    const handleFocused = () => setFocused(true);

    return <Box
        className={clsx({
            [classes.disabled]: disabled
        })}
        display='flex'
        flexDirection='column'
        marginBottom={marginBottom}
        marginTop={marginTop}
    >
        {!!label && <Box
            display='flex'
            justifyContent={(!!labelJustification && labelJustification.trim() !== '') ? labelJustification : 'flex-start'}
            marginBottom={0.5}
        >
            <label className={clsx(classes.label, {
                ['active']: focused
            })} htmlFor={name}>
                {label}
            </label>
        </Box>}
        {multiline ? <textarea
            {...rest}
            className={classes.textField}
            name={name}
            onBlur={handleBlur}
            onFocus={handleFocused}
            onChange={onChange}
            rows={!!rows ? rows : 10}
            value={value}
        /> : <input
            {...rest}
            className={classes.textField}
            disabled={disabled}
            name={name}
            onBlur={handleBlur}
            onFocus={handleFocused}
            onChange={onChange}
            type='text'
            value={value}
            type={!!type && type.trim() !== '' ? type : 'text'}
        />}
        {!!error && <Box marginTop={0.5}>
            <Typography className={classes.errorText} variant='body1'>
                {helperText}
            </Typography>
        </Box>}
    </Box>
};

export default TextField;
