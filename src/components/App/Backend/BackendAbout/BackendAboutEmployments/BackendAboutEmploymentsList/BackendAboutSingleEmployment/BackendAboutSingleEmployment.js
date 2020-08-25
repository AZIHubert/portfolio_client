import { Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useDeleteEmployment } from '#graphql';
import AddEmploymentModal from '#shared/AddEmploymentModal';
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

const BackendAboutSingleEmployment = ({ employment }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [deleteEmployment, { loading: loadingDelete }] = useDeleteEmployment({ employmentId: employment._id }, handleCloseDelete);

    return <>
        <BackendSingleItem
            boxShadow
            deleteIcon
            handleOpenDelete={handleOpenDelete}
            handleOpenEdit={handleOpenEdit}
            title={employment.company}
        >
            <Typography className={classes.year} variant='body1'>
                {`${employment.yearFrom}${!employment.currentWork ? `-${employment.yearTo}` : ''}`}
            </Typography>
        </BackendSingleItem>
        <AddEmploymentModal
            handleClose={handleCloseEdit}
            initialEmployment={employment}
            open={openEdit}
        />
        <DeleteModal
            actionTitle='delete'
            handleClose={handleCloseDelete}
            handleSubmit={deleteEmployment}
            loading={loadingDelete}
            open={openDelete}
            title={employment.company}
        />
    </>
};

export default BackendAboutSingleEmployment;