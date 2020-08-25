import React, { useState } from 'react';

import { useTheme } from '@material-ui/core/styles';
import AddTraineeshipModal from '#shared/AddTraineeshipModal';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';

import BackendAboutTraineeshipsList from './BackendAboutTraineeshipsList';

const BackendAboutTraineeships = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <BackendPartWrapper title='traineeships'>
        <Button
            marginBottom={3}
            borderColor={theme.palette.tertiaryColor}
            width={180}
            onClick={handleOpen}
        >
            Create traineeship
        </Button>
        <AddTraineeshipModal open={open} handleClose={handleClose} />
        <BackendAboutTraineeshipsList />
    </BackendPartWrapper>
};

export default BackendAboutTraineeships;