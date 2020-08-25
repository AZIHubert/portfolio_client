import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';

import AddWorkModal from './AddWorkModal';
import BackendWorksList from './BackendWorksList';

const BackendWorksContainer = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <BackendPartWrapper title='works'>
        <Box marginBottom={3}>
            <Button
                borderColor={theme.palette.tertiaryColor}
                onClick={handleOpen}
                width={180}
            >
                Create work
            </Button>
        </Box>
        <AddWorkModal handleClose={handleClose} open={open} />
        <BackendWorksList />
    </BackendPartWrapper>
};

export default BackendWorksContainer;