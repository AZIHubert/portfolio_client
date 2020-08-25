import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { useCreateBlock, useUpdateBlock } from '#graphql';

import Modal from '#shared/Modal';
import PickerField from '#shared/PickerField';
import FormContainerDuo from '#shared/FormContainerDuo';

const AddBlockModal = ({
    blockSize,
    handleClose,
    initialBlock,
    open,
    partId,
}) => {
    const initialState = initialBlock ? { size: initialBlock.size } : { size: 1 };
    const [block, setBlock] = useState(initialState);
    
    const possibleSize = () => {
        const size = [];
        if(initialBlock) for(let i = 0; i < 4 - blockSize + initialBlock.size; i++) size.push(i + 1);
        else for(let i = 0; i < 4 - blockSize; i++) size.push(i + 1);
        return size;
    };

    const onSuccess_create = () => {
        handleClose();
        setBlock(initialState);
    };
    const [createBlock, { loading: createLoading }] = useCreateBlock({ ...block, partId }, onSuccess_create);
    
    const variables_update = { ...block, blockId: initialBlock ? initialBlock._id : null };
    const [updateBlock, { loading: updateLoading }] = useUpdateBlock(variables_update, handleClose);

    const handleClickJustifyContent = size => setBlock({ ...block, size });
    
    const transformState = state => `${state}/4`;
    
    const handleSubmit = e => {
        e.preventDefault();
        if(!initialBlock) createBlock();
        else updateBlock();
    };

    return <Modal
        actionTitle={initialBlock ? 'save changes' : 'Save block'}
        form
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={createLoading || updateLoading}
        open={open}
        title={initialBlock ? 'Edit block': 'Add a new block'}
    >
        <Box display='flex' flexWrap='wrap'>
            <FormContainerDuo>
                <PickerField
                    disabled={createLoading || updateLoading}
                    label='Size'
                    handleClick={handleClickJustifyContent}
                    selected={block.size}
                    states={possibleSize()}
                    transformState={transformState}
                />
            </FormContainerDuo>
        </Box>
    </Modal>
};

export default AddBlockModal;