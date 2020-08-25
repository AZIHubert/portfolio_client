import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React, { useState } from 'react';

import { useDeleteWorkshop } from '#graphql';
import AddWorkshopModal from '#shared/AddWorkshopModal';
import BackendSingleItem from '#shared/BackendSingleItem';
import DeleteModal from '#shared/DeleteModal';

const useStyles = makeStyles(theme => ({
    year: {
        color: 'inherit',
        fontSize: '1.1rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem',
        },
    },
}));

const BackendAboutSingleWorkshop = ({ workshop }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const variables_delete = { workshopId: workshop._id };
    const onSuccess_delete = () => handleCloseDelete();
    const [deleteWorkshop, { loading }] = useDeleteWorkshop(variables_delete, onSuccess_delete);

    return <>
        <BackendSingleItem
            boxShadow
            deleteIcon
            handleOpenDelete={handleOpenDelete}
            handleOpenEdit={handleOpenEdit}
            title={workshop.artist}
        >
            <Typography className={classes.year} variant='body1'>
                {workshop.year}
            </Typography>
        </BackendSingleItem>
        <AddWorkshopModal
            handleClose={handleCloseEdit}
            initialWorkshop={workshop}
            open={openEdit}
        />
        <DeleteModal
            actionTitle='delete'
            handleClose={handleCloseDelete}
            handleSubmit={deleteWorkshop}
            loading={loading}
            open={openDelete}
            title={workshop.artist}
        />
    </>
};

export default BackendAboutSingleWorkshop;