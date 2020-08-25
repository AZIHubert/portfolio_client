import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React, { useState } from 'react';

import { useDeleteType } from '#graphql';
import AddTypeModal from '#shared/AddTypeModal';
import FormAlert from '#shared/FormAlert';
import DeleteModal from '#shared/DeleteModal';

const useStyles = makeStyles(theme => ({
    alertContainer: {
        backgroundColor: '#e68983',
        borderRadius: 50,
        padding: theme.spacing(1, 2),
    },
    alert: {
        color: theme.palette.primaryColor,
        fontSize: '1rem',
    },
    container: {
        background: theme.palette.quaternaryColor,
        borderRadius: 25,
        boxShadow: '2px 3px 5px rgba(0,0,0,0.3)',
        marginBottom: theme.spacing(0.8),
        marginRight: theme.spacing(0.8),
        overflow: 'hidden',
    },
    deleteContainer: {
        cursor: 'pointer',
        padding: theme.spacing(0, 0.7),
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),
        '&:hover': {
            backgroundColor: theme.palette.tertiaryColor,
            '& svg': {
                color: theme.palette.quaternaryColor,
            },
        },
    },
    icon: {
        color: theme.palette.tertiaryColor,
        fontSize: '1rem',
        transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),
    },
    title: {
        color: theme.palette.tertiaryColor,
        fontSize: '0.8rem',
        transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),
    },
    titleContainer: {
        cursor: 'pointer',
        padding: theme.spacing(0.4, 1),
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),
        '&:hover': {
            backgroundColor: theme.palette.tertiaryColor,
            '& p': {
                color: theme.palette.primaryColor,
            },
        },
    },
}));

const BackendWorksSingleType = ({ type }) => {

    const theme = useTheme();
    const classes = useStyles(theme);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);


    const [deleteType, { loading }] = useDeleteType({ typeId: type._id }, handleCloseDelete);

    return <Box
        alignItems='stretch'
        className={classes.container}
        display='flex'
    >
        <Box className={classes.titleContainer} onClick={handleOpenEdit}>
            <Typography className={classes.title} variant='body1'>
                {type.title}
            </Typography>
        </Box>
        <Box
            alignItems='center'
            className={classes.deleteContainer}
            display='flex'
            onClick={handleOpenDelete}
        >
            <DeleteOutlineIcon className={classes.icon} />
        </Box>
        <AddTypeModal
            handleClose={handleCloseEdit}
            initialType={type}
            open={openEdit}
        />
        <DeleteModal
            actionTitle='delete'
            handleClose={handleCloseDelete}
            handleSubmit={deleteType}
            loading={loading}
            open={openDelete}
            title={type.title}
        >
            {!!type.works.length && <Box
                display='flex'
                justifyContent='center'
                marginTop={4}
            >
                <FormAlert maxWidth='none'>
                    This type is associated with {type.works.length} work{type.works.length > 1 ? 's' : ''}.
                </FormAlert>
            </Box>}
        </DeleteModal>
    </Box>
};

export default BackendWorksSingleType;