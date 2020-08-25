import { UPDATE_TYPE } from '../mutations';
import { GET_TYPES } from '../queries';

import { errorsNormalize, typesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_TYPE, {
    update(proxy, { data: { updateType: { OK, errors, type } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_TYPES, variables: typesVariables });
                const getTypes = data.getTypes.map(t => {
                    if(t._id === variables.typeId) return type;
                    return t;
                }).sort((a, b) => {
                    if(a.title < b.title) return 1;
                    if(a.title > b.title) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_TYPES, variables: typesVariables, data: { getTypes } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess(type);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});