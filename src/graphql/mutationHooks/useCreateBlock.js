import { CREATE_BLOCK } from '../mutations';
import { GET_BLOCKS } from '../queries';

import { errorsNormalize, blocksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_BLOCK, {
    update(proxy, { data: { createBlock: { OK, block, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_BLOCKS, variables: blocksVariables(variables.partId) });
                const getBlocks = [...data.getBlocks, block];
                proxy.writeQuery({ query: GET_BLOCKS, variables: blocksVariables(variables.partId), data: { getBlocks } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(block);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});