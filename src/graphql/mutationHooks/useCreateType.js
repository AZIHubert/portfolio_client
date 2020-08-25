import { CREATE_TYPE } from '../mutations';
import { GET_TYPES } from '../queries';

import { errorsNormalize, typesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_TYPE, {
    update(proxy, { data: { createType: { OK, type, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_TYPES, variables: typesVariables });
                const getTypes = [...data.getTypes, type].sort((a, b) => {
                    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_TYPES, variables: typesVariables, data: { getTypes } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(type);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});