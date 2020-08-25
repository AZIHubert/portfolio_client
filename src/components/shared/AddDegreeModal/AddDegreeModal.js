import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { useCreateDegree, useUpdateDegree } from '#graphql';
import DateField from '#shared/DateField';
import FormContainerDuo from '#shared/FormContainerDuo';
import InputTextField from '#shared/InputTextField';
import Modal from '#shared/Modal';

const AddDegreeModal = ({ handleClose, initialDegree, open }) => {

    const initialState = initialDegree ? {
        city: initialDegree.city,
        degree: initialDegree.degree,
        school: initialDegree.school,
        schoolLink: initialDegree.schoolLink,
        year: new Date(initialDegree.year, 1, 1)
    } : {
        city: '',
        degree: '',
        school: '',
        schoolLink: '',
        year: new Date(),
    };

    const initialErrors = {
        city: '',
        degree: '',
        general: '',
        school: '',
        schoolLink: '',
        year: '',
    };

    const [degree, setDegree] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    
    const onError = errors => setErrors(errors);

    const createVariables = {
        ...degree,
        year: new Date(degree.year).getFullYear()
    };
    const onSuccessCreate = () => {
        handleClose();
        setDegree(initialState);
        setErrors(initialErrors);
    };
    const [createDegree, { loading: loadingCreate }] = useCreateDegree(createVariables, onSuccessCreate, onError);

    const variables_update = {
        ...degree,
        year: new Date(degree.year).getFullYear(),
        degreeId: initialDegree ? initialDegree._id : null
    };
    const onSuccess_update = () => {
        handleClose();
        setErrors(initialErrors);
    };
    const [updateDegree, { loading: loadingUpdate }] = useUpdateDegree(variables_update, onSuccess_update, onError);

    const handleChange = e => {
        setDegree({
            ...degree,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            general: '',
            [e.target.name]: ''
        });
    };
    const handleDate = year => {
        setDegree({
            ...degree,
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
        if(!initialDegree) createDegree();
        else updateDegree();
    };

    return <Modal
        actionTitle={initialDegree ? 'save changes' : 'save degree'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingCreate || loadingUpdate}
        open={open}
        title={initialDegree ? 'edit degree' : 'create new degree'}
    >
        <Box display='flex' flexWrap='wrap'>
            <Box width='100%'>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.degree ? true : false}
                    helperText={errors.degree}
                    label={'Degree\'s ame'}
                    name='degree'
                    onChange={handleChange}
                    value={degree.degree}
                />
            </Box>
            <FormContainerDuo marginRight>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.city ? true : false}
                    helperText={errors.city}
                    label='City'
                    minHeight={175}
                    name='city'
                    onChange={handleChange}
                    value={degree.city}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <DateField
                    date={degree.year}
                    disabled={loadingCreate || loadingUpdate}
                    label='Year'
                    onChange={handleDate}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.school ? true : false}
                    helperText={errors.school}
                    label='School'
                    minHeight={175}
                    name='school'
                    onChange={handleChange}
                    value={degree.school}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.schoolLink ? true : false}
                    helperText={errors.schoolLink}
                    label={'School\'s Link'}
                    minHeight={175}
                    name='schoolLink'
                    onChange={handleChange}
                    value={degree.schoolLink}
                />
            </FormContainerDuo>
        </Box>
    </Modal>
};

export default AddDegreeModal;