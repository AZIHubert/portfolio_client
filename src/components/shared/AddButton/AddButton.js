import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const useStyles = makeStyles(theme => ({
    createContainerInner: {
        alignItems: 'center',
        backgroundColor: theme.palette.tertiaryColor,
        border: `1px solid ${theme.palette.tertiaryColor}`,
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        transition: '0.5s',
        width: 40,
        '&:hover': {
            transform: 'rotate(180deg)',
            '& svg': {
                transform: 'scale(1.5)',
            }
        }
    },
    createContainerOuter: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: theme.spacing(1),
    },
    createIcon: {
        color: theme.palette.primaryColor,
        fontSize: '1.2rem',
        transition: '0.25s',
    },
}));

const AddButton = ({ onClick }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const handleClick = () => {
        if(onClick !== undefined) onClick();
    };

    return <Box className={classes.createContainerOuter}>
        <Box className={classes.createContainerInner} onClick={handleClick}>
            <AddIcon className={classes.createIcon} />
        </Box>
    </Box>
};

export default AddButton;
