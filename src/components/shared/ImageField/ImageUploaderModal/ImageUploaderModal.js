import { Box, Typography, CircularProgress } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { useGetImages, useCreateImage } from '#graphql';

import Modal from '#shared/Modal';

const useStyles = makeStyles(theme => ({
    circularProgress: {
        color: theme.palette.tertiaryColor,
    },
    droper: {
        backgroundColor: theme.palette.quaternaryColor,
        border: `2px dashed ${theme.palette.tertiaryColor}`,
        cursor: 'pointer',
        flexGrow: 2,
        height: 110,
        margin: theme.spacing(1),
        maxWidth: 110,
        padding: theme.spacing(1),
        transition: 'border-radius 0.3s',
        width: 110,
        '&:active, &:hover': {
            borderRadius: 15,
        },
        '&:focus': {
            outline: 0,
        },
        [theme.breakpoints.down('sm')]: {
            height: 80,
            maxWidth: 80,
            width: 80,
        },
    },
    droperText: {
        color: theme.palette.tertiaryColor,
        fontSize: '0.7rem',
        lineHeight: '1.1rem',
    },
    imageContainer: {
        backgroundColor: theme.palette.quaternaryColor,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: 10,
        boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        height: 110,
        margin: theme.spacing(1),
        position: 'relative',
        width: 110,
        [theme.breakpoints.down('sm')]: {
            width: 80,
            height: 80,
        },
    },
    selectedImage: {
        backgroundColor: theme.palette.quaternaryColor,
        border: `2px solid ${theme.palette.tertiaryColor}`,
        borderRadius: '50% 50% 50% 0',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
        height: 25,
        position: 'absolute',
        right: -10,
        top: -10,
        width: 25,
        [theme.breakpoints.down('sm')]: {
            height: 20,
            width: 20,
        },
    },
}));

const ImageUploaderModal = ({
    open,
    handleClose,
    handleClick,
    handleResetClick,
    selectedImage
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [image, setImage] = useState({});
    const { images, loading: loadingImages } = useGetImages();
    const [imageChecked, setImageChecked] = useState('');

    const variables_create = { upload: image };
    const onSuccess_create = () => setImage({});
    const [createImage, { loading: loadingUpload}] = useCreateImage(variables_create, onSuccess_create);
    
    const onDrop = useCallback(([file]) => {
        if(file.type === 'image/jpeg' || file.type === 'image/png') setImage(file);
        else return;
    }, []);
    
    useEffect(() => {
        if(Object.keys(selectedImage).length) setImageChecked(selectedImage._id);
        else setImageChecked({});
    }, [selectedImage]);

    useEffect(() => {
        if(Object.keys(image).length) createImage();
    }, [image, createImage]);
    const {getRootProps, getInputProps} = useDropzone({ onDrop });

    const handleSelection = image => {
        if(image._id === selectedImage._id) handleResetClick();
        else handleClick(image);
    };

    return <Modal
        actionTitle='OK'
        handleClose={handleClose}
        handleSubmit={handleClose}
        loading={loadingUpload}
        open={open}
        title='images'
    >
        <Box className={classes.subTitleContainer}>
            <Typography className={classes.subTitle} variant='h6'>
                select a thumbnail
            </Typography>
        </Box>
        <Box display='flex' flexWrap='wrap'>
            {!loadingImages && images.map(image => <div
                className={classes.imageContainer}
                key={image._id}
                onClick={() => handleSelection(image)}
                style={{ backgroundImage: `url(${image.url})` }}
            >
                {imageChecked === image._id && <div className={classes.selectedImage}></div>}
            </div>)}
            <div {...getRootProps()} className={classes.droper}>
                <input {...getInputProps()} />
                {!loadingUpload ? <Typography className={classes.droperText} variant='body1'>
                        click here, or drag and drop to upload an image
                    </Typography> : <Box
                        alignItems='center'
                        display='flex'
                        height='100%'
                        justifyContent='center'
                    >
                        <CircularProgress className={classes.circularProgress} size={24} />
                    </Box>}
            </div>
        </Box>
    </Modal>
};

export default ImageUploaderModal;