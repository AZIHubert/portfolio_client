import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import AddTypeModal from '#shared/AddTypeModal';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';

import BackendWorksTypesList from './BackendWorksTypesList';

const BackendWorksTypes = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <BackendPartWrapper title='types'>
        <Box marginBottom={3}>
            <Button
                borderColor={theme.palette.tertiaryColor}
                onClick={handleOpen}
                width={180}
            >
                Create type
            </Button>
        </Box>
        <AddTypeModal open={open} handleClose={handleClose} />
        <BackendWorksTypesList />
    </BackendPartWrapper>
};

export default BackendWorksTypes;