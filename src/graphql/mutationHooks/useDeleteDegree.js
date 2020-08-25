import { DELETE_DEGREE } from '../mutations';
import { GET_DEGREES } from '../queries';

import { degreesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_DEGREE, {
    update(proxy, { data: { deleteDegree } }){
        if (deleteDegree) {
            try {
                const data = proxy.readQuery({ query: GET_DEGREES, variables: degreesVariables });
                const getDegrees = data.getDegrees.filter(degree => degree._id !== variables.degreeId);
                proxy.writeQuery({ query: GET_DEGREES, variables: degreesVariables, data: { getDegrees } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});