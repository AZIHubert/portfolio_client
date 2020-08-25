import { Box, withWidth } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';

import { useCreateWork } from '#graphql';
import FormContainerDuo from '#shared/FormContainerDuo';
import InputTextField from '#shared/InputTextField';
import Modal from '#shared/Modal';

import CheckField from '#shared/CheckField';
import ColorField from '#shared/ColorField';
import DateField from '#shared/DateField';
import TypesField from '#shared/TypesField';
import ImageField from '#shared/ImageField';

const useStyles = makeStyles(theme => ({
    flexFields: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    rightColumn: {
        marginLeft: theme.spacing(2),
        minWidth: 300,
        width: 300,
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(0),
            minWidth: '100%',
            width: '100%',
        },
    },
}));

const AddWorkModal = ({ width, open, handleClose }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialState = {
        date: new Date(),
        display: true,
        thumbnail: {},
        title: '',
        titleColor: theme.palette.primaryColor,
        types: [],
    };
    const initialErrors = {
        date: '',
        display: '',
        general: '',
        thumbnail: '',
        title: '',
        titleColor: '',
        types: '',
    };

    const [work, setWork] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const createVariables = {
        ...work,
        date: new Date(work.date).getFullYear(),
        thumbnail: work.thumbnail._id ? work.thumbnail._id : null,
        types: work.types.map(type => type._id),
    };
    const onSuccess = () => {
        handleClose();
        setWork(initialState);
        setErrors(initialErrors);
    };
    const onError = errors => setErrors(errors);
    const [createWork, { loading: loadingCreate }] = useCreateWork(createVariables, onSuccess, onError);

    useEffect(() => {
        const { types } = work;
        const workTypes = [...types];
        workTypes.map(type => {
            const newType = types.find(t => t._id === type._id);
            type.title = newType.title;
            return type;
        });
    }, [work]);

    const handleChange = e => {
        setWork({
            ...work,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            general: '',
            [e.target.name]: ''
        });
    };
    const handleDate = date => {
        setWork({
            ...work,
            date
        });
        setErrors({
            ...errors,
            general: '',
            date: ''
        });
    };
    const handleColor = c => {
        setWork({
            ...work,
            titleColor: c.hex
        });
        setErrors({
            ...errors,
            general: '',
            titleColor: ''
        });
    };
    const resetColor = () => {
        setWork({
            ...work,
            titleColor: initialState.titleColor
        });
        setErrors({
            ...errors,
            general: '',
            titleColor: ''
        });
    };
    const handleDisplay = e => {
        setWork({
            ...work,
            display: e.target.checked
        });
        setErrors({
            ...errors,
            general: '',
            display: ''
        });
    };
    const handleAddThumbnail = id => {
        setWork({
            ...work,
            thumbnail: id
        });
        setErrors({
            ...errors,
            general: '',
            thumbnail: ''
        });
    };
    const handleRemoveThumbnail = () => {
        setWork({
            ...work,
            thumbnail: ''
        });
        setErrors({
            ...errors,
            general: '',
            thumbnail: ''
        });
    };
    const handleAddTypes = newType => {
        setWork({
            ...work,
            types: [newType, ...work.types].sort((a, b) =>  a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
        });
        setErrors({
            ...errors,
            general: '',
            types: ''
        });
    };
    const handleRemoveTypes = newType => {
        setWork({
            ...work,
            types: work.types.filter(type => type._id !== newType._id)
        });
        setErrors({
            ...errors,
            general: '',
            types: ''
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        createWork();
    };

    return <Modal
        actionTitle='save work'
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingCreate}
        open={open}
        title='create work'
    >
        <InputTextField
            disabled={loadingCreate}
            error={errors.title ? true : false}
            helperText={errors.title}
            label='Work title'
            name='title'
            onChange={handleChange}
            value={work.title}
        />
        <Box className={classes.flexFields}>
            <Box flexGrow={1}>
                <Box display='flex' flexWrap='wrap'>
                    <FormContainerDuo marginRight>
                        <CheckField
                            checked={work.display}
                            disabled={loadingCreate}
                            label='Display on front?'
                            onChange={handleDisplay}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <ColorField
                            color={work.titleColor}
                            disabled={loadingCreate}
                            handleColor={handleColor}
                            initialColor={theme.palette.primaryColor}
                            label='Title color'
                            resetColor={resetColor}
                        />
                    </FormContainerDuo>
                    <Box width='100%'>
                        <TypesField
                            disabled={loadingCreate}
                            handleAddTypes={handleAddTypes}
                            handleRemoveTypes={handleRemoveTypes}
                            selectedTypes={work.types}
                        />
                    </Box>
                    <FormContainerDuo marginRight>
                        <DateField
                            date={work.date}
                            disabled={loadingCreate}
                            label='Date of creation'
                            onChange={handleDate}
                        />
                    </FormContainerDuo>
                    {width === 'md' && <FormContainerDuo>
                        <ImageField
                            disabled={loadingCreate}
                            handleAddImage={handleAddThumbnail}
                            handleRemoveImage={handleRemoveThumbnail}
                            image={work.thumbnail}
                            title='thumbnail'
                        />
                    </FormContainerDuo>}
                </Box>
            </Box>
            {width !== 'md' && <Box className={classes.rightColumn}>
                <ImageField
                    disabled={loadingCreate}
                    handleAddImage={handleAddThumbnail}
                    handleRemoveImage={handleRemoveThumbnail}
                    image={work.thumbnail}
                    title='thumbnail'
                />
            </Box>}
        </Box>
    </Modal>
};

export default withWidth()(AddWorkModal);