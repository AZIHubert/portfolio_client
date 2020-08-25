import { UPDATE_TRAINEESHIP } from '../mutations';
import { GET_TRAINEESHIPS } from '../queries';

import { errorsNormalize, traineeshipsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_TRAINEESHIP, {
    update(proxy, { data: { updateTraineeship: { OK, traineeship, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_TRAINEESHIPS, variables: traineeshipsVariables });
                const getTraineeships = data.getTraineeships.map(e => {
                    if(e._id === variables.traineeshipId) return traineeship;
                    return e;
                }).sort((a, b) => {
                    if(a.year < b.year) return 1;
                    if(a.year > b.year) return -1;
                    if(a.company > b.company) return 1;
                    if(a.company < b.company) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_TRAINEESHIPS, variables: traineeshipsVariables, data: { getTraineeships } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess(traineeship);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});