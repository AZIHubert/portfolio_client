import { DELETE_TRAINEESHIP } from '../mutations';
import { GET_TRAINEESHIPS } from '../queries';

import { traineeshipsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_TRAINEESHIP, {
    update(proxy, { data: { deleteTraineeship } }){
        if (deleteTraineeship) {
            try {
                const data = proxy.readQuery({ query: GET_TRAINEESHIPS, variables: traineeshipsVariables });
                const getTraineeships = data.getTraineeships.filter(traineeship => traineeship._id !== variables.traineeshipId);
                proxy.writeQuery({ query: GET_TRAINEESHIPS, variables: traineeshipsVariables, data: { getTraineeships } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});