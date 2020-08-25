import { DELETE_BLOCK } from '../mutations';
import { GET_BLOCKS } from '../queries';

import { blocksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, partId, onSuccess, onError, onFailure) => useMutation(DELETE_BLOCK, {
    update(proxy, { data: { deleteBlock } }){
        if (deleteBlock) {
            try {
                const data = proxy.readQuery({ query: GET_BLOCKS, variables: blocksVariables(partId) });
                const getBlocks = data.getBlocks.filter(block => block._id !== variables.blockId);
                proxy.writeQuery({ query: GET_BLOCKS, variables: blocksVariables(partId), data: { getBlocks } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});