import { useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import AddWorkshopModal from '#shared/AddWorkshopModal';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';

import BackendAboutWorkshopsList from './BackendAboutWorkshopsList';

const BackendAboutTraineeships = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <BackendPartWrapper title='workshops'>
        <Button
            marginBottom={3}
            borderColor={theme.palette.tertiaryColor}
            width={180}
            onClick={handleOpen}
        >
            Create workshop
        </Button>
        <AddWorkshopModal handleClose={handleClose} open={open} />
        <BackendAboutWorkshopsList />
    </BackendPartWrapper>
};

export default BackendAboutTraineeships;