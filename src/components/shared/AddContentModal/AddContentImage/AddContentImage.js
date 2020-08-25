import { Box } from '@material-ui/core';
import React from 'react';

import FormAlert from '#shared/FormAlert';
import PickerField from '#shared/PickerField';
import ImageField from '#shared/ImageField';
import FormContainerDuo from '#shared/FormContainerDuo';

const AddContentImage = ({
    disabled,
    errors,
    handleAddImage,
    handleClickPaddingTop,
    handleRemoveImage,
    image,
    paddingTop,
    transformPadding,
}) => <Box>
    {errors.image && <Box marginBottom={2} marginLeft='52%'>
        <FormAlert message={errors.image} />
    </Box>}
    <Box display='flex' flexWrap='wrap'>
        <FormContainerDuo marginRight>
            <PickerField
                disabled={disabled}
                handleClick={handleClickPaddingTop}
                label={'Padding Top'}
                minHeight={300}
                selected={paddingTop}
                states={[0, 1, 2, 3, 4, 5]}
                transformState={transformPadding}
            />
        </FormContainerDuo>
        <FormContainerDuo>
            <ImageField
                disabled={disabled}
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
                image={image}
                title='image'
            />
        </FormContainerDuo>
    </Box>
</Box>

export default AddContentImage;