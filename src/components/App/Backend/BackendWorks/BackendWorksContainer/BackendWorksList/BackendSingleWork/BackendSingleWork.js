import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useDeleteWork } from '#graphql';
import BackendMovableSingleItem from '#shared/BackendMovableSingleItem';
import DeleteModal from '#shared/DeleteModal';

const BackendSingleWork = ({ _id, index, title }) => {

    const location = useLocation();
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [deleteWork, { loading: loadingDelete }] = useDeleteWork({ workId: _id }, handleClose);

    return <>
        <BackendMovableSingleItem
            _id={_id}
            boxShadow
            deleteIcon
            handleOpenDelete={handleOpen}
            index={index}
            title={title}
            to={`${location.pathname}/${_id}`}
        />
        <DeleteModal
            actionTitle='delete'
            handleClose={handleClose}
            handleSubmit={deleteWork}
            loading={loadingDelete}
            open={open}
            title={title}
        />
    </>
};

export default BackendSingleWork;