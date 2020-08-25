import { UPDATE_DEGREE } from '../mutations';
import { GET_DEGREES } from '../queries';

import { errorsNormalize, degreesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_DEGREE, {
    update(proxy, { data: { updateDegree: { OK, degree, errors } } }){
        if (OK) {
            const data = proxy.readQuery({ query: GET_DEGREES, variables: degreesVariables });
            const getDegrees = data.getDegrees.map(d => {
                if (d._id === variables.degreeId) return degree;
                return d;
            }).sort((a, b) => {
                if (a.year < b.year) return 1;
                if (a.year > b.year) return -1;
                if (a.degree > b.degree) return 1;
                if (a.degree < b.degree) return -1;
                return 0
            });
            proxy.writeQuery({ query: GET_DEGREES, variables: degreesVariables, data: { getDegrees } });
            if (typeof onSuccess === 'function') onSuccess(degree);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});