import React, { useState } from 'react';

import { useCreateType, useUpdateType } from '#graphql';
import FormAlert from '#shared/FormAlert';
import Modal from '#shared/Modal';
import InputTextField from '#shared/InputTextField';


const AddTypeModal = ({ handleClose, initialType, open }) => {

    const initialErrors = { title: '', general: '' };
    const initialState = initialType ? { title: initialType.title } : { title: '' };

    const [errors, setErrors] = useState(initialErrors);
    const [type, setType] = useState(initialState);

    const onError = errors => setErrors(errors);
    const onSuccess_create = () => {
        handleClose();
        setErrors(initialErrors);
        setType(initialState);
    };
    const [createType, { loading: loadingCreate }] = useCreateType(type, onSuccess_create, onError);

    const variables_update = { ...type, typeId: initialType ? initialType._id : null };
    const onSuccess_update = () => {
        handleClose();
        setErrors(initialErrors);
    }
    const [updateType, { loading: loadingUpdate }] = useUpdateType(variables_update, onSuccess_update, onError);

    const handleChange = e => {
        setType({
            ...type,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
            general: ''
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!initialType) createType();
        else updateType();
    };

    return <Modal
        actionTitle={initialType ? 'save changes' : 'save type'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingCreate || loadingUpdate}
        open={open}
        title={initialType ? 'edit type' : 'create new type'}
    >
        {!!errors.general && <FormAlert marginBottom={2}>{errors.general}</FormAlert>}
        <InputTextField
            autoFocus
            disabled={loadingCreate || loadingUpdate}
            error={errors.title ? true : false}
            helperText={errors.title}
            label='Type title'
            name='title'
            onChange={handleChange}
            value={type.title}
        />
    </Modal>
};

export default AddTypeModal;