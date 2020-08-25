import { CREATE_DEGREE } from '../mutations';
import { GET_DEGREES } from '../queries';

import { errorsNormalize, degreesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_DEGREE, {
    update(proxy, { data: { createDegree: { OK, degree, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_DEGREES, variables: degreesVariables });
                const getDegrees = [...data.getDegrees, degree].sort((a, b) => {
                    if(a.year < b.year) return 1;
                    if(a.year > b.year) return -1;
                    if(a.degree > b.degree) return 1;
                    if(a.degree < b.degree) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_DEGREES, variables: degreesVariables, data: { getDegrees } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(degree);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});