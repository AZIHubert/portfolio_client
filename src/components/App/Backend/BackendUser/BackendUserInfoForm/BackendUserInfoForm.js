import { Box, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useUpdateUser } from '#graphql';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';
import FormAlert from '#shared/FormAlert';
import FormContainerDuo from '#shared/FormContainerDuo';
import ImageField from '#shared/ImageField';
import InputTextField from '#shared/InputTextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        paddingTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    rightColumn: {
        marginLeft: theme.spacing(3),
        minWidth: 340,
        width: 340,
        [theme.breakpoints.down('md')]: {
            minWidth: 300,
            width: 300,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(0),
            minWidth: '100%',
            width: '100%',
        }
    }
}));

const BackendUserInfoForm = ({ width, user: initialUserInfo }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialErrors = {
        firstname: '',
        general: '',
        lastname: '',
        profilePicture: '',
        username: '',
    };

    const [user, setUser] = useState(initialUserInfo);
    const [errors, setErrors] = useState(initialErrors);

    const variables_update = {
        ...user,
        profilePicture: Object.keys(user).length ? user.profilePicture._id ? user.profilePicture._id : null : null,
        userId: Object.keys(user).length ? user._id : null,
    };
    const onError_update = newErrors => setErrors(newErrors);
    const onSuccess_update = () => setErrors(initialErrors);
    const [updateUser, { loading: loadingUpdate }] = useUpdateUser(variables_update, onSuccess_update, onError_update);

    const handleAddPP = id => {
        setUser({ ...user, profilePicture: id });
        setErrors({ ...errors, general: '', profilePicture: '' });
    };
    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, general: '', [e.target.name]: '' });
    };
    const handleRemovePP = () => {
        setUser({ ...user, profilePicture: '' });
        setErrors({ ...errors, general: '', profilePicture: '' });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateUser();
    };

    const editButton = <Button
        color={theme.palette.tertiaryColor}
        backgroundColor={theme.palette.primaryColor}
        borderColor={theme.palette.tertiaryColor}
        disabled={loadingUpdate}
        marginTop={2}
        onClick={handleSubmit}
        type='submit'
        width={(width === 'xs' || width === 'sm') ? '100%' : '48%'}
    >
        {loadingUpdate ? 'Saving changes' : 'Edit profile'}
    </Button>


    return <BackendPartWrapper title='profile information'>
        {!!errors.general && <FormAlert>{errors.general}</FormAlert>}
        <form className={classes.container} onSubmit={handleSubmit}>
            <Box flexGrow={1}>
                <Box display='flex' flexWrap='wrap'>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingUpdate}
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            label='Username'
                            name='username'
                            onChange={handleChange}
                            value={user.username}
                        />
                    </Box>
                    <FormContainerDuo marginRight>
                        <InputTextField
                            label='First name'
                            name='firstname'
                            value={user.firstname}
                            onChange={handleChange}
                            error={errors.firstname ? true : false}
                            helperText={errors.firstname}
                            disabled={loadingUpdate}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <InputTextField
                            label='Last name'
                            name='lastname'
                            value={user.lastname}
                            onChange={handleChange}
                            error={errors.lastname ? true : false}
                            helperText={errors.lastname}
                            disabled={loadingUpdate}
                        />
                    </FormContainerDuo>
                    {(width !== 'xs' && width !== 'sm') && editButton}
                </Box>
            </Box>
            <Box className={classes.rightColumn}>
                <ImageField
                    disabled={loadingUpdate}
                    handleAddImage={handleAddPP}
                    handleRemoveImage={handleRemovePP}
                    image={user.profilePicture}
                    title='profile picture'
                />
                {(width === 'xs' || width === 'sm') && editButton}
            </Box>
        </form>
    </BackendPartWrapper>
};

export default withWidth()(BackendUserInfoForm);