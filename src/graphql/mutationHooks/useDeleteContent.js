import { DELETE_CONTENT } from '../mutations';
import { GET_CONTENTS } from '../queries';

import { contentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, blockId, onSuccess, onError, onFailure) => useMutation(DELETE_CONTENT, {
    update(proxy, { data: { deleteContent } }){
        if (deleteContent) {
            try {
                const data = proxy.readQuery({ query: GET_CONTENTS, variables: contentsVariables(blockId) });
                const getContents = data.getContents.filter(content => content._id !== variables.contentId);
                proxy.writeQuery({ query: GET_CONTENTS, variables: contentsVariables(blockId), data: { getContents } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});