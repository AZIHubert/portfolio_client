import { Box, withWidth } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';

import { useUpdateGeneral } from '#graphql';
import Button from '#shared/Button';
import FormAlert from '#shared/FormAlert';
import FormContainerDuo from '#shared/FormContainerDuo';
import MetaInfo from '#shared/MetaInfo';
import InputTextField from '#shared/InputTextField';

const useStyles = makeStyles(theme => ({
    container: {
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

const GeneralForm = ({ general: initialGeneral, width }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialError = {
        email: '',
        facebook: '',
        general: '',
        instagram: '',
        linkedin: '',
    };

    const [general, setGeneral] = useState(initialGeneral);
    const [errors, setErrors] = useState(initialError);

    const onError = newErrors => setErrors(newErrors);
    const onSuccess = () => setErrors(initialError);
    const [updateGeneral, { loading: loadingEdit }] = useUpdateGeneral(general, onSuccess, onError);

    const handleChange = e => {
        setGeneral({
            ...general,
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
        updateGeneral();
    };

    return <Box>
        {!!errors.general && <FormAlert marginBottom={2}>{errors.general}</FormAlert>}
        <form className={classes.container} onSubmit={handleSubmit}>
            <Box flexGrow={1}>
                <Box display='flex' flexWrap='wrap'>
                    <FormContainerDuo marginRight>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            label='Email'
                            name='email'
                            onChange={handleChange}
                            value={general.email}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <InputTextField
                            disabled={loadingEdit}
                            helperText={errors.phone}
                            error={errors.phone ? true : false}
                            label='Phone number'
                            name='phone'
                            onChange={handleChange}
                            value={general.phone}
                        />
                    </FormContainerDuo>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.biography ? true : false}
                            helperText={errors.biography}
                            label='Biography'
                            multiline
                            name='biography'
                            onChange={handleChange}
                            value={general.biography}
                        />
                    </Box>
                    <FormContainerDuo marginRight>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.facebook ? true : false}
                            helperText={errors.facebook}
                            label='Facebook account'
                            name='facebook'
                            onChange={handleChange}
                            value={general.facebook}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.instagram ? true : false}
                            helperText={errors.instagram}
                            label='Instagram account'
                            name='instagram'
                            onChange={handleChange}
                            value={general.instagram}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo marginRight>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.linkedin ? true : false}
                            helperText={errors.linkedin}
                            label='Linkedin account'
                            name='linkedin'
                            onChange={handleChange}
                            value={general.linkedin}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.adressStreet ? true : false}
                            helperText={errors.adressStreet}
                            label='Adress Street'
                            name='adressStreet'
                            onChange={handleChange}
                            value={general.adressStreet}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo marginRight>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.adressZip ? true : false}
                            helperText={errors.adressZip}
                            label='Adress Zip'
                            name='adressZip'
                            onChange={handleChange}
                            value={general.adressZip}
                        />
                    </FormContainerDuo>
                    <FormContainerDuo>
                        <InputTextField
                            disabled={loadingEdit}
                            error={errors.adressCountry ? true : false}
                            helperText={errors.adressCountry}
                            label='Adress Country'
                            name='adressCountry'
                            onChange={handleChange}
                            value={general.adressCountry}
                        />
                    </FormContainerDuo>
                </Box>
                <Button
                    backgroundColor={theme.palette.tertiaryColor}
                    borderColor={theme.palette.tertiaryColor}
                    borderWidth={2}
                    color={theme.palette.primaryColor}
                    loading={loadingEdit}
                    type='submit'
                    onClick={handleSubmit}
                    width='48%'
                >
                    {loadingEdit ? 'Saving changes' : 'Edit general'}
                </Button>
            </Box>
            <Box className={classes.rightColumn}>
                {!!initialGeneral.updatedBy && <MetaInfo
                    paddingTop={(width === 'xs' || width === 'sm') ? 2 : 0}
                    updatedAt={initialGeneral.updatedAt}
                    updatedBy={initialGeneral.updatedBy}
                />}
            </Box>
        </form>
    </Box>
};

export default withWidth()(GeneralForm);