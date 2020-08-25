import { Box } from '@material-ui/core';
import React from 'react';

import BackendSingleImage from './BackendSingleImage';
import UploadImage from './UploadImage';

const BackendImagesList = ({ images }) => <Box marginTop={4}>
    <Box display='flex' flexWrap='wrap' margin='-0.5%'>
        {images.map(image => <BackendSingleImage key={image._id} image={image} />)}
        <UploadImage />
    </Box>
</Box>

export default BackendImagesList;