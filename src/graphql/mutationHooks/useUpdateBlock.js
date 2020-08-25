import { UPDATE_BLOCK } from '../mutations';
import { GET_BLOCKS } from '../queries';

import { errorsNormalize,blocksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_BLOCK, {
    update(proxy, { data: { updateBlock: { OK, block, errors } } }){
        if (OK) {
            try {
                let data = proxy.readQuery({ query: GET_BLOCKS, variables: blocksVariables(block.part) });
                const getBlocks = data.getBlocks.map(b => {
                    if(b._id === variables.blockId) b.size = block.size
                    return b;
                });
                proxy.writeQuery({ query: GET_BLOCKS, variables: blocksVariables(block.part), data: { getBlocks } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(block);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});