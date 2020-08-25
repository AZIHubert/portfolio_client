import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useDeleteImage, useUpdateImage } from '#graphql';
import Button from '#shared/Button';
import DeleteModal from '#shared/DeleteModal';
import FormAlert from '#shared/FormAlert';
import InputTextField from '#shared/InputTextField';
import Modal from '#shared/Modal';


const useStyles = makeStyles(theme => ({
    image: {
        width: '45%',
        backgroundImage: props => `url(${props.initialImage.url})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#000',
        height: 350,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: theme.spacing(3)
        }
    },
    metaInfo: {
        fontFamily: 'FedraSansStdLight',
        fontSize: '0.9rem',
        lineHeight: '1.3rem',
        '& b': {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBook',
        },
    },
    metaInfoContainer: {
        marginBottom: theme.spacing(2),
    },
    rightColumn: {
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        }
    },
}));

const ImageModal = props => {
    const theme = useTheme();
    const classes = useStyles(props);

    const { initialImage, open, handleClose } = props;

    const initialState = { title: initialImage.title === undefined ? '' : initialImage.title };
    const initialError = { general: '', title: '' };

    const [image, setImage] = useState(initialState);
    const [errors, setErrors] = useState(initialError);

    const onError = errors => setErrors(errors);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1000);
    };

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    
    const [updateImage, { loading: loadingUpdate }] = useUpdateImage({ ...image, imageId: initialImage._id }, handleClose, onError);
    const [deleteImage, { loading: loadingDelete }] = useDeleteImage({ imageId: initialImage._id }, handleCloseDelete);

    const handleChange = e => {
        setImage({
            ...image,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            general: '',
            [e.target.name]: ''
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateImage();
    };

    return <Modal
        actionTitle={'save changes'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loadingUpdate}
        open={open}
        title={`edit ${initialImage.title ? `'${initialImage.title}'` : 'image'}`}
    >
        {!!errors.general && <FormAlert marginBottom={2}>{errors.general}</FormAlert>}
        <Box display='flex' flexWrap='wrap'>
            <Box className={classes.image} />
            <Box className={classes.rightColumn} flexGrow={1}>
                <Box width='100%'>
                    <InputTextField
                        disabled={loadingUpdate || loadingDelete}
                        error={errors.title ? true : false}
                        helperText={errors.title}
                        label='Image title'
                        name='title'
                        onChange={handleChange}
                        value={image.title !== undefined ? image.title : ''}
                    />
                </Box>
                <Box width='100%'>
                    <Box className={classes.metaInfoContainer}>
                        <Typography className={classes.metaInfo} variant='body1'>
                            <b>Dimension (px)</b> {initialImage.width} x {initialImage.height}
                        </Typography>
                        <Typography className={classes.metaInfo} variant='body1'>
                            <b>Size</b> {initialImage.size}
                        </Typography>
                        <Typography className={classes.metaInfo} variant='body1'>
                            <b>Upload by</b> {initialImage.createdBy.username}
                        </Typography>
                        <Typography className={classes.metaInfo} variant='body1'>
                            <b>Created on</b> {moment(+initialImage.createdAt).format('MMMM')} the {moment(+initialImage.createdAt).format('Do YYYY')}, at {moment(+initialImage.createdAt).format('h:mma')}
                        </Typography>
                    </Box>
                    <Button
                        backgroundColor={theme.palette.primaryColor}
                        borderColor={theme.palette.tertiaryColor}
                        borderWidth={2}
                        color={theme.palette.tertiaryColor}
                        marginBottom={1}
                        shadow
                        to={`${initialImage.url.split('upload')[0]}upload/fl_attachment:${initialImage._id}${initialImage.url.split('upload')[1]}`}
                    >
                        Download image
                    </Button>
                    <CopyToClipboard text={initialImage.url} onCopy={handleCopy}>
                        <Button
                            backgroundColor={copied ? theme.palette.tertiaryColor : theme.palette.primaryColor}
                            borderColor={theme.palette.tertiaryColor}
                            borderWidth={2}
                            color={copied ? theme.palette.primaryColor : theme.palette.tertiaryColor}
                            marginBottom={1}
                            shadow
                        >
                            {copied ? 'Copied' : 'Copy url'}
                        </Button>
                    </CopyToClipboard>
                    <Button
                        borderColor={theme.palette.tertiaryColor}
                        borderWidth={2}
                        onClick={handleOpenDelete}
                        shadow
                    >
                        Delete image
                    </Button>
                </Box>
            </Box>
        </Box>
        <DeleteModal
            actionTitle='delete'
            handleClose={handleCloseDelete}
            handleSubmit={deleteImage}
            loading={loadingDelete}
            open={openDelete}
            title={initialImage.title === '' ? 'this image' : initialImage.title}
        >
            {(!!initialImage.works.length ||
              !!initialImage.users.length ||
              !!initialImage.contents.length) && <Box alignItems='center' display='flex' flexDirection='column' marginTop={4}>
                {!!initialImage.works.length && <FormAlert marginBottom={1}>
                    This image is used as thumbnail by {initialImage.works.length} work{initialImage.works.length > 1 ? 's' : ''}.
                </FormAlert>}
                {!!initialImage.works.length && <FormAlert marginBottom={1}>
                    This image is used as thumbnail by {initialImage.works.length} work{initialImage.works.length > 1 ? 's' : ''}.
                </FormAlert>}
                {!!initialImage.contents.length && <FormAlert marginBottom={1}>
                    This users is used by {initialImage.contents.length} content{initialImage.contents.length > 1 ? 's' : ''}.
                </FormAlert>}
            </Box>}
        </DeleteModal>
    </Modal>
};

export default ImageModal;