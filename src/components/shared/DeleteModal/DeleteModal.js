import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Modal from '#shared/Modal';

const useStyles = makeStyles(theme => ({
    deleteTitle: {
        color: theme.palette.tertiaryColor,
    },
    deleteTitleContainer: {
        backgroundColor: theme.palette.quaternaryColor,
        border: `2px solid ${theme.palette.tertiaryColor}`,
        padding: theme.spacing(2),
    },
}));

const DeleteModal = ({
    children,
    handleClose,
    handleSubmit,
    loading,
    open,
    title,
    ...rest
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <Modal
        {...rest}
        actionTitle='delete'
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loading}
        open={open}
        title='Delete type'
    >
        <Box className={classes.deleteTitleContainer}>
            <Typography className={classes.deleteTitle} variant='body1'>
                Are you sure you want to delete '{title}'?
            </Typography>
        </Box>
        {children}
    </Modal>
};

export default DeleteModal;