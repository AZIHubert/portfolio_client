import { Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useDeleteTraineeship } from '#graphql';
import AddTraineeshipModal from '#shared/AddTraineeshipModal';
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

const BackendAboutSingleTraineeship = ({ traineeship }) => {
    const theme = useTheme();
    const classes = useStyles(theme);


    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [deleteTraineeship, { loading: loadingDelete }] = useDeleteTraineeship({ traineeshipId: traineeship._id }, handleCloseDelete);

    return <>
        <BackendSingleItem
            boxShadow
            deleteIcon
            handleOpenDelete={handleOpenDelete}
            handleOpenEdit={handleOpenEdit}
            title={traineeship.company}
        >
            <Typography className={classes.year} variant='body1'>
                {traineeship.year}
            </Typography>
        </BackendSingleItem>
        <AddTraineeshipModal
            handleClose={handleCloseEdit}
            initialTraineeship={traineeship}
            open={openEdit}
        />
        <DeleteModal
            actionTitle='delete'
            handleClose={handleCloseDelete}
            handleSubmit={deleteTraineeship}
            loading={loadingDelete}
            open={openDelete}
            title={traineeship.company}
        />
    </>
};

export default BackendAboutSingleTraineeship;