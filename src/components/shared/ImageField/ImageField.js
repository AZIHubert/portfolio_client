import React, { useState } from 'react';

import FieldContainer from '#shared/FieldContainer';
import Button from '#shared/Button';

import ImageUploaderModal from './ImageUploaderModal';

const ImageField = ({
    disabled,
    handleAddImage,
    handleRemoveImage,
    image,
    minHeight,
    title,
}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => { if(!disabled) setOpen(true) };
    const handleClose = () => setOpen(false);

    return (
        <FieldContainer
            backgroundImage={
                !!Object.keys(image).length ?
                (`url(${image.url})`) : ''
            }
            flexGrowContent
            minHeight={minHeight ? minHeight : 300}
        >
            <Button
                disabled={disabled}
                borderWidth={2}
                onClick={handleOpen}
                loading={disabled}
            >
                {Object.keys(image).length ? `Change ${title}` : `Add ${title}`}
            </Button>
            {!!Object.keys(image).length && <Button
                disabled={disabled}
                borderWidth={2}
                onClick={handleRemoveImage}
                loading={disabled}
            >
                {`remove ${title}`}
            </Button>}
            <ImageUploaderModal
                handleClick={handleAddImage}
                handleClose={handleClose}
                handleResetClick={handleRemoveImage}
                open={open}
                selectedImage={image}
            />
        </FieldContainer>
    );
};

export default ImageField;