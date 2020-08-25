import { Box, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useUpdateWork, useDeleteWork } from '#graphql';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';
import CheckField from '#shared/CheckField';
import ColorField from '#shared/ColorField';
import DateField from '#shared/DateField';
import DeleteModal from '#shared/DeleteModal';
import FormAlert from '#shared/FormAlert';
import FormContainerDuo from '#shared/FormContainerDuo';
import ImageField from '#shared/ImageField';
import InputTextField from '#shared/InputTextField';
import MetaInfo from '#shared/MetaInfo';
import TypesField from '#shared/TypesField';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    rightColumn: {
        marginLeft: theme.spacing(10),
        minWidth: 340,
        width: 340,
        [theme.breakpoints.down('lg')]: {
            marginLeft: theme.spacing(3),
            minWidth: 280,
            width: 280,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(0),
            minWidth: '100%',
            width: '100%',
        },
    },
}));


const BackendWorkForm = ({ width, work: initialWork }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const history = useHistory();

    const initialErrors = {
        date: '',
        display: '',
        general: '',
        thumbnail: '',
        title: '',
        titleColor: '',
    };

    const [opendelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [errors, setErrors] = useState(initialErrors);
    const [work, setWork] = useState(initialWork);
    const resetError = () => setErrors(initialErrors);

    const variables_update = {
        ...work,
        date: Object.keys(work).length ? new Date(work.date).getFullYear() : null,
        thumbnail: Object.keys(work).length ? work.thumbnail._id ? work.thumbnail._id : null : null,
        types: Object.keys(work).length ? work.types.map(type => type._id) : null,
        workId: Object.keys(work).length ? work._id : null,
    };
    const onError_update = newErrors => setErrors(newErrors);
    const [updateWork, { loading: loadingUpdate }] = useUpdateWork(variables_update, resetError, onError_update);

    const onSuccess_delete = () => history.push('/backend/works');
    const [deleteWork, { loading: loadingDelete }] = useDeleteWork({ workId: initialWork._id }, onSuccess_delete);

    const handleAddThumbnail = id => {
        setWork({ ...work, thumbnail: id });
        setErrors({ ...errors, general: '', thumbnail: '' });
    };
    const handleAddTypes = newType => {
        setWork({ ...work, types: [newType, ...work.types].sort((a, b) =>  a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1) });
        setErrors({ ...errors, general: '', types: '' });
    };
    const handleChange = e => {
        if(e.target.type === 'text') setWork({ ...work, [e.target.name]: e.target.value });
        else if(e.target.type === 'checkbox') setWork({ ...work, [e.target.name]: e.target.checked });
        
        setErrors({ ...errors, general: '', [e.target.name]: '' });
    };
    const handleColor = c => {
        setWork({ ...work, titleColor: c.hex });
        setErrors({ ...errors, general: '', titleColor: '' });
    };
    const handleDate = date => {
        setWork({ ...work, date });
        setErrors({ ...errors, date: '', general: '' });
    };
    const handleRemoveThumbnail = () => {
        setWork({ ...work, thumbnail: '' });
        setErrors({ ...errors, general: '', thumbnail: '' });
    };
    const handleRemoveTypes = newType => {
        setWork({ ...work, types: work.types.filter(type => type._id !== newType._id) });
        setErrors({ ...errors, general: '', types: '' });
    };
    const handleResetColor = () => {
        setWork({ ...work, titleColor: theme.palette.primaryColor });
        setErrors({ ...errors, general: '', titleColor: '' });
    };    

    const handleSubmit = e => {
        e.preventDefault();
        updateWork();
    };

    const editButton = <Button
        backgroundColor={theme.palette.primaryColor}
        borderColor={theme.palette.tertiaryColor}
        color={theme.palette.tertiaryColor}
        loading={loadingUpdate || loadingDelete}
        marginBottom={1}
        onClick={handleSubmit}
        type='submit'
        width='100%'
    >
        {loadingUpdate ? 'Saving changes' : 'Edit work'}
    </Button>
    const deleteButton = <Button
        backgroundColor={theme.palette.tertiaryColor}
        borderColor={theme.palette.tertiaryColor}
        color={theme.palette.primaryColor}
        loading={loadingUpdate || loadingDelete}
        marginBottom={1}
        onClick={handleOpenDelete}
        width='100%'
    >
        {loadingUpdate ? 'Deleting...' : 'Delete work'}
    </Button>
    const showFrontButon = <Button
        backgroundColor={theme.palette.primaryColor}
        borderColor={theme.palette.tertiaryColor}
        color={theme.palette.tertiaryColor}
        loading={loadingUpdate || loadingDelete}
        link
        marginBottom={4}
        to={`/works/${work._id}`}
        width='100%'
    >
        Show work on front
    </Button>

    return !!Object.keys(work).length && <BackendPartWrapper
        returnButton
        title={work.title}
        to='/backend/works'
    >
        {!!errors.general && <FormAlert marginBottom={2}>{errors.general}</FormAlert>}
        <form className={classes.form} onSubmit={handleSubmit}>
            <Box flexGrow={1}>
                <InputTextField
                    disabled={loadingUpdate || loadingDelete}
                    error={errors.title ? true : false}
                    helperText={errors.title}
                    label='Work title'
                    name='title'
                    onChange={handleChange}
                    value={work.title}
                />
                <Box display='flex' flexWrap='wrap'>
                    <FormContainerDuo marginRight>
                        <CheckField
                            checked={work.display}
                            disabled={loadingUpdate || loadingDelete}
                            label='Display on front?'
                            name='display'
                            onChange={handleChange}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <ColorField
                            color={work.titleColor}
                            disabled={loadingUpdate || loadingDelete}
                            handleColor={handleColor}
                            initialColor={theme.palette.primaryColor}
                            label='Title color'
                            resetColor={handleResetColor}
                        />
                    </FormContainerDuo>
                    <Box width='100%'>
                        <TypesField
                            disabled={loadingUpdate || loadingDelete}
                            handleAddTypes={handleAddTypes}
                            handleRemoveTypes={handleRemoveTypes}
                            selectedTypes={work.types}
                        />
                    </Box>

                    <FormContainerDuo marginRight>
                        <DateField
                            date={work.date}
                            disabled={loadingUpdate || loadingDelete}
                            label='Date of creation'
                            onChange={handleDate}
                        />
                    </FormContainerDuo>
                </Box>
            </Box>
            <Box className={classes.rightColumn}>
                {(width !== 'xs' && width !== 'sm') && editButton}
                {(width !== 'xs' && width !== 'sm') && deleteButton}
                {(width !== 'xs' && width !== 'sm') && showFrontButon}
                <ImageField
                    disabled={loadingUpdate || loadingDelete}
                    handleAddImage={handleAddThumbnail}
                    handleRemoveImage={handleRemoveThumbnail}
                    image={work.thumbnail}
                    title='thumbnail'
                />
                <MetaInfo
                    createdAt={initialWork.createdAt}
                    createdBy={initialWork.createdBy}
                    paddingBottom={(width === 'xs' || width === 'sm') ? 2 : 0}
                    updatedAt={initialWork.updatedAt}
                    updatedBy={initialWork.updatedBy}
                />
                {(width === 'xs' || width === 'sm') && editButton}
                {(width === 'xs' || width === 'sm') && deleteButton}
                {(width === 'xs' || width === 'sm') && showFrontButon}
            </Box>
            <DeleteModal
                actionTitle='delete'
                handleClose={handleCloseDelete}
                handleSubmit={deleteWork}
                loading={loadingDelete}
                open={opendelete}
                title={work.title}
            />
        </form>
    </BackendPartWrapper>
};

export default withWidth()(BackendWorkForm);