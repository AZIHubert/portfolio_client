import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

import ColorField from '#shared/ColorField';
import FormContainerDuo from '#shared/FormContainerDuo';
import PickerField from '#shared/PickerField';
import InputTextField from '#shared/InputTextField';

const AddContentText = ({
    body,
    color,
    disabled,
    errors,
    handleChange,
    handleClickPaddingTop,
    handleClickTextAlign,
    handleClickVariant,
    handleColor,
    paddingTop,
    resetColor,
    textAlign,
    transformPadding,
    variant,
}) => {
    const theme = useTheme();

    return <Box display='flex' flexWrap='wrap'>
        <FormContainerDuo marginRight>
            <PickerField
                disabled={disabled}
                handleClick={handleClickPaddingTop}
                label={'Padding Top'}
                minHeight={220}
                selected={paddingTop}
                states={[0, 1, 2, 3, 4, 5]}
                transformState={transformPadding}
            />
        </FormContainerDuo>
        <FormContainerDuo>
            <ColorField
                color={color}
                disabled={disabled}
                handleColor={handleColor}
                initialColor={theme.palette.primaryColor}
                label='Title color'
                minHeight={220}
                resetColor={resetColor}
            />
        </FormContainerDuo>
        <FormContainerDuo marginRight>
            <PickerField
                handleClick={handleClickVariant}
                label={'Variant'}
                minHeight={220}
                selected={variant}
                states={['body1', 'body2', 'h1', 'h2', 'h3']}
            />
        </FormContainerDuo>
        <FormContainerDuo>
            <PickerField
                handleClick={handleClickTextAlign}
                label={'Text Align'}
                minHeight={220}
                selected={textAlign}
                states={['left', 'center', 'right']}
            />
        </FormContainerDuo>
        <Box width='100%'>
            <InputTextField
                disabled={disabled}
                error={errors.body ? true : false}
                helperText={errors.body}
                label='body'
                multiline
                name='body'
                onChange={handleChange}
                value={body}
            />
        </Box>
    </Box>
};

export default AddContentText;