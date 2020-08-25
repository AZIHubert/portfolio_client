import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useCreatePart, useUpdatePart } from '#graphql';
import CheckField from '#shared/CheckField';
import ColorField from '#shared/ColorField';
import Modal from '#shared/Modal';
import FormContainerDuo from '#shared/FormContainerDuo';
import PickerField from '#shared/PickerField';

const AddPartModal = ({ handleClose, initialPart, open, workId }) => {
    const theme = useTheme();

    const initialState = initialPart ? {
        alignItems: initialPart.alignItems,
        backgroundColor: initialPart.backgroundColor,
        disableBackground: initialPart.disableBackground,
        disablePaddingSm: initialPart.disablePaddingSm,
        justifyContent: initialPart.justifyContent,
        paddingBottom: initialPart.paddingBottom,
        paddingTop: initialPart.paddingTop,
        spacing: initialPart.spacing,
    } : {
        alignItems: 'flex-start',
        backgroundColor: theme.palette.primaryColor,
        disableBackground: false,
        disablePaddingSm: true,
        justifyContent: 'flex-start',
        paddingBottom: 0,
        paddingTop: 0,
        spacing: 1,
    };
    
    const [part, setPart] = useState(initialState);
    const variables_update = { ...part, partId: initialPart ? initialPart._id : null };

    const onSuccess_create = () => {
        handleClose();
        setPart(initialState);
    };

    const [createPart, { loading: createLoading }] = useCreatePart({...part, workId}, onSuccess_create);
    const [updatePart, { loading: loadingUpdate }] = useUpdatePart(variables_update, workId, handleClose);

    const handleClickAlignItems = alignItems => setPart({ ...part, alignItems });
    const handleClickJustifyContent = justifyContent => setPart({ ...part, justifyContent });
    const handleClickPaddingBottom = paddingBottom => setPart({ ...part, paddingBottom });
    const handleClickPaddingTop = paddingTop => setPart({ ...part, paddingTop });
    const handleClickSpacing = spacing => setPart({ ...part, spacing });
    const handleColor = c => setPart({ ...part, backgroundColor: c.hex });
    const handleDisableBackground = e => setPart({ ...part, disableBackground: e.target.checked });
    const handleDisablePaddingSm = e => setPart({ ...part, disablePaddingSm: e.target.checked });
    const handleSubmit = e => {
        e.preventDefault();
        if(!initialPart) createPart();
        else updatePart();
    };
    const resetColor = () => setPart({ ...part, backgroundColor: theme.palette.primaryColor });
    const transformAlignItems = e => {
        if(e === 'flex-start') return 'top';
        if(e === 'flex-end') return 'bottom';
        else return e;
    };
    const transformJustification = e => {
        if(e === 'flex-start') return 'left';
        if(e === 'flex-end') return 'right';
        else return e;
    };
    const transformPadding = e => `${e * 10} px`;

    return <Modal
        actionTitle={initialPart ? 'save changes' : 'Save part'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={createLoading || loadingUpdate}
        open={open}
        title={initialPart ? 'Edit part': 'Add a new part'}
    >
        <Box display='flex' flexWrap='wrap'>
            <FormContainerDuo marginRight>
                <ColorField
                    color={part.backgroundColor}
                    disabled={createLoading || loadingUpdate}
                    handleColor={handleColor}
                    initialColor={theme.palette.primaryColor}
                    label='Background color'
                    resetColor={resetColor}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <CheckField
                    disabled={createLoading || loadingUpdate}
                    checked={part.disableBackground}
                    label='Display background color?'
                    onChange={handleDisableBackground}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <PickerField
                    disabled={createLoading || loadingUpdate}
                    handleClick={handleClickJustifyContent}
                    label='Justification'
                    selected={part.justifyContent}
                    states={['flex-start', 'center', 'flex-end']}
                    transformState={transformJustification}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <PickerField
                    disabled={createLoading || loadingUpdate}
                    handleClick={handleClickSpacing}
                    label='Gutter size'
                    selected={part.spacing}
                    states={[1, 2, 3, 4, 5]}
                    transformState={transformPadding}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <PickerField
                    disabled={createLoading || loadingUpdate}
                    handleClick={handleClickAlignItems}
                    label={'Vertical alignment'}
                    selected={part.alignItems}
                    states={['flex-start', 'center', 'flex-end']}
                    transformState={transformAlignItems}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <CheckField
                    checked={part.disablePaddingSm}
                    disabled={createLoading || loadingUpdate}
                    label='Display margin on small screen?'
                    onChange={handleDisablePaddingSm}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <PickerField
                    disabled={createLoading || loadingUpdate}
                    handleClick={handleClickPaddingTop}
                    label={'Margin top'}
                    selected={part.paddingTop}
                    states={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
                    transformState={transformPadding}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <PickerField
                    disabled={createLoading || loadingUpdate}
                    handleClick={handleClickPaddingBottom}
                    label={'Margin bottom'}
                    selected={part.paddingBottom}
                    states={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
                    transformState={transformPadding}
                />
            </FormContainerDuo>
        </Box>
    </Modal>
};

export default AddPartModal;
