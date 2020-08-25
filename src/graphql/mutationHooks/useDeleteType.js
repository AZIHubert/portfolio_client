import { DELETE_TYPE } from '../mutations';
import { GET_TYPES } from '../queries';

import { typesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_TYPE, {
    update(proxy, { data: { deleteType } }){
        if (deleteType) {
            try {
                const data = proxy.readQuery({ query: GET_TYPES, variables: typesVariables });
                const getTypes = data.getTypes.filter(type => type._id !== variables.typeId);
                proxy.writeQuery({ query: GET_TYPES, variables: typesVariables, data: { getTypes } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});