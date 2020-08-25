import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { useCreateTraineeship, useUpdateTraineeship } from '#graphql';
import DateField from '#shared/DateField';
import FormContainerDuo from '#shared/FormContainerDuo';
import InputTextField from '#shared/InputTextField';
import Modal from '#shared/Modal';

const AddTraineeshipModal = ({ handleClose, initialTraineeship, open }) => {

    const initialState = initialTraineeship ? {
        body: initialTraineeship.body,
        city: initialTraineeship.city,
        company: initialTraineeship.company,
        companyLink: initialTraineeship.companyLink,
        year: new Date(initialTraineeship.year, 1, 1),
    } : {
        body: '',
        city: '',
        company: '',
        companyLink: '',
        year: new Date(),
    };
    const initialErrors = {
        body: '',
        city: '',
        company: '',
        companyLink: '',
        general: '',
        year: '',
    };

    const [traineeship, setTraineeship] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const onError = errors => setErrors(errors);

    const variables_create = {
        ...traineeship,
        year: new Date(traineeship.year).getFullYear()
    };
    const onSuccess_create = () => {
        handleClose();
        setTraineeship(initialState);
        setErrors(initialErrors);
    };
    const [createTraineeship, { loading: loadingCreate }] = useCreateTraineeship(variables_create, onSuccess_create, onError);

    const variables_update = {
        ...traineeship,
        traineeshipId: initialTraineeship ? initialTraineeship._id : null,
        year: new Date(traineeship.year).getFullYear(),
    };
    const onSuccess_update = () => {
        handleClose();
        setErrors(initialErrors);
    };
    const [updateTraineeship, { loading: loadingUpdate }] = useUpdateTraineeship(variables_update, onSuccess_update, onError);

    const handleChange = e => {
        setTraineeship({
            ...traineeship,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            general: '',
            [e.target.name]: ''
        });
    };
    const handleDate = year => {
        setTraineeship({
            ...traineeship,
            year
        });
        setErrors({
            ...errors,
            general: '',
            year: ''
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!initialTraineeship) createTraineeship();
        else updateTraineeship();
    };

    return <Modal
        actionTitle={initialTraineeship ? 'save changes' : 'save traineeship'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingCreate || loadingUpdate}
        open={open}
        title={initialTraineeship ? 'edit traineeship' : 'create new traineeship'}
    >
        <Box display='flex' flexWrap='wrap'>
            <FormContainerDuo marginRight>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.company ? true : false}
                    helperText={errors.company}
                    label={'Company\'s name'}
                    minHeight={175}
                    name='company'
                    onChange={handleChange}
                    value={traineeship.company}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.companyLink ? true : false}
                    helperText={errors.companyLink}
                    label={'Company\'s Link'}
                    minHeight={175}
                    name='companyLink'
                    onChange={handleChange}
                    value={traineeship.companyLink}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.city ? true : false}
                    helperText={errors.city}
                    label='City'
                    minHeight={175}
                    name='city'
                    onChange={handleChange}
                    value={traineeship.city}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <DateField
                    date={traineeship.year}
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
                    value={traineeship.body}
                />
            </Box>
        </Box>
    </Modal>
};

export default AddTraineeshipModal;
