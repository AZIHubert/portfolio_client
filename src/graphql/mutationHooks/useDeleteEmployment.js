import { DELETE_EMPLOYMENT } from '../mutations';
import { GET_EMPLOYMENTS } from '../queries';

import { employmentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_EMPLOYMENT, {
    update(proxy, { data: { deleteEmployment } }){
        if (deleteEmployment) {
            try {
                const data = proxy.readQuery({ query: GET_EMPLOYMENTS, variables: employmentsVariables });
                const getEmployments = data.getEmployments.filter(employment => employment._id !== variables.employmentId);
                proxy.writeQuery({ query: GET_EMPLOYMENTS, variables: employmentsVariables, data: { getEmployments } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});