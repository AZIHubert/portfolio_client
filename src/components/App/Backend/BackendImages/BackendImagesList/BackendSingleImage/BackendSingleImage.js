import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

import ImageModal from './ImageModal';

const useStyles = makeStyles(theme => ({
    container: {
        cursor: 'pointer',
        margin: '0.5%',
        overflow: 'hidden',
        position: 'relative',
        width: '19%',
        '&:after': {
            content: '""',
            display: 'block',
            paddingBottom: '120%',
        },
        '&:hover .image': {
            transform: 'scale(1.05)'
        },
        [theme.breakpoints.down('sm')]: {
            width: '24%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '49%',
        },
    },
    image: {
        backgroundImage: props => `url(${props.image.url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%',
        left: 0,
        position: 'absolute',
        transition: '0.6s',
        width: '100%',
    }
}));

const BackendSingleImage = props => {
    const classes = useStyles(props);
    const { image } = props;

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    return <Box className={classes.container} >
        <Box
            className={clsx(classes.image, 'image')}
            height='100%'
            onClick={handleOpenEdit}
            width='100%'
        />
        <ImageModal initialImage={image} open={openEdit} handleClose={handleCloseEdit} />
    </Box>
}

export default BackendSingleImage;