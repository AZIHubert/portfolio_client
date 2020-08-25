import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { useCreateEmployment, useUpdateEmployment } from '#graphql';
import CheckField from '#shared/CheckField';
import DateField from '#shared/DateField';
import FormContainerDuo from '#shared/FormContainerDuo';
import InputTextField from '#shared/InputTextField';
import Modal from '#shared/Modal';

const AddEmploymentModal = ({ initialEmployment, open, handleClose }) => {

    //
    // Set initials state
    //

    const initialState = initialEmployment ? {
        body: initialEmployment.body,
        city: initialEmployment.city,
        currentWork: initialEmployment.currentWork,
        company: initialEmployment.company,
        companyLink: initialEmployment.companyLink,
        yearFrom: new Date(initialEmployment.yearFrom, 1, 1),
        yearTo: new Date(initialEmployment.yearTo, 1, 1),
    } : {
        body: '',
        city: '',
        company: '',
        companyLink: '',
        currentWork: false,
        yearFrom: new Date(),
        yearTo: new Date(),
    };
    const initialErrors = {
        body: '',
        city: '',
        company: '',
        companyLink: '',
        currentWork: '',
        general: '',
        yearFrom: '',
        yearTo: '',
    };
    const [employment, setEmployment] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    

    //
    // graphql's mutations
    //
    
    const variables_create = {
        ...employment,
        yearFrom: new Date(employment.yearFrom).getFullYear(),
        yearTo: new Date(employment.yearTo).getFullYear(),
    };
    const variables_update = {
        ...employment,
        employmentId: initialEmployment ? initialEmployment._id : null,
        yearTo: new Date(employment.yearTo).getFullYear(),
        yearFrom: new Date(employment.yearFrom).getFullYear(),
    };
    const onError = errors => setErrors(errors);
    const onSuccess_create = () => {
        handleClose();
        setEmployment(initialState);
        setErrors(initialErrors);
    };
    const onSuccess_update = () => {
        handleClose();
        setErrors(initialErrors);
    };
    const [createEmployment, { loading: loadingCreate }] = useCreateEmployment(variables_create, onSuccess_create, onError);
    const [updateEmployment, { loading: loadingUpdate }] = useUpdateEmployment(variables_update, onSuccess_update, onError);


    //
    // Handle change functions
    //

    const handleChange = e => {
        setEmployment({
            ...employment,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            general: '',
            [e.target.name]: '',
        });
    };
    const handleDisplay = e => {
        setEmployment({
            ...employment,
            currentWork: e.target.checked,
        });
        setErrors({
            ...errors,
            general: '',
            currentWork: '',
        });
    };
    const handleYearFrom = yearFrom => {
        setEmployment({
            ...employment,
            yearFrom,
        });
        setErrors({
            ...errors,
            general: '',
            yearFrom: '',
        });
    };
    const handleYearTo = yearTo => {
        setEmployment({
            ...employment,
            yearTo,
        });
        setErrors({
            ...errors,
            general: '',
            yearTo: '',
        });
    };


    //
    // Handle Submit
    //

    const handleSubmit = e => {
        e.preventDefault();
        if(!initialEmployment) createEmployment();
        else updateEmployment();
    };

    return <Modal
        actionTitle={initialEmployment ? 'save changes' : 'save employment'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingCreate || loadingUpdate}
        open={open}
        title={initialEmployment ? 'edit employment' : 'create new employment'}
    >
        <Box display='flex' flexWrap='wrap'>
            <FormContainerDuo marginRight>
                <InputTextField
                    autoFocus
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.company ? true : false}
                    helperText={errors.company}
                    label={'Company\'s name'}
                    minHeight={175}
                    name='company'
                    onChange={handleChange}
                    value={employment.company}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <InputTextField
                    disabled={loadingCreate || loadingUpdate}
                    error={errors.companyLink ? true : false}
                    helperText={errors.companyLink}
                    label={'Company\'s website'}
                    minHeight={175}
                    name='companyLink'
                    onChange={handleChange}
                    value={employment.companyLink}
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
                    value={employment.city}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <DateField
                    date={employment.yearTo}
                    disabled={loadingCreate || loadingUpdate}
                    label='Year To'
                    onChange={handleYearTo}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <DateField
                    date={employment.yearFrom}
                    disabled={loadingCreate || loadingUpdate || employment.currentWork}
                    label='Year From'
                    onChange={handleYearFrom}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <CheckField
                    checked={employment.currentWork}
                    disabled={loadingCreate || loadingUpdate}
                    label='Current employment?'
                    onChange={handleDisplay}
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
                    value={employment.body}
                />
            </Box>
        </Box>
    </Modal>
};

export default AddEmploymentModal;