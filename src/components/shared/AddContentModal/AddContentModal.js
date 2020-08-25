import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useCreateContent, useUpdateContent } from '#graphql';
import Button from '#shared/Button';
import Modal from '#shared/Modal';

import AddContentText from './AddContentText';
import AddContentImage from './AddContentImage';

const useStyles = makeStyles(theme => ({
    subTitle: {
        fontSize: '1.5rem',
        textTransform: 'capitalize',
    },
    subTitleContainer: {
        paddingBottom: theme.spacing(3),
    },
}));

const AddContentModal = ({
    blockId,
    handleClose,
    initialContent,
    open,
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialState = initialContent ? {
        body: initialContent.body,
        color: initialContent.color,
        image: initialContent.image ? initialContent.image : '',
        paddingTop: initialContent.paddingTop,
        textAlign: initialContent.textAlign,
        type: initialContent.type,
        variant: initialContent.variant,
    } : {
        body: '',
        color: theme.palette.secondaryColor,
        image: '',
        paddingTop: 0,
        textAlign: 'left',
        type: 'text',
        variant: 'body1',
    };

    const [content, setContent] = useState(initialState);
    const [errors, setErrors] = useState({});

    const onError = errors => setErrors(errors);

    const variables_create = {
        body: content.type === 'text' ? content.body : '',
        blockId,
        color: content.type === 'text' ? content.color : theme.palette.secondaryColor,
        image: content.type === 'image' ? content.image._id ? content.image._id : null : null,
        paddingTop: content.paddingTop,
        textAlign: content.type === 'text' ? content.textAlign : 'textAlign',
        type: content.type,
        variant: content.type === 'text' ? content.variant : 'body1',
    };
    const onSuccess_create = () => {
        handleClose();
        setContent(initialState);
    };
    const [createContent, { loading: createLoading }] = useCreateContent(variables_create, onSuccess_create, onError);
    
    const variables_update = {
        ...content,
        contentId: initialContent ? initialContent._id : null,
        image: content.type === 'image' ? content.image._id ? content.image._id : null : null,
    };
    const onSuccess_update = () => handleClose();
    const [updateContent, { loading: updateLoading }] = useUpdateContent(variables_update, onSuccess_update, onError);

    const handleSetTypeText = () => setContent({...content, type: 'text'});
    const handleSetTypeImage = () => setContent({...content, type: 'image'});
    
    const transformPadding = e => `${e * 10} px`;
    const handleClickPaddingTop = paddingTop => setContent({ ...content, paddingTop });

    const handleColor = c => setContent({ ...content, color: c.hex });
    const resetColor = () => setContent({ ...content, color: theme.palette.secondaryColor });
    const handleClickVariant = variant => setContent({ ...content, variant });
    const handleClickTextAlign = textAlign => setContent({ ...content, textAlign });

    const handleChange = e => {
        setContent({ ...content, [e.target.name]: e.target.value });
        setErrors({ ...errors, body: '' });
    };
    const handleAddImage = id => {
        setContent({ ...content, image: id });
        setErrors({ ...errors, image: '' });
    };
    const handleRemoveImage = () => {
        setContent({ ...content, image: '' });
        setErrors({ ...errors, image: '' });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!initialContent) createContent();
        else updateContent();
    };

    return <Modal
        actionTitle={initialContent ? 'save changes' : 'Save content'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={createLoading || updateLoading}
        open={open}
        title={initialContent ? 'Edit content': 'Add a new content'}
    >
        {!initialContent && <Box>
            <Box className={classes.subTitleContainer}>
                <Typography className={classes.subTitle} variant='h6'>
                    Select a type
                </Typography>
            </Box>
            <Box
                display='flex'
                justifyContent='space-between'
                marginBottom={2}
            >
                <Button
                    backgroundColor={content.type === 'text' ? theme.palette.tertiaryColor : theme.palette.primaryColor}
                    borderWidth={1}
                    color={content.type === 'text' ? theme.palette.primaryColor : theme.palette.tertiaryColor}
                    onClick={handleSetTypeText}
                    width={100}
                >
                    Text
                </Button>
                <Button
                    backgroundColor={content.type === 'image' ? theme.palette.tertiaryColor : theme.palette.primaryColor}
                    borderWidth={1}
                    color={content.type === 'image' ? theme.palette.primaryColor : theme.palette.tertiaryColor}
                    onClick={handleSetTypeImage}
                    width={100}
                >
                    Image
                </Button>
            </Box>
        </Box>}
        {content.type === 'text' ? <AddContentText
            body={content.body}
            color={content.color}
            disabled={createLoading || updateLoading}
            errors={errors}
            handleChange={handleChange}
            handleClickPaddingTop={handleClickPaddingTop}
            handleClickTextAlign={handleClickTextAlign}
            handleClickVariant={handleClickVariant}
            handleColor={handleColor}
            paddingTop={content.paddingTop}
            resetColor={resetColor}
            textAlign={content.textAlign}
            transformPadding={transformPadding}
            variant={content.variant}
        /> : <AddContentImage
            disabled={createLoading || updateLoading}
            errors={errors}
            handleAddImage={handleAddImage}
            handleClickPaddingTop={handleClickPaddingTop}
            handleRemoveImage={handleRemoveImage}
            image={content.image}
            paddingTop={content.paddingTop}
            transformPadding={transformPadding}
        />}
    </Modal>
};

export default AddContentModal;
