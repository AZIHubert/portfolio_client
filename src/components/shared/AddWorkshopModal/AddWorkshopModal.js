import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { useCreateWorkshop, useUpdateWorkshop } from '#graphql';
import DateField from '#shared/DateField';
import FormContainerDuo from '#shared/FormContainerDuo';
import InputTextField from '#shared/InputTextField';
import Modal from '#shared/Modal';

const AddWorkshopModal = ({ handleClose, initialWorkshop, open }) => {
    const initialState = initialWorkshop ? {
        artist: initialWorkshop.artist,
        artistLink: initialWorkshop.artistLink,
        body: initialWorkshop.body,
        year: new Date(initialWorkshop.year, 1, 1),
    } : {
        artist: '',
        artistLink: '',
        body: '',
        year: new Date()
    };
    const initialErrors = {
        artist: '',
        artistLink: '',
        body: '',
        general: '',
        year: '',
    };

    const [workshop, setWorkshop] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const onError = errors => setErrors(errors);
    
    const createVariables = {
        ...workshop,
        year: new Date(workshop.year).getFullYear(),
    };
    const onSuccessCreate = () => {
        handleClose();
        setWorkshop(initialState);
        setErrors(initialErrors);
    };
    const [createWorkshop, { loading: loadingCreate }] = useCreateWorkshop(createVariables, onSuccessCreate, onError);

    const variables_update = {
        ...workshop,
        workshopId: initialWorkshop ? initialWorkshop._id : null,
        year: new Date(workshop.year).getFullYear(),
    };
    const onSuccess_update = () => {
        handleClose();
        setErrors(initialErrors);
    };
    const [updateWorkshop, { loading: loadingUpdate }] = useUpdateWorkshop(variables_update, onSuccess_update, onError);

    const handleChange = e => {
        setWorkshop({ ...workshop, [e.target.name]: e.target.value, });
        setErrors({ ...errors, general: '', [e.target.name]: '', });
    };
    const handleDate = year => {
        setWorkshop({ ...workshop, year });
        setErrors({ ...errors, general: '', year: '', });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!initialWorkshop) createWorkshop();
        else updateWorkshop();
    };

    return <Modal
        actionTitle={initialWorkshop ? 'save changes' : 'save workshop'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingCreate || loadingUpdate}
        open={open}
        title={initialWorkshop ? 'edit workshop' : 'create new workshop'}
    >
        <Box display='flex' flexWrap='wrap'>
            <Box width='100%'>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.artist ? true : false}
                    helperText={errors.artist}
                    label={'Artist\'s name'}
                    name='artist'
                    onChange={handleChange}
                    value={workshop.artist}
                />
            </Box>
            <FormContainerDuo marginRight>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.artistLink ? true : false}
                    helperText={errors.artistLink}
                    label={'Artist\'s link'}
                    name='artistLink'
                    minHeight={175}
                    onChange={handleChange}
                    value={workshop.artistLink}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <DateField
                    date={workshop.year}
                    disabled={loadingCreate || loadingUpdate}
                    label='Year'
                    onChange={handleDate}
                />
            </FormContainerDuo>
            <Box width='100%'>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.body ? true : false}
                    helperText={errors.body}
                    label='Body'
                    minHeight={175}
                    multiline
                    name='body'
                    onChange={handleChange}
                    value={workshop.body}
                />
            </Box>
        </Box>
    </Modal>
};

export default AddWorkshopModal;