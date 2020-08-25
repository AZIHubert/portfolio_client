import { Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useDeleteDegree } from '#graphql';
import AddDegreeModal from '#shared/AddDegreeModal';
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

const SingleDegree = ({ degree }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [deleteDegree, { loading: loadingDelete }] = useDeleteDegree({ degreeId: degree._id }, handleCloseDelete);

    return <>
        <BackendSingleItem
            boxShadow
            deleteIcon
            handleOpenDelete={handleOpenDelete}
            handleOpenEdit={handleOpenEdit}
            title={degree.degree}
        >
            <Typography className={classes.year} variant='body1'>
                {degree.year}
            </Typography>
        </BackendSingleItem>
        <AddDegreeModal
            handleClose={handleCloseEdit}
            initialDegree={degree}
            open={openEdit}
        />
        <DeleteModal
            actionTitle='delete'
            handleClose={handleCloseDelete}
            handleSubmit={deleteDegree}
            loading={loadingDelete}
            open={openDelete}
            title={degree.degree}
        />
    </>
};

export default SingleDegree;