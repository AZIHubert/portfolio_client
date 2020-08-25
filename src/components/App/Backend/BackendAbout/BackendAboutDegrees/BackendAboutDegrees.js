import React, { useState } from 'react';

import { useTheme } from '@material-ui/core/styles';
import AddDegreeModal from '#shared/AddDegreeModal';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';

import BackendAboutDegreeList from './BackendAboutDegreesList';

const BackendAboutDegree = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <BackendPartWrapper title='degrees'>
        <Button
            marginBottom={3}
            borderColor={theme.palette.tertiaryColor}
            width={180}
            onClick={handleOpen}
        >
            Create degree
        </Button>
        <AddDegreeModal open={open} handleClose={handleClose} />
        <BackendAboutDegreeList />
    </BackendPartWrapper>
};

export default BackendAboutDegree;