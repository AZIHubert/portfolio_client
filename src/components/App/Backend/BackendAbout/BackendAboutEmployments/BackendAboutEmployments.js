import { useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import BackendPartWrapper from '#shared/BackendPartWrapper';
import AddEmploymentModal from '#shared/AddEmploymentModal';
import Button from '#shared/Button';

import BackendAboutEmploymentsList from './BackendAboutEmploymentsList';

const BackendAboutTraineeships = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <BackendPartWrapper title='employments'>
        <Button
            marginBottom={3}
            borderColor={theme.palette.tertiaryColor}
            width={180}
            onClick={handleOpen}
        >
            Create employment
        </Button>
        <AddEmploymentModal open={open} handleClose={handleClose} />
        <BackendAboutEmploymentsList />
    </BackendPartWrapper>
};

export default BackendAboutTraineeships;