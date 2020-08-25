import { MOVE_BLOCK } from '../mutations';
import { GET_BLOCKS } from '../queries';

import { errorsNormalize, blocksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, partId, onSuccess, onError, onFailure) => useMutation(MOVE_BLOCK, {
    update(proxy, { data: { moveBlock: { OK, errors, blocks: getBlocks } } }){
        if (OK) {
            try {
                proxy.writeQuery({ query: GET_BLOCKS, variables: blocksVariables(partId), data: { getBlocks } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});