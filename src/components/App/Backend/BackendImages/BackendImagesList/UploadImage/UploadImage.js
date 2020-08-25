import { Box, Typography, CircularProgress } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { useCreateImage } from '#graphql';

const useStyles = makeStyles(theme => ({
    circularProgress: {
        color: theme.palette.tertiaryColor
    },
    droper: {
        backgroundColor: theme.palette.quaternaryColor,
        border: `4px dashed ${theme.palette.tertiaryColor}`,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        margin: '0.5%',
        position: 'relative',
        transition: 'border-radius 0.3s',
        width: '19%',
        '&:after': {
            content: "''",
            display: 'block',
            paddingBottom: '120%',
        },
        '&:active, &:hover': {
            borderRadius: 15
        },
        '&:focus': {
            outline: 0
        },
        [theme.breakpoints.down('sm')]: {
            border: `2px dashed ${theme.palette.tertiaryColor}`,
            width: '24%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '49%',
        },
    },
    droperText: {
        color: theme.palette.tertiaryColor,
        fontFamily: 'FedraSansStdBold',
        fontSize: '1.4rem',
        lineHeight: '2rem',
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            fontSize: '0.9rem',
            lineHeight: '1.2rem',
        }
    },
}));

const UploadImage = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [image, setImage] = useState({});

    const onSuccess_create = () => setImage({});
    const [createImage, { loading: loadingUpload}] = useCreateImage({ upload: image }, onSuccess_create);

    const onDrop = useCallback(([file]) => {
        if(file.type === 'image/jpeg' || file.type === 'image/png') setImage(file);
        else return;
    }, []);

    useEffect(() => {
        if(Object.keys(image).length) createImage();
    }, [image, createImage]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return <div className={classes.droper} {...getRootProps()}>
        <input {...getInputProps()} />
        <Box
            alignItems='center'
            display='flex'
            height='100%'
            justifyContent='center'
            position='absolute'
            textAlign='center'
            width='100%'
        >
            {!loadingUpload ? <Typography className={classes.droperText} variant='body1'>
                Upload an image
            </Typography> : <CircularProgress className={classes.circularProgress} size={48} />}
        </Box>
    </div>
};

export default UploadImage;